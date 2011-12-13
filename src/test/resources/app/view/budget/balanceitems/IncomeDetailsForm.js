/**
 * Details
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 6, 2011
 */


Ext.define('DanteFrontend.view.budget.balanceitems.IncomeDetailsForm', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-budget-balanceitems-incomedetails',

    initComponent: function() {
        var config = {
            title: g('Income details'),
            layout: {
                type: 'anchor'
            },
            defaults: {
                labelAlign: 'top',
                anchor: '65%',
                margin: '0 0 6 0'
            },

            bodyStyle: 'padding: 8px;',
            items:[{
                xtype: 'datefield',
                name: 'receivedOn',
                fieldLabel: g('Date added')
            },{
                store: 'budget.Budgets',
                name: 'budget_id',
                emptyText: g('Select budget ...'),
                queryMode: 'local',
                valueField: 'id',
                displayField: 'title',
                xtype: 'combo',
                allowBlank: false,
                fieldLabel: g('Budget')
            },{
                xtype: 'numberfield',
                name: 'grandTotal',
                fieldLabel: g('Grand total')
            },{
                xtype: 'textareafield',
                height: 120,
                fieldLabel: g('Description'),
                name: 'description'
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});
