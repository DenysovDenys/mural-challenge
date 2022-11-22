define(['collections/currencies'], function(currencies) {
    return {
        rows: [
            {
                cols: [
                    {
                        id: 'amount',
                        view: 'text',
                        value: '0',
                        label: 'Amount',
                        width: 250
                    },
                    {
                        id: 'from',
                        view: 'combo',
                        label: 'From',
                        width: 200,
                        options: currencies
                    }
                ]
            },
            {
                cols: [
                    {
                        id: 'result',
                        view: 'text',
                        label: 'Result',
                        value: '0',
                        width: 250
                    },
                    {
                        id: 'to',
                        view: 'combo',
                        label: 'To',
                        width: 200,
                        options: currencies
                    },
                    {
                        view: 'button',
                        value: 'Convert',
                        id: 'convert_button',
                        css: 'webix_primary',
                        inputWidth: 150,
                        click:function() {
                            $$('result').setValue(convert($$('amount').getValue(), $$('from').getValue(), $$('to').getValue()))
                        }
                    }
                ]
            }
        ]
    }
})

function convert(amount, ccyFrom, ccyTo) {
    return new webix.DataValue({ url: '/api/currency/convert/' + amount + '/' + ccyFrom  + '/' + ccyTo })
}