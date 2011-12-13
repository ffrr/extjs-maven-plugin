/**
 * CompanyDetails
 * 
 * @author fk
 * @version 0.1
 * @date Jun 23, 2011
 */

Ext.define('DanteFrontend.controller.account.CompanyDetails', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['account.CustomerAddresses', 'account.CustomerAdditionalInfo'],
    models: ['Customer','CustomerAddresses'],
    views: ['account.EditCompanyAdditionalInfo', 'account.EditCompanyAddresses',
        'account.ManageCompanyDetails'
    ],

    editors: [{
        editor: 'account.EditCompanyAddresses',
        store: 'account.CustomerAddresses',
        handler: 'saveCompanyAddress'
    },{
        editor: 'account.EditCompanyAdditionalInfo',
        store: 'account.CustomerAdditionalInfo'
    }],

    refs: [{
        selector: 'df-account-editcompanyaddr',
        ref: 'companyAddressEditor'
    },{
        selector: 'df-account-editcompanyaddinfo',
        ref: 'companyAddInfoEditor'
    },{
        selector: 'df-account-editcompanyaddr fieldset[ref=billingAddressPanel]',
        ref: 'billingAddressFieldset'
    }],

    rootView: 'df-account-managecompanydetails',

    init: function() {
        this.callParent(arguments);
    },

    saveCompanyAddress: function() {
        var editor = this.getCompanyAddressEditor();
        var store = this.getStore('account.CustomerAddresses');
        if(editor.validateAndUpdate()) {
            if (!this.getBillingAddressFieldset().collapsed) {
                editor.accessRecord().set('hasBillingAddress', true);
            }
            store.sync();
        }
    },

    onStoresLoaded: function() {

        this.getCompanyAddressEditor().setRecordAccessor(function() {
            return this.getStore('account.CustomerAddresses').getAt(0);
        }, this);

        this.getCompanyAddInfoEditor().setRecordAccessor(function() {
            return this.getStore('account.CustomerAdditionalInfo').getAt(0);
        }, this);

        
        //var addressRecord = this.getCompanyAddressEditor().accessAndLoad();
        var addressRecord = this.getCompanyAddressEditor().accessAndLoad();
        this.getCompanyAddInfoEditor().accessAndLoad();
        
        if(addressRecord.get('hasBillingAddress') == true)
            this.getBillingAddressFieldset().expand();
    }




});