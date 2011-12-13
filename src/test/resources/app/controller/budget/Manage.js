/**
 * Overview
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.controller.budget.Manage', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['budget.Budgets', 'budget.Balances', 
        'budget.BalanceRenewalFrequencies', 'budget.BalanceRenewalStrategies',
        'budget.ConfirmationUsersAmounts', 'budget.Purposes', 'budget.BudgetUsers', 'Employees'],
    
    models: ['budget.Budget', 'budget.Balance', 'budget.BalanceItem', 'budget.BudgetUser'],

    views: ['budget.manage.Root', 'budget.BriefList', 'budget.manage.DetailsForm'],

    refs: [{    
        selector: 'df-budget-manage df-budget-manage-details',
        ref: 'editor'
    },{
        selector: 'df-budget-manage df-budget-manage-details df-grid-adding',
        ref: 'confirmingUsersGrid'
    }],


    rootView: 'df-budget-manage',

    init: function() {
        this.control({
           'df-budget-manage df-msedit': {
               selectitem: this.loadBudget,
               createitem: this.loadBudget
           },
           'df-budget-manage df-budget-manage-details': {
               save: this.saveBudget
           },
           'df-budget-manage df-budget-manage-details df-grid-adding': {
               itemadded: this.attachUser
           }
        });
    },

    loadBudget: function(r) {
        this.getEditor().accessAndLoad();
        (r.phantom) ? this.loadPhantom(r):this.loadExisting(r);
    },

    loadPhantom: function(r) {
        this.getConfirmingUsersGrid().disable();
    },

    loadExisting: function(r) {
        var g = this.getConfirmingUsersGrid(),
            flt = {
                property: 'budget',
                value: r.getId()
            };
            
        g.getStore().filter(flt);
        g.enable();
    },

    saveBudget: function(v, r) {
        if(this.getEditor().validateAndUpdate()) {
            this.getBudgetBudgetsStore().sync();
        }
    },

    attachUser: function(v, r) {
        var s = v.getStore();
        r.set('budget_id', this.getEditor().accessRecord().getId());
        r.set('canConfirm', 1);
        s.add(r);
        s.sync();
    }


});