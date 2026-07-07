<script>
window.studioDataTableState = window.studioDataTableState || (function() {
    const getParams = function() {
        return new URLSearchParams(window.location.search);
    };

    const getIntParam = function(params, key, fallback) {
        const value = Number(params.get(key));

        return Number.isFinite(value) && value > 0 ? value : fallback;
    };

    const getOrder = function(params, fallback) {
        const column = Number(params.get('order_col'));
        const direction = params.get('order_dir') === 'desc' ? 'desc' : 'asc';

        if (Number.isInteger(column) && column >= 0) {
            return [[column, direction]];
        }

        return fallback;
    };

    const syncUrl = function(table, options) {
        const params = getParams();
        const info = table.page.info();
        const order = table.order();
        const search = table.search();
        const extras = options && typeof options.extraParams === 'function'
            ? options.extraParams()
            : {};

        params.set('page', String(info.page + 1));
        params.set('rows', String(info.length));

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }

        if (order && order.length) {
            params.set('order_col', String(order[0][0]));
            params.set('order_dir', order[0][1]);
        }

        Object.keys(extras).forEach(function(key) {
            if (extras[key]) {
                params.set(key, extras[key]);
            } else {
                params.delete(key);
            }
        });

        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    const create = function(selector, config, options) {
        const params = getParams();
        const rows = getIntParam(params, 'rows', config.pageLength || 10);
        const page = getIntParam(params, 'page', 1);
        const search = params.get('search') || '';

        config.pageLength = rows;
        config.displayStart = Math.max(0, (page - 1) * rows);

        if (search) {
            config.search = { search };
        }

        config.order = getOrder(params, config.order);

        if (options && typeof options.restore === 'function') {
            options.restore(params);
        }

        const table = $(selector).DataTable(config);

        table.on('draw', function() {
            syncUrl(table, options || {});
        });

        return table;
    };

    return { create, syncUrl };
})();
</script>
