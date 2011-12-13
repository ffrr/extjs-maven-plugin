/**
 * Customer contacts editor controller.
 *
 * TODO:
 * - refactor most of this functionality to an 'editor' component. This should be done if there's
 * more 'editor' components to be deployed, it's unnecessary now.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

//Ext.require('DanteFrontend.view.dashboard.Root');
Ext.define('DanteFrontend.controller.account.CustomerContacts', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['account.CustomerContactsAndUsers'],
    models: ['CustomerContactAndUser','CustomerContact', 'User'],
    views: ['account.EditCustomerContactDetails', 'account.EditCustomerUser',
        'account.EditCustomerContact', 'account.ListCustomerContacts',
        'account.ManageCustomerContacts'
    ],

    config: {
        currentIndex: null
    },

    editors: [{
        editor: 'account.EditCustomerContact',
        store: 'account.CustomerContactsAndUsers',
        handler: 'save'
    }],

    rootView: 'df-account-managecc',

    refs: [{
        selector: 'df-account-managecc',
        ref: 'root'
    },{
        selector: 'df-account-managecc df-account-listcc',
        ref: 'list'
    },{
        selector: 'df-account-managecc df-account-editcc',
        ref: 'editor'
    },{
        selector: 'df-account-managecc df-account-editccuser',
        ref: 'userEditor'
    },{
        selector: 'df-account-editcc button',
        ref: 'createUserButton'
    }],

    init: function() {
        this.control({
           'df-account-managecc': {
                afterrender: this.onRootViewRender
           },
           'df-account-managecc df-account-listcc': {
                select: this.onListRowSelect,
                itemremoved: this.onListItemRemoved
           }
        });
        this.callParent(arguments);
    },
    

    onRootViewRender: function() {
        this.getList().down('headercontainer').on('sortchange', function() {
            var rec = DanteFrontend.lib.Util.first(this.getList().getSelectionModel().getSelection());
            if(rec) {
                this.setCurrentIndex(rec.index);
            }
        }, this);

        var store = this.getAccountCustomerContactsAndUsersStore();
        store.on('aftersync', function() {
            this.getList().getSelectionModel().select(this.getCurrentIndex());
        }, this);

        this.getEditor().hide();
        this.getRoot().setContactText(false);

        var first = store.getAt(0);
        if(first) this.loadRecord(first);
        
    },

    onListRowSelect: function(cmp, record) {
        this.loadRecord(record);
    },

    onListItemRemoved: function(item, grid) {
        var hasRecords = grid.getStore().count() > 0;
        if(hasRecords) {
            selModel.select(0);
        } else {
            this.getRoot().setContactText(false);
            this.getEditor().hide();
        }
    },

    loadRecord: function(record) {
        this.setCurrentIndex(!Ext.isEmpty(record.index) ? record.index:
            this.getAccountCustomerContactsAndUsersStore().lastIndex);

        this.getEditor().loadRecord(record);
        this.getEditor().show();
        this.getRoot().setContactText(record.data.name);
    },

//    setCurrentIndex: function(index) {
//        this.currentIndex = Ext.isEmpty(index) ? this.getList().getSelectionModel().getLastSelected()
//    },

    save: function() {
        var store = this.getAccountCustomerContactsAndUsersStore();
        if(this.getEditor().updateAccessorRecord()) {
            store.sync();
        }
    },

    onStoresLoaded: function() {
        this.getEditor().setRecordAccessor(function() {
            return this.getAccountCustomerContactsAndUsersStore().getAt(this.getCurrentIndex());
        }, this);
    }
});