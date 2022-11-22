requirejs.config({
    baseUrl: 'js'
})


function buildRoute(view) {
    return function() {
        webix.ui({
            id: 'root',
            rows: [
                view
            ]
        }, $$('root'))
    }
}

function buildButton(label, route) {
    return {
        view: 'button',
        value: label,
        width: 100,
        align: 'center',
        click: function() {
            routie(route)
        }
    }
}

require(
    ['views/convert', 'views/currencies'],
    function(convert, currencies) {
        webix.ready(function() {
            webix.ui({
                container: 'app',
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                rows: [
                    {
                        view: 'toolbar',
                        cols: [
                            buildButton('Convert', 'convert'),
                            buildButton('Currencies', 'currencies')
                        ]
                    },
                    {
                        id: 'root'
                    }
                ]
            })
        })

        routie({
            'convert': buildRoute(convert),
            'currencies': buildRoute(currencies)
        })
    })