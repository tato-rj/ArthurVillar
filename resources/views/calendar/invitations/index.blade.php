@extends('layouts.app', ['title' => 'Invitations'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Invitations',
            'link' => [
                'url' => route('calendar.invitations.create'),
                'icon' => 'plus',
                'label' => 'New invitation',
            ],
        ])
    </div>

    <div id="invitations-container" class="calendar-table-container calendar-table-container-lg">
        <table id="invitations-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Created</th>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Options</th>
                    <th>Responses</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>

    <div id="invitation-results-modal-container"></div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const showModal = function(modal) {
        if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
            window.bootstrap.Modal.getOrCreateInstance(modal).show();
            return;
        }

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(modal).modal('show');
        }
    };

    const formatDate = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(value));
    };

    window.calendarDataTableState.create('#invitations-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        order: [[0, 'desc']],
        language: {
            search: '',
            searchPlaceholder: 'Search',
            lengthMenu: 'Show _MENU_ rows',
            info: 'Showing _START_ to _END_ of _TOTAL_',
            emptyTable: 'No invitations yet',
            paginate: {
                previous: '<i class="fas fa-angle-left mr-0"></i>',
                next: '<i class="fas fa-angle-right mr-0"></i>',
            },
        },
        ajax: @json(route('calendar.tables.invitations')),
        columns: [
            {
                data: 'created_at',
                name: 'created_at',
                render: function(data, type) {
                    return type === 'display' ? formatDate(data) : data;
                },
            },
            {data: 'title', name: 'title'},
            {
                data: 'duration_minutes',
                name: 'duration_minutes',
                render: function(data) {
                    return data ? `${data} min` : '';
                },
            },
            {data: 'options_count', name: 'options_count', searchable: false},
            {data: 'participants_count', name: 'participants_count', searchable: false},
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data, type, row) {
                    const editUrl = @json(route('calendar.invitations.edit', ['invitation' => '__invitation__'])).replace('__invitation__', data);
                    const resultsUrl = @json(route('calendar.invitations.results', ['invitation' => '__invitation__'])).replace('__invitation__', data);
                    const deleteUrl = @json(route('calendar.invitations.destroy', ['invitation' => '__invitation__'])).replace('__invitation__', data);
                    const resultsButton = Number(row.participants_count) > 0
                        ? `<button type="button" class="btn btn-sm btn-primary rounded js-view-invitation-results" data-url="${resultsUrl}" title="View responses" aria-label="View responses">@fa(['icon' => 'chart-bar', 'mr' => 0])</button>`
                        : `<button type="button" class="btn btn-sm btn-primary rounded" title="No responses yet" aria-label="No responses yet" disabled aria-disabled="true">@fa(['icon' => 'chart-bar', 'mr' => 0])</button>`;

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-secondary rounded js-copy-invitation-url" data-url="${row.public_url}" title="Copy public link" aria-label="Copy public link">@fa(['icon' => 'copy', 'mr' => 0])</button>
                            ${resultsButton}
                            <a class="btn btn-sm btn-warning rounded" href="${editUrl}" title="Edit invitation" aria-label="Edit invitation">@fa(['icon' => 'pen-to-square', 'mr' => 0])</a>
                            <form method="POST" action="${deleteUrl}" confirm>
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-red rounded" title="Delete invitation" aria-label="Delete invitation">@fa(['icon' => 'trash-alt', 'mr' => 0])</button>
                            </form>
                        </div>
                    `;
                },
            },
        ],
    });

    const copyText = function(value) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(value);
        }

        const textarea = document.createElement('textarea');

        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        return Promise.resolve();
    };

    $('#invitations-table').on('click', '.js-copy-invitation-url', function() {
        const button = this;
        const originalHtml = button.innerHTML;

        copyText(button.dataset.url).then(function() {
            button.innerHTML = '<i class="fas fa-check mr-0"></i>';
            button.classList.remove('btn-secondary');
            button.classList.add('btn-green');

            window.setTimeout(function() {
                button.innerHTML = originalHtml;
                button.classList.remove('btn-green');
                button.classList.add('btn-secondary');
            }, 1500);
        });
    });

    $('#invitations-table').on('click', '.js-view-invitation-results', function() {
        const button = this;

        button.disabled = true;

        fetch(button.dataset.url, {
            headers: {
                Accept: 'text/html',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to load invitation responses.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = document.getElementById('invitation-results-modal-container');

                container.innerHTML = html;
                showModal(container.querySelector('.modal'));
            })
            .catch(console.error)
            .finally(function() {
                button.disabled = false;
            });
    });
});
</script>
@endpush
