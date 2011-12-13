/**
 * Budgets
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.Budgets', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.budget.Budget',

    api: {
        read: budgetController.list,
        create: budgetController.save,
        update: budgetController.save,
        destroy: budgetController.destroy
    },

    autoLoad: false,
    remoteFilter: true
});