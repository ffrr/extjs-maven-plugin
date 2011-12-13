/**
 * BudgetUser
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 12, 2011
 */

Ext.define('DanteFrontend.model.budget.BudgetUser', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id'
    },{
        name: 'user_id',
        mapping: 'user',
        type: 'int'
    },{
        name: 'budget_id',
        mapping: 'budget',
        type: 'int'
    },{
        name: 'maxItemPrice',
        type: 'int'
    },{
        name: 'canConfirm',
        type: 'boolean'
    }],

    statics: {
        instanceDefaults: {
            canConfirm: 1
        }
    },

    validations: [{
        type: 'presence',  field: 'user_id'
    }]
});
