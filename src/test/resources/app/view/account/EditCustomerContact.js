/**
 * EditCustomerContact
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.view.account.EditCustomerContact', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-account-editcc',

    border: false,

    initComponent: function() {
        var config = {
            
            validatedFields: ['name', 'email', 'login', 'password'],
            items: [{
                xtype: 'tabpanel',
                layout: 'fit',
                width: '100%',
                activeTab: 0,
                border: false,
                items: [{
                    id: 'customerContactTab',
                    //ref: 'customerContactForm',
                    title: g('Basic information'),
                    xtype: 'df-account-editccdetails',
                    border: false,
                    padding: '8',
                    width: '100%'
                },{
                    id: 'attachedUserTab',
                    title: g('User details'),
                    xtype: 'panel',
                    padding: '8',
                    border: false,
                    items: [{
                        xtype:'df-account-editccuser'
                    },{
                        xtype: 'button',
                        style: 'margin: 10px',
                        text: g('Create user'),
                        action: 'createUser',
                        handler: this.enableUserEditing,
                        scope: this
                    }]
                }]
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.callParent(arguments);
    },

    loadRecord: function(record) {
        this.callParent(arguments);
        this.onLoadRecord(record);
    },

    onLoadRecord: function(record) {
        if(!record.phantom && record.data.hasUser) {
            this.enableUserEditing();
        }

        else this.disableUserEditing();
    },

    showCustomerUserForm: function() {
        this.down('button[action=createUser]').hide();
        this.down('df-account-editccuser').show();
    },

    hideCustomerUserForm: function() {
        this.down('button[action=createUser]').show();
        this.down('df-account-editccuser').hide();
    },

    validate: function(record, msg) {
        var pass = true;
        if (!this.userEditing) {
            Ext.Array.remove(this.validatedFields, 'login');
            Ext.Array.remove(this.validatedFields, 'password');
            Ext.Array.remove(this.validatedFields, 'passwordRetype');
        }
        Ext.each(this.validatedFields, function(f) {
            var fld = this.getForm().findField(f);
            pass = fld.validate();
            if(!pass) fld.markInvalid(g('This field is invalid.'));
            return pass;
        }, this);

        if(!pass) return pass;
        
        if(this.userEditing) {
            if(Ext.isEmpty(record.data.customerUserId)) {
                pwMatch = this.down('df-account-editccuser').passwordMatch(true);
                pass = pass && pwMatch;
                if(!pwMatch) this.addValidationMessage(g('The passwords do not match, or are empty.'));
            } else {
                pwMatch = this.down('df-account-editccuser').passwordMatch();
                pass = pass && pwMatch;
                if(!pwMatch) this.addValidationMessage(g('The passwords do not match.'));
            }
        }
        
        return pass;
    },

    updateAccessorRecord: function() {
        //var editor = this.getEditor();
        var record = this.accessRecord();
        if(this.validate(record)) {
            if(this.userEditing) {
                record.set('hasUser', true);
            } else {
                record.set('hasUser', false)
            }
            this.getForm().updateRecord(record);
            return true;
        }
        this.alertValidation();
        return false;
    },
    
    enableUserEditing: function() {
        this.userEditing = true;
        this.showCustomerUserForm();
    },

    disableUserEditing: function() {
        this.userEditing = false;
        this.hideCustomerUserForm();
    }
    
});