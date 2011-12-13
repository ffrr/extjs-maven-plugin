/**
 * UserPreferences
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 23, 2011
 */

Ext.define('DanteFrontend.controller.account.CustomerUserPrefs', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['account.LoggedCustomerContactAndUser'],
    //models: ['Customer','CustomerAddresses'],
    views: ['account.ManageLoggedCustomerContactAndUser','account.EditCustomerContact'],

    editors: [{
        editor: 'account.EditCustomerContact',
        store: 'account.LoggedCustomerContactAndUser'
    }],

    refs: [{
        selector: 'df-account-manageloggedccu df-account-editcc',
        ref: 'editor'
    }],

    rootView: 'df-account-manageloggedccu',

    init: function() {
        this.callParent(arguments);
    },

    onStoresLoaded: function() {
        var e = this.getEditor();
        e.setRecordAccessor(function() {
            return this.getAccountLoggedCustomerContactAndUserStore().getAt(0);
        }, this);

        e.accessAndLoad();
    }
});