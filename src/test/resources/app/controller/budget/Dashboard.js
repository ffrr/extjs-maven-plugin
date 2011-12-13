/**
 * Overview
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.controller.budget.Dashboard', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['budget.Budgets', 'budget.Balances', 'budget.CurrentBalanceItems',
    'budget.BalanceRenewalFrequencies', 'budget.BalanceRenewalStrategies', 
    'budget.Purposes', 'budget.ConfirmableBalanceItems', 'budget.ConfirmationReasons',
    'budget.BalanceItemTypes', 'budget.ConfirmationStatuses', 'Months', 'budget.BalanceItemEmployees', 'Employees'],

    models: ['budget.Budget', 'budget.Balance', 'budget.BalanceItem', 'budget.ConfirmableBalanceItem'],

    views: ['budget.dashboard.Root', 'budget.BriefList',
        'budget.dashboard.Overview', 'budget.BalanceInfo',
        'budget.dashboard.CurrentBalanceItemsList', 'budget.dashboard.RefillForm',
        'budget.dashboard.ExpenseConfirmation',
        'budget.dashboard.ExpenseConfirmationFilter'
    ],

    refs: [{
        selector: 'df-budget-dashboard df-budget-list',
        ref: 'budgetList'
    },{
        selector: 'df-budget-dashboard df-budget-balanceinfo',
        ref: 'balanceInfo'
    },{
        selector: 'df-budget-dashboard df-budget-dashboard-overview *[ref=balancePanel]',
        ref: 'balancePanel'
    },{
        selector: 'df-budget-dashboard df-budget-dashboard-currentbalanceitems',
        ref: 'currentBalanceItemsList'
    },{
        selector: 'df-budget-dashboard df-budget-expenseconfirmation',
        ref: 'expenseConfirmationPanel'
    },{
        selector: 'df-budget-dashboard df-budget-dashboard-overview button[ref=nextBalance]',
        ref: 'nextButton'
    },{
        selector: 'df-budget-dashboard df-budget-dashboard-overview button[ref=prevBalance]',
        ref: 'prevButton'
    },{
        selector: 'df-budget-dashboard df-budget-dashboard-overview *[ref=newBalance]',
        ref: 'newBalanceForm'
    },{
        selector: 'df-budget-dashboard df-budget-dashboard-refill *[ref=refill]',
        ref: 'refillForm'
    }],

    config: { currentBalanceId: null, currentBudgetId: null },

    rootView: 'df-budget-dashboard',

    init: function() {
        this.control({
            'df-budget-dashboard df-budget-list': {
                select: this.loadBudget
            },

            'df-budget-dashboard df-budget-dashboard-overview button[ref=nextBalance]': {
                click: this.loadNextBalance
            },

            'df-budget-dashboard df-budget-dashboard-overview button[ref=prevBalance]': {
                click: this.loadPreviousBalance
            },
            
            'df-budget-dashboard df-budget-dashboard-overview combobox[name=balance_id]': {
                select: function(v, rs) {
                    this.setBalance(rs[0].getId());
                }
            },
            
            
            'df-budget-dashboard df-budget-expenseconfirmation df-grid': {
                selectionchange: function(sm, data) {
                    if(!Ext.isEmpty(data)) {
                        this.updateExpenseConfirmationDetails(data[0]);
                    }
                }
            },
            'df-budget-dashboard df-budget-expenseconfirmation panel[ref=detail]': {
                afterrender: function() {
                    var g = this.getExpenseConfirmationPanel().down('df-grid');
                    var rec = g.getStore().getAt(0);
                    
                    //if(rec) this.updateExpenseConfirmationDetails(rec);

                    this.attachConfirmationHandlers();
                }
            },

            'df-budget-dashboard df-budget-dashboard-refill panel[ref=newBalance] button': {
                click: this.renewBalance
            },
            
            'df-budget-dashboard df-budget-dashboard-refill panel[ref=refill] button': {
                click: this.refill
            }            

        });
    },


    attachConfirmationHandlers: function() {
        this.getExpenseConfirmationPanel().setHandlerScope(this);
        this.getExpenseConfirmationPanel().setConfirmHandler(this.confirmExpenseItem);
        this.getExpenseConfirmationPanel().setUnconfirmHandler(this.unconfirmExpenseItem);
    },

    confirmExpenseItem: function(v, rowIndex) {
        var rec = v.getRecord(v.getNode(rowIndex));
        //v.setLoading(true);
        budgetController.confirmBalanceItem(rec.getId(), function() {
            v.getStore().load();
            //v.setLoading(false);
        });
    },

    unconfirmExpenseItem: function(v, rowIndex) {
        var rec = v.getRecord(v.getNode(rowIndex));
        //v.setLoading(true);
        budgetController.unconfirmBalanceItem(rec.getId(), function() {
            v.getStore().load();
            //v.setLoading(false);
        });        
    },

    updateExpenseConfirmationDetails: function(rec) {
        var s = this.getBudgetBalanceItemEmployeesStore(),
            es = this.getEmployeesStore(),
            d = this.getExpenseConfirmationPanel(),
            data = rec.data;
        
        s.filter({ property: 'balanceItem', value: rec.getId()}, null, {
            callback: function() {
                var employees = [];
                s.each(function(balanceItemEmployee) {
                    var foundEmployee = es.getById(balanceItemEmployee.get('user_id'));
                    if(foundEmployee) employees.push(foundEmployee.get('name'));
                });
                
                data.associatedEmployees = employees.join(", ");
                d.updateDetails.apply(d, [data]);        
            }
        });    
        
    },

    //budget overview logic (separate controller?)

    loadBudget: function(v, r) {
        this.setCurrentBudgetId(r.getId());
        
        //this.getBalancePanel().setLoading(true);
        this.getBalancePanel().setTitle(r.get('title'));
        
        this.constrainBalanceStoreToBudgetId(r);
        
        r.get('balanceRenewalStrategy_id') == 0 ? this.getNewBalanceForm().show():this.getNewBalanceForm().hide();
    },

    constrainBalanceStoreToBudgetId: function(r) {
        if(r != null) {
            var bs = this.getBudgetBalancesStore();
            //bs.clearFilter(); 
            bs.filter({ property: 'budget_id', value: r.getId() });
            console.log(bs.filters);
            this.setBalance(r.get('currentBalance_id'), r);
            bs.sort('from', 'DESC');
        }
    },

    setBalance: function(balanceId, budgetRecord) {
        if(balanceId) {
            var balance = this.getBudgetBalancesStore().getById(balanceId),
                budget = budgetRecord ? budgetRecord:this.getBudgetBudgetsStore().getById(balance.get('budget_id')),
                bis = this.getCurrentBalanceItemsList().getStore();

            //bis.clearFilter(); 
            
            bis.filter({ property: 'balance', value: balanceId} , null, {
                callback: function() {
                    this.getBalanceInfo().loadRecord(budget, balance);
                },
                scope: this
            });
            
            this.setCurrentBalanceId(balanceId);
            this.toggleNavButtons(balanceId);
            console.log( this.getBudgetBalancesStore());
            this.getBalancePanel().down('toolbar combobox').select(balanceId);
        }        
        //this.getBalancePanel().setLoading(false);
    },

    toggleNavButtons: function(id) {
        this.getNextButton().setDisabled(!this.getNextBalanceId(id));
        this.getPrevButton().setDisabled(!this.getPrevBalanceId(id));
    },

    getNextBalanceId: function(id) {
        var s = this.getBudgetBalancesStore();
        var nextBalance = s.getAt(s.find('previousBalance_id', id));
        return nextBalance ? nextBalance.get('id'):null;
    },

    getPrevBalanceId: function(id) {
       var b = this.getBudgetBalancesStore().getById(id);
       return b ? b.get('previousBalance_id'):null;
    },

    loadNextBalance: function() {
        var balanceId = this.getNextBalanceId(this.getCurrentBalanceId());
        if(balanceId) this.setBalance(balanceId);
    },

    loadPreviousBalance: function() {
        var balanceId = this.getPrevBalanceId(this.getCurrentBalanceId());
        if(balanceId) this.setBalance(balanceId);
    },

    renewBalance: function() {
        var balStore = this.getBudgetBalancesStore();
        
        balStore.add(Ext.create('DanteFrontend.model.budget.Balance',
            { budget_id: this.getCurrentBudgetId() }
        ));
            
        balStore.sync({
            callback: function() {
                this.loadBudget(null,
                    this.getBudgetBudgetsStore().getById(this.getCurrentBudgetId())
                );
            },
            scope: this
        });
    },
    
    refill: function() {
        
        var balanceItemStore = this.getBudgetCurrentBalanceItemsStore(),
        refillField = this.getRefillForm().down('numberfield[name=sum]');
                    
        balanceItemStore.add(Ext.create('DanteFrontend.model.budget.BalanceItem', { 
            balance_id: this.getCurrentBalanceId(),
            budget_id: this.getCurrentBudgetId(),
            direction_id: 0,
            type_id: 4,
            grandTotal: refillField.getValue(),
            amount: 1,
            description: g("Refill")
        }));
        
        
        //this.getBalancePanel().setLoading(true);
        balanceItemStore.sync({
            callback: function() {
                this.setBalance(this.getCurrentBalanceId())
            },
            scope: this
        });
        
    }
});