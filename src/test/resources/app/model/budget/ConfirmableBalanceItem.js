/**
 * BalanceItem
 *
 * @author fk
 * @version 0.1
 * @date Sep 27, 2011
 */

Ext.define('DanteFrontend.model.budget.ConfirmableBalanceItem', {
    extend: 'Ext.data.Model',

    fields: [{
        name:'id',
        type: 'int'
    },{
        name: 'type_id',
        mapping: 'type',
        type: 'int'
    },{
        name: 'direction_id',
        mapping: 'direction',
        type: 'int'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'receivedOn',
        type: 'date',
        dateFormat: Ext.Date.patterns.ISO8601Long
    },{
        name: 'paidOn',
        type: 'date',
        dateFormat: Ext.Date.patterns.ISO8601Long
    },{        
        name: 'amount',
        type: 'float'
    },{
        name: 'base',
        type: 'float'
    },{
        name: 'total',
        type: 'float'
    },{
        name: 'grandTotal',
        type: 'float'
    },{
        name: 'runningTotal',
        type: 'float'
    },{
        name: 'confirmationReason_id',
        mapping: 'confirmationReason',
        type: 'int'
    },{
        name: 'confirmationStatus_id',
        mapping: 'confirmationStatus',
        type: 'int'
    },{
        name: 'balance_id',
        mapping: 'balance',
        type: 'int'
    //confirmable mappings        
    },{
        name: 'action_id',
        mapping: 'action',
        type: 'int'
    },{
        name: 'budget_id',
        mapping: 'budget',
        type: 'int'
    },{
        name: 'createdBy',
        type: 'int'
    }],

    associations: [{
        type: 'belongsTo', model: 'DanteFrontend.model.budget.Balance', autoLoad: false, associationKey: 'balance', getterName: 'getBalance', setterName: 'setBalance'
    }],

    isExpense: function() {
        return this.get('direction_id') == 1;
    },
    
    isConfirmable: function() {
        return this.get('action_id') == 1;
    },
    
    isRevokable: function() {
        return this.get('action_id') == 2 ;
    },

    getBalance: function() {
        var id = this.get('balance_id');
        return Ext.data.StoreManager.lookup('budget.Balances').getById(id);
    }
});