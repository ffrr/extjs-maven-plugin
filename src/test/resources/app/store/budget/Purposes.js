/**
 * Purposes
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.Purposes', {
    extend: 'Ext.data.Store',

    fields: ['id', 'name'],
    data: [{
        id: 0,
        name: g('Office supplies')
    },{
        id: 1,
        name: g('Education')
    },{
        id: 2,
        name: g('Client orders')
    },{
        id: 3,
        name: g('Hardware')
    },{
        id: 4,
        name: g('Drinks')
    },{
        id: 5,
        name: g('Rocket fuel')
    }]
});