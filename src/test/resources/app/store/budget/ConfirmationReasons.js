/**
 * ConfirmationReasons
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 11, 2011
 */

Ext.define('DanteFrontend.store.budget.ConfirmationReasons', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data:  [{
        id: 0,
        name: g('Confirmation not needed')
    },{
        id: 1,
        name: g('Always confirmable')
    },{
        id: 2,
        name: g('Balance is overdrawn')
    },{
        id: 3,
        name: g('Over maximum item price')
    }]
});