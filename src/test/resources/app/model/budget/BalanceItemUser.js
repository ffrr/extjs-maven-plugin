/**
 * BalanceItemUser
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 6, 2011
 */

Ext.define('DanteFrontend.model.budget.BalanceItemUser', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id'
    },{
        name: 'user_id',
        mapping: 'user',
        type: 'int'
    },{
        name: 'balanceItem_id',
        mapping: 'balanceItem',
        type: 'int'
    },{
        name: 'relationshipRole_id',
        mapping: 'relationshipRole',
        type: 'int'
    }]
});