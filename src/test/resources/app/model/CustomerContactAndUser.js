/**
 * CustomerContactAndUser
 * A model which unifies customer contact and user. Since model relationships were introduced in ExtJS 4,
 * this model will be refactored in the future to use them.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.model.CustomerContactAndUser', {
    extend: 'Ext.data.Model',
    
    fields: [{
        name: 'id'
    },{
        name: 'customerContactId',
        mapping: 'customerContact.id'
    },{
        name: 'name',
        mapping: 'customerContact.name'
    },{
        name: 'email',
        mapping: 'customerContact.email'
    },{
        name: 'phone',
        mapping: 'customerContact.phone'
    },{
        name: 'description',
        mapping: 'customerContact.description'
    },{
        name: 'receiveInvoices',
        mapping: 'customerContact.receiveInvoices'
    },{
        name: 'receiveReports',
        mapping: 'customerContact.receiveReports'
    },{
        name: 'user',
        mapping: 'customerContact.user'
    },{
        name: 'hasUser'
    },{
        name: 'customerUserId',
        mapping: 'customerUser.id'
    },{
        name: 'login',
        mapping: 'customerUser.login'
    },{
        name: 'password',
        mapping: 'customerUser.password'
    }],

    statics: {
        instanceDefaults: {
            name: g('New contact')
        }
    }
});
