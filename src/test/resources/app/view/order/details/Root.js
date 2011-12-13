/**
 * OrderDetails
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 5, 2011
 */


Ext.define('DanteFrontend.view.order.details.Root', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-order-details',

    initComponent: function() {
        var config = {
            xtype: 'panel',
            border: true,
            layout: {
                type: 'border'
            },
            items: [{
                title: g('Order details'),
                xtype: 'df-order-details-basicform',
                border: false,
                height: 250,
                region: 'north',
                split: true
            },{
                xtype: 'df-order-details-items',
                title: g('Order items'),
                region: 'center',
                border: false
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});