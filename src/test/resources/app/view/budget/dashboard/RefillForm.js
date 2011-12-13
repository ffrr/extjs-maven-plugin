/**
 * RefillForm
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 3, 2011
 */

Ext.define('DanteFrontend.view.budget.dashboard.RefillForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.df-budget-dashboard-refill',

    initComponent: function() {
        var config = {
            layout: { type: 'vbox', align: 'stretch' },
            items: [{
                layout: 'hbox',
                flex: 1,
                border: false,
                defaults: {
                    margin: '0 0 0 2'
                },
                margin: 2,
                ref: 'refill',                
                items: [{
                    flex: .3,
                    xtype: 'button',
                    text: g('Refill by')
                },{
                    flex: .4,
                    hideLabel: true,
                    xtype: 'numberfield',
                    name: 'sum'
                },{
                    flex: .1,
                    xtype: 'displayfield',
                    hideLabel: true,
                    value: '&#8364'
                }]
            },{
                margin: '0 4 0 4',
                border: true,
                bodyStyle: 'border-width: 1px 0 0 0 !important',
                ref: 'newBalance',
                items: {
                    margin: '4 0 0 0',
                    xtype: 'button',
                    text: g('Renew balance'),
                    iconCls: 'btn-refresh'
                }
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});