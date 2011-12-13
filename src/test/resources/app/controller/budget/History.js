/**
 * History
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 10, 2011
 */

Ext.define('DanteFrontend.controller.budget.History', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['budget.Budgets','budget.BalanceItems', 'budget.Balances'],
    
    models: ['budget.Budget','budget.BalanceItem','budget.Balance'],

    views: ['budget.history.Root', 'budget.dashboard.CurrentBalanceItemsList',
    'budget.BalanceInfo', 'budget.BalanceList'],

    rootView: 'df-budget-history',

    init: function() {
    }

});