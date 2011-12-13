/**
 * BalanceItemTypes
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 29, 2011
 */

Ext.define('DanteFrontend.store.budget.BalanceItemTypes', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data: [{
        id: 0,
        name: g('Invoice')
    },{
        id: 1,
        name: g('Bill')
    },{
        id: 2,
        name: g('Budget transfer')
    },{
        id: 3,
        name: g('Balance transfer')
    },{
        id: 4,
        name: g('External refill')
    },{
        id: 5,
        name: g('Other')
    }]

});