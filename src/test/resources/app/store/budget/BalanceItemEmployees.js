/**
 * BalanceItemEmployees
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 6, 2011
 */


Ext.define('DanteFrontend.store.budget.BalanceItemEmployees', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.budget.BalanceItemUser',

    api: {
        read: budgetController.listBalanceItemAssociatedEmployees,
        create: budgetController.saveBalanceItemAssociatedEmployees,
        destroy: budgetController.destroyBalanceItemAssociatedEmployees
    },

    autoLoad: false,
    remoteFilter: true,
    
    dependencyFilter: {
        property: 'balanceItem_id'
    }
});