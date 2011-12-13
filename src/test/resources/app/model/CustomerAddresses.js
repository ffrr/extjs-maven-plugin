/**
 * CustomerAddresses
 * A model which unifies billing and postal customer address to use in a form.
 * Since model relationships were introduced in ExtJS 4,
 * this model will be refactored in the future to use them.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.model.CustomerAddresses', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'postalId',
        mapping: 'postalAddress.id'
    },{
        name: 'postalName',
        mapping: 'postalAddress.name'
    },{
        name: 'postalStreet1',
        mapping: 'postalAddress.street1'
    },{
        name: 'postalStreet2',
        mapping: 'postalAddress.street2'
    },{
        name: 'postalMunicipality',
        mapping: 'postalAddress.municipality'
    },{
        name: 'postalPerson',
        mapping: 'postalAddress.person'
    },{
        name: 'postalPostalCode',
        mapping: 'postalAddress.postalCode'
    },{
        name: 'billingId',
        mapping: 'billingAddress.id'
    },{
        name: 'billingName',
        mapping: 'billingAddress.name'
    },{
        name: 'billingStreet1',
        mapping: 'billingAddress.street1'
    },{
        name: 'billingStreet2',
        mapping: 'billingAddress.street2'
    },{
        name: 'billingMunicipality',
        mapping: 'billingAddress.municipality'
    },{
        name: 'billingPerson',
        mapping: 'billingAddress.person'
    },{
        name: 'billingPostalCode',
        mapping: 'billingAddress.postalCode'
    },{
        name: 'hasBillingAddress'
    },'id']
});