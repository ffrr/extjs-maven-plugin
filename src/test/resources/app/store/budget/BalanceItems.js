/**
 * BalanceItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.BalanceItems', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.budget.BalanceItem',

    api: {
        read: budgetController.listBalanceItems,
        create: budgetController.saveBalanceItem,
        update: budgetController.saveBalanceItem,
        destroy: budgetController.destroyBalanceItem
    },

    autoLoad: false,
    remoteFilter: true,
    
    sorters: [{
        property : 'receivedOn',
        direction: 'DESC'
    }],

    sortOnLoad: true
    
});