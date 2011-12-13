/**
 * ExpenseConfirmationFilter
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 13, 2011
 */

Ext.define('DanteFrontend.view.budget.dashboard.ExpenseConfirmationFilter', {
    extend: 'DanteFrontend.lib.view.Filter',
    alias: 'widget.df-budget-dashboard-expenseconfirmationfilter',
    
    initComponent: function() {
        var config = {
            store: 'budget.ConfirmableBalanceItems',
            items: [{
                xtype: 'df-combo',
                clearable: true,
                name: 'budget_id',
                fieldLabel: g('Budget'),
                queryMode: 'local',
                store: 'budget.Budgets',
                valueField: 'id',
                displayField: 'title',
                filter: 'numeric',
                width: 140
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'confirmationStatus_id',
                fieldLabel: g('Status'),
                queryMode: 'local',
                store: 'budget.ConfirmationStatuses',
                valueField: 'id',
                displayField: 'name',
                filter: 'numeric',
                width: 140
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});