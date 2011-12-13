/**
 * Filter
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 17, 2011
 */

Ext.define('DanteFrontend.view.order.Filter', {
    extend: 'DanteFrontend.lib.view.Filter',
    alias: 'widget.df-order-filter',

    initComponent: function() {
        
        var config = {
            items: [{
                xtype: 'df-textfield',
                name: 'referenceId',
                fieldLabel: g('Reference #'),
                padding: 0,
                filter: 'string',
                clearable: true
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'acceptedOn',
                fieldLabel: g('Month'),
                queryMode: 'local',
                store: 'Months',
                valueField: 'id',
                displayField: 'name',
                filter: 'month'
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'customer',
                fieldLabel: g('Customer'),
                queryMode: 'local',
                store: 'Customers',
                valueField: 'id',
                displayField: 'name',
                filter: 'numeric'
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'deliveryStatus',
                fieldLabel: g('Delivery status'),
                queryMode: 'local',
                store: 'order.DeliveryStatuses',
                valueField: 'id',
                displayField: 'name',
                filter: 'numeric'
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});
