/**
 * Filter
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 6, 2011
 */

Ext.define('DanteFrontend.view.budget.balanceitems.Filter', {
    extend: 'DanteFrontend.lib.view.Filter',
    alias: 'widget.df-budget-balanceitems-filter',

    initComponent: function() {

        var config = {
            items: [{
                xtype: 'df-combo',
                name: 'budget_id',
                fieldLabel: g('Budget'),
                padding: 0,
                filter: 'numeric',
                clearable: true,
                queryMode: 'local',
                store: 'budget.Budgets',
                valueField: 'id',
                displayField: 'title'
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'balance_id',
                fieldLabel: g('Balance'),
                queryMode: 'local',
                store: 'budget.Balances',
                valueField: 'id',
                displayField: 'generatedTitle',
                filter: 'numeric',
                width: 110,
                forceSelection: true,
                lastQuery: '',
                triggerAction: 'all',
                editable: false
            },{                
                xtype: 'df-combo',
                clearable: true,
                name: 'receivedOn',
                fieldLabel: g('Month'),
                queryMode: 'local',
                store: 'Months',
                valueField: 'id',
                displayField: 'name',
                filter: 'month',
                width: 140
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'confirmationStatus_id',
                fieldLabel: g('Confirmation'),
                queryMode: 'local',
                store: 'budget.ConfirmationStatuses',
                valueField: 'id',
                displayField: 'name',
                filter: 'numeric'
            },{
                xtype: 'df-combo',
                clearable: true,
                name: 'direction_id',
                fieldLabel: g('Direction'),
                queryMode: 'local',
                store: 'budget.BalanceItemDirections',
                valueField: 'id',
                displayField: 'name',
                filter: 'numeric'
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});
