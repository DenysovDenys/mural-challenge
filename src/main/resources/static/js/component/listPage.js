define(function() {
    return function(tableId, url, columns) {
        return {
            rows: [
                {
                    view: 'toolbar',
                    cols: [
                        {
                            view: 'button',
                            label: 'Add',
                            click: function() {
                                var ccyList = $$(tableId)
                                var id = ccyList.add({})
                                ccyList.editRow(id)
                            }
                        }
                    ]
                },
                {
                    id: tableId,
                    view: 'datatable',
                    columns: columns,
                    url: url,
                    autoheight: true,
                    autowidth: true,
                    editable: false,
                    pager: 'ccyPager',
                    datafetch: 3
                },
                {
                    view: 'pager',
                    id: 'ccyPager',
                    size: 3,
                    group: 3,
                    template: '{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}'
                }
            ]
        }
    }
})