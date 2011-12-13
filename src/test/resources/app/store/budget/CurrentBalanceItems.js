/**
 * CurrentBalanceItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 10, 2011
 */

Ext.define('DanteFrontend.store.budget.CurrentBalanceItems', {
    extend: 'DanteFrontend.store.budget.BalanceItems',
    model: 'DanteFrontend.model.budget.BalanceItem',
    
    dependencyFilter: {
        property: 'balance_id'
    },
    
    sorters: [{
        property : 'createdOn',
        direction: 'ASC'
    }]
});