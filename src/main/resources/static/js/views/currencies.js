define(['component/listPage'], function(listPage) {
    return listPage(
        'ccyList',
        'resource->/api/list',
        [
            {
                id: 'ccy',
                editor: 'text'
            }
        ]
    )
})