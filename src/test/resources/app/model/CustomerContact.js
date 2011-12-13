/**
 * CustomerContact
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 30, 2011
 */

Ext.define('DanteFrontend.model.CustomerContact', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id'
    },{
        name: 'name'
    },{
        name: 'email'
    },{
        name: 'phone'
    },{
        name: 'description'
    },{
        name: 'receiveInvoices'
    },{
        name: 'receiveReports'
    },{
        name: 'user '
    }]
});