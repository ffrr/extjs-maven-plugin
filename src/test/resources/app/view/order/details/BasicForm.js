/**
 * BasicForm
 * ..description..
 *
 * @author fk
 * @version 0.1
 * @date Aug 5, 2011
 */

Ext.define('DanteFrontend.view.order.details.BasicForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-order-details-basicform',

    initComponent: function() {
        var config = {
            defaultType: 'textfield',
            border: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                border: false
            },
            items: [{
                layout: 'anchor',
                title: g('Basic information'),
                xtype: 'fieldset',
                autoHeight: true,
                flex: .3,
                margin: '0 0 0 4',
                defaults: {
                    labelWidth: 120,
                    labelAlign: 'top',
                    anchor: '100%',
                    maxWidth: 250
                },
                items: [{
                    name: 'id',
                    xtype: 'hidden'
                },{
                    fieldLabel: g('Order reference #'),
                    xtype: 'displayfield',
                    name: 'referenceId'
                },{
                    fieldLabel: g('Customer'),
                    name: 'customer_id',
                    store: 'Customers',
                    emptyText: g('Select customer ...'),
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    xtype: 'combo',
                    allowBlank: false
                },{
                    fieldLabel: g('Delivery status'),
                    name: 'deliveryStatus_id',
                    emptyText: g('Select status ...'),
                    store: 'order.DeliveryStatuses',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    xtype: 'combo',
                    allowBlank: false
                },{
                    fieldLabel: g('Date accepted'),
                    name: 'acceptedOn',
                    xtype: 'datefield',
                    allowBlank: false,
                    format: Ext.Date.patterns.SK
                }]
            },{
                layout: 'fit',
                title: g('Additional information'),
                xtype: 'fieldset',
                autoHeight: true,
                margin: '0 0 0 4',
                padding: '8 8 24 8',
                flex: .4,
                defaults: {
                    labelWidth: 120,
                    labelAlign: 'top'
                },
                items: {
                    fieldLabel: g('Description'),
                    xtype: 'textareafield',
                    name: 'summary'
                }
            },{
                layout: 'fit',
                title: g('Attachments'),
                xtype: 'fieldset',
                autoHeight: true,
                margin: '0 4 0 4',
                flex: .3,
                items: {
                    xtype: 'df-grid-file',
                    ref: 'attachments',
                    margin: '0 0 6 0',
                    store: 'order.Attachments',
                    flex: 1,
                    api: {
                        submit: orderController.attachToOrder,
                        download: approot('/attachment/order/')
                    }
                }
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }

});