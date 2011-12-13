/**
 * BalanceItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 4, 2011
 */

Ext.define('DanteFrontend.controller.budget.BalanceItems', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['budget.Budgets', 'budget.BudgetUsers', 'budget.Balances', 'budget.BalanceItems',
        'budget.Purposes', 'Months', 'budget.ConfirmableBalanceItems', 'budget.ConfirmingUsers',
        'budget.BalanceItemEmployees', 'budget.BalanceItemDirections',
        'budget.BalanceItemTypes', 'Employees', 'budget.ConfirmationStatuses', 'budget.ConfirmationReasons'],
    
    models: ['budget.Budget','budget.BalanceItem', 'budget.ConfirmableBalanceItem','budget.BalanceItemUser'],

    views: ['budget.balanceitems.Root', 'budget.balanceitems.List',
    'budget.balanceitems.Filter', 'budget.balanceitems.ExpenseDetailsForm', 
    'budget.balanceitems.IncomeDetailsForm', 'budget.balanceitems.DetailsForm',
    'budget.balanceitems.ConfirmationGrid'],

    refs: [{
        selector: 'df-budget-balanceitems df-statepanel[ref=details]',
        ref: 'details'
    },{
        selector: 'df-budget-balanceitems *[ref=expenseForm]',
        ref: 'expenseForm'
    },{
        selector: 'df-budget-balanceitems *[ref=incomeForm]',
        ref: 'incomeForm'
    },{
        selector: 'df-budget-balanceitems df-budget-balanceitems-details',
        ref: 'editor'
    },{
        selector: 'df-budget-balanceitems df-budget-balanceitems-filter',
        ref: 'filter'
    },{
        selector: 'df-budget-balanceitems df-budget-balanceitems-list',
        ref: 'list'        
    },{
        selector: 'df-budget-balanceitems *[ref=expenseForm] *[ref=confirmation] df-grid',
        ref: 'confirmationGrid'
    },{
        selector: 'df-budget-balanceitems *[ref=expenseForm] *[ref=associatedEmployees] df-grid-adding',
        ref: 'associatedEmployeesGrid'        
    }],

    rootView: 'df-budget-balanceitems',

    init: function() {
        this.control({
            
            'df-budget-balanceitems df-msedit': {
                selectitem: this.loadItem,
                createitem: this.loadItem
                
            },
            'df-budget-balanceitems df-budget-balanceitems-filter': {
                render: function(v) {
                    v.down('df-combo[name=balance_id]').hide();
                }
            },
            'df-budget-balanceitems df-budget-balanceitems-filter df-combo[name=budget_id]': {
                select: function(v, rec) {
                    var bc = this.getFilter().down('df-combo[name=balance_id]'),
                        bs = bc.store;
                    
                    //bs.clearFilter();
                    bs.filter({
                        property: 'budget_id', value: rec[0].getId()
                    });
                    
                    bc.show();
                    bc.select(rec[0].get('currentBalance_id'));
                    
                    this.getFilter().down('df-combo[name=receivedOn]').hide();
                },
                
                clear: function(v) {
                    var bc = this.getFilter().down('df-combo[name=balance_id]');
                    bc.hide();
                    this.getFilter().down('df-combo[name=receivedOn]').show();                    
                }
            },
            'df-budget-balanceitems df-budget-balanceitems-list button[action=addExpense]': {
                click: this.addExpense
            },
            
            'df-budget-balanceitems df-budget-balanceitems-list button[action=addIncome]': {
                click: this.addIncome
            },
            'df-budget-balanceitems *[ref=expenseForm]': {
                save: this.saveItem
            },
            'df-budget-balanceitems *[ref=incomeForm]': {
                save: this.saveItem
            },
            
            'df-budget-balanceitems *[ref=expenseForm] *[ref=associatedEmployees] df-grid-adding': {
               itemadded: this.attachEmployeeToExpense
            },
            
            'df-budget-balanceitems *[ref=expenseForm] *[ref=confirmation] button[action=confirm]': {
               click: this.confirmExpenseItem
            },
            
            'df-budget-balanceitems *[ref=expenseForm] *[ref=confirmation] button[action=unconfirm]': {
               click: this.unconfirmExpenseItem
            }
        });
        
    },
   

    loadItem: function(r) {
        r.isExpense() ? this.showExpenseForm(r):this.showIncomeForm(r);
        this.getEditor().accessAndLoad();
    },
    
    showExpenseForm: function(r) {
        this.getEditor().showExpenseForm();
        var f = this.getExpenseForm();
        if(r.phantom) {            
            f.down('*[ref=confirmation]').disable();
            f.down('*[ref=associatedEmployees]').disable();
        } else {
            r.get('confirmationStatus_id') > 0 ? 
                f.down('*[ref=confirmation]').enable():
                f.down('*[ref=confirmation]').disable();
            
            f.down('*[ref=associatedEmployees]').enable();            
                        
            var cgs = this.getConfirmationGrid().getStore(),
                aes = this.getAssociatedEmployeesGrid().getStore(),
                flt = {
                    property: 'balanceItem',
                    value: r.getId()
            };
             
            //cgs.clearFilter(); 
            cgs.filter(flt);
            //aes.clearFilter(); 
            aes.filter(flt);
            
            this.switchConfirmationButtons(r);
        }
        
    },
    
    
    showIncomeForm: function() {
        this.getEditor().showIncomeForm();
    },
        
    
    switchConfirmationButtons: function(r) {
        this.getConfirmationGrid().switchButtons(
            this.getBudgetConfirmableBalanceItemsStore().getById(r.getId())
        );
    },
    
      
    confirmExpenseItem: function() {
        var rec = this.getExpenseForm().accessRecord(),
            me = this;
        
        budgetController.confirmBalanceItem(rec.getId(), function() {
            me.getBudgetBalanceItemsStore().load({
                callback: function() {
                    var newRec = me.getBudgetBalanceItemsStore().getById(rec.getId());
                    me.getList().getSelectionModel().select(newRec);
                    me.loadItem(newRec);
                }
            })
        });
    },

    unconfirmExpenseItem: function() {
        var rec = this.getExpenseForm().accessRecord(),
            me = this;

        budgetController.unconfirmBalanceItem(rec.getId(), function() {
            me.getBudgetBalanceItemsStore().load({
                callback: function() {
                    var newRec = me.getBudgetBalanceItemsStore().getById(rec.getId());
                    me.getList().getSelectionModel().select(newRec);
                    me.loadItem(newRec);
                }
            })
        });        
    },    

    addExpense: function() {
        var g = this.getList(),
            bs = this.getBudgetBudgetsStore();
        
        g.addItem(Ext.create('DanteFrontend.model.budget.BalanceItem', Ext.apply(
            DanteFrontend.model.budget.BalanceItem.instanceDefaults, { 
                direction_id: 1,
                budget_id: bs.getAt(0).getId()
        })));
    },

    addIncome: function() {
        var g = this.getList(),
            bs = this.getBudgetBudgetsStore();
        
        g.addItem(Ext.create('DanteFrontend.model.budget.BalanceItem', Ext.apply(
            DanteFrontend.model.budget.BalanceItem.instanceDefaults, { 
                direction_id: 0,
                budget_id: bs.getAt(0).getId()
        })));
    },
    
    saveItem: function() {
        if(this.getEditor().validateAndUpdate()) {
            this.getBudgetBalanceItemsStore().sync();
        }
    },
    
    attachEmployeeToExpense: function(v, r) {
        var s = v.getStore();
        s.add(Ext.create('DanteFrontend.model.budget.BalanceItemUser', { 
            user_id: r.getId(),
            balanceItem_id: this.getEditor().accessRecord().getId()
        }));        
        s.sync();        
    }
});