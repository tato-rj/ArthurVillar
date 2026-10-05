@extends('layouts.app', ['title' => 'Duels'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    @pagetitle(['label' => 'Duels', 'subtitle' => 'Duel history from Theory, including completed matches and unfinished rooms.'])

    <div class="d-flex flex-wrap gap-3 mb-3" id="duel-filters">
        <div>
            <label class="form-label small" for="duel-game">Game</label>
            <select class="form-select" id="duel-game">
                <option value="">All games</option>
                @foreach($games as $slug => $name)
                    <option value="{{ $slug }}">{{ $name }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label class="form-label small" for="duel-completed">Completion</label>
            <select class="form-select" id="duel-completed">
                <option value="">All duels</option>
                <option value="yes">Completed</option>
                <option value="no">Not completed</option>
            </select>
        </div>
    </div>

    <div class="alert alert-danger" id="duel-error" role="alert" hidden></div>
    <div class="calendar-table-container" id="duels-container">
        <table id="duels-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Completed</th>
                    <th>Game</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
<div id="duel-info-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const textRenderer = $.fn.dataTable.render.text();
    const error = document.getElementById('duel-error');
    const showError = function(message) {
        error.textContent = message;
        error.hidden = false;
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium', timeStyle: 'short', timeZone: @json(config('calendar.timezone')),
    });
    // The shared state helper reads a missing order_col as column zero.
    // Supply this page's descending default before it restores URL state.
    const tableUrl = new URL(window.location.href);
    if (!tableUrl.searchParams.has('order_col')) {
        tableUrl.searchParams.set('order_col', '0');
        tableUrl.searchParams.set('order_dir', 'desc');
        window.history.replaceState({}, '', tableUrl);
    }
    const table = window.calendarDataTableState.create('#duels-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        order: [[0, 'desc']],
        language: {
            search: '', searchPlaceholder: 'Search', lengthMenu: 'Show _MENU_ rows',
            info: 'Showing _START_ to _END_ of _TOTAL_', emptyTable: 'No duels yet.',
            paginate: {
                previous: '<i class="fas fa-angle-left mr-0"></i>',
                next: '<i class="fas fa-angle-right mr-0"></i>',
            },
        },
        ajax: {
            url: @json(route('admin.theory.duels.table')),
            data: function(data) {
                data.game = $('#duel-game').val();
                data.completed = $('#duel-completed').val();
            },
            error: function() { showError('Unable to load duels. Refresh the page to try again.'); },
        },
        columns: [
            {data: 'played_at', name: 'played_at', render: function(data, type) {
                return type === 'display' ? dateFormatter.format(new Date(data)) : data;
            }},
            {data: 'status', name: 'status', render: function(data, type, row) {
                if (type !== 'display') return data;
                return row.completed
                    ? '<span class="badge bg-success">Yes</span>'
                    : `<span class="badge bg-secondary">No</span> <span class="small text-muted">${textRenderer.display(row.status_label)}</span>`;
            }},
            {data: 'game', name: 'game', render: textRenderer},
            {data: 'id', name: 'actions', orderable: false, searchable: false, className: 'text-right', render: function(data, type, row) {
                if (type !== 'display') return data;
                return `<div class="calendar-table-actions">
                    <button type="button" class="btn btn-sm btn-primary rounded js-duel-info" data-url="${textRenderer.display(row.info_url)}" aria-label="Duel info" title="Duel info">@fa(['icon' => 'circle-info', 'mr' => 0])</button>
                    <button type="button" class="btn btn-sm btn-red rounded js-duel-delete" data-url="${textRenderer.display(row.delete_url)}" aria-label="Delete duel" title="Delete duel">@fa(['icon' => 'trash-alt', 'mr' => 0])</button>
                </div>`;
            }},
        ],
    }, {
        restore: function(params) {
            $('#duel-game').val(params.get('game') || '');
            $('#duel-completed').val(params.get('completed') || '');
        },
        extraParams: function() {
            return {game: $('#duel-game').val(), completed: $('#duel-completed').val()};
        },
    });
    $('#duel-filters').on('change', 'select', function() {
        error.hidden = true;
        table.ajax.reload();
    });

    let infoRequest = null;
    $('#duels-table').on('click', '.js-duel-info', async function() {
        if (infoRequest) infoRequest.abort();
        const request = new AbortController();
        infoRequest = request;
        error.hidden = true;
        try {
            const response = await fetch(this.dataset.url, {
                headers: {Accept: 'text/html', 'X-Requested-With': 'XMLHttpRequest'}, signal: request.signal,
            });
            if (!response.ok || response.redirected) throw new Error('Unable to load duel details. Refresh the page and try again.');
            const html = await response.text();
            if (request.signal.aborted) return;
            const container = document.getElementById('duel-info-modal-container');
            const previousModal = container.querySelector('.modal');
            if (previousModal && previousModal.style.display === 'block') {
                // Finish the previous close animation before replacing its element.
                await new Promise(function(resolve) {
                    previousModal.addEventListener('hidden.bs.modal', resolve, {once: true});
                    if (window.bootstrap && window.bootstrap.Modal) {
                        window.bootstrap.Modal.getOrCreateInstance(previousModal).hide();
                    } else {
                        $(previousModal).modal('hide');
                    }
                });
            }
            if (request.signal.aborted) return;
            if (previousModal) {
                if (window.bootstrap && window.bootstrap.Modal) {
                    window.bootstrap.Modal.getOrCreateInstance(previousModal).dispose();
                } else {
                    $(previousModal).modal('dispose');
                }
            }
            container.innerHTML = html;
            const modal = container.querySelector('.modal');
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-label', 'Duel details');
            if (window.bootstrap && window.bootstrap.Modal) {
                window.bootstrap.Modal.getOrCreateInstance(modal).show();
            } else {
                $(modal).modal('show');
            }
        } catch (exception) {
            if (exception.name !== 'AbortError') showError(exception.message);
        } finally {
            if (infoRequest === request) infoRequest = null;
        }
    });
    $('#duels-table').on('click', '.js-duel-delete', async function() {
        if (this.disabled || !window.confirm('Delete this duel and its saved results? This cannot be undone.')) return;
        this.disabled = true;
        error.hidden = true;
        try {
            const response = await fetch(this.dataset.url, {
                method: 'DELETE', headers: {
                    Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });
            if (!response.ok) throw new Error('Unable to delete the duel. Refresh the page and try again.');
            await response.json();
            // Move back if the last row of a later page was removed.
            if (table.rows().count() === 1 && table.page() > 0) table.page('previous');
            table.ajax.reload(null, false);
        } catch (exception) {
            showError(exception.message);
        } finally {
            this.disabled = false;
        }
    });
});
</script>
@endpush
