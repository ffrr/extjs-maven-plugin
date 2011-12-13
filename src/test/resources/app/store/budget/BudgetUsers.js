/**
 * BudgetUsers
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 12, 2011
 */

Ext.define('DanteFrontend.store.budget.BudgetUsers', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.budget.BudgetUser',

    api: {
        read: budgetController.listBudgetUsers,
        create: budgetController.saveBudgetUser,
        destroy: budgetController.destroyBudgetUser
    },

    autoLoad: false,
    remoteFilter: true,
    dependencyFilter: {
        property: 'budget_id'
    }
});