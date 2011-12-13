/**
 * Balances
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.Balances', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.budget.Balance',

    api: {
        read: budgetController.listBalances,
        create: budgetController.renewBalance
    },

    autoLoad: false,
    remoteFilter: false
});