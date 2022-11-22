define(function() {
    var ajax = webix.ajax().headers({
        'Content-type': 'application/json'
    })

    webix.proxy.resource = {
        init: function() {
            webix.extend(this, webix.proxy.rest)
        },
        load: function(view, params) {
            var args = ''

            args += '?page=' + (params ? params.start / view.config.datafetch : 0)
            args += '&size=' + view.config.datafetch

            const url = view.config.url.source

            return ajax.get(url).then(function(value) {
                var response = value.json()
                return {
                    data: response.content,
                    pos: response.number * view.config.datafetch,
                    total_count: response.totalElements
                }
            })
        }
    }
})