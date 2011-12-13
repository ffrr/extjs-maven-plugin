/**
 * ConfirmableExpenseItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 10, 2011
 */

Ext.define('DanteFrontend.store.budget.ConfirmableBalanceItems', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.budget.ConfirmableBalanceItem',

    api: {
        read: budgetController.listConfirmableBalanceItems,
        update: budgetController.confirmBalanceItems
    },

    autoLoad: false,
    remoteFilter: true
    
});