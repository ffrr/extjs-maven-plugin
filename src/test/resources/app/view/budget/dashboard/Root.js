/**
 * Overview root
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.view.budget.dashboard.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-budget-dashboard',


    initComponent: function() {
        Ext.apply(this, {
            layout: 'border',
            region: 'center',
            border: false,
            margins: '-5 0 0 0',
            items: [{
                xtype: 'df-budget-dashboard-overview',
                region: 'center',
                flex: .6,
                border: true,
                margin: 2
            },{
                region: 'east',
                title: g('Expense confirmation'),
                flex: .4,
                split: true,
                xtype: 'df-budget-expenseconfirmation',
                margin: '2 2 2 -2'
            }]
        });

        this.callParent(arguments);
    }

});
