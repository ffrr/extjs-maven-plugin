/**
 * ManageContacts
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.view.account.ManageCustomerContacts', {
    extend: 'DanteFrontend.lib.view.Editor',
    alias: 'widget.df-account-managecc',

    border: false,
    noContactText: g('No contact selected'),
    
    initComponent: function() {

        var config = {
            layout: 'border',
            windowTitle: g('Customer contacts'),
            width: 550,
            height: 300,
            items: [{
                region: 'center',
                layout: 'border',
                border: true,
                items: [{
                    xtype: 'component',
                    region: 'north',
                    padding: '8',
                    //ref: 'customerContactTabTitle',
                    autoEl: {
                        tag: 'h3',
                        cls: 'contact-tabpanel-title',
                        html: '',
                        style: { height: '30px' }
                        }
                    },{
                    xtype: 'df-account-editcc',
                    region: 'center',
                    layout: 'fit'
                    }]
                },{
                    xtype: 'df-account-listcc',
                    region: 'west',
                    width: 200,
                    split: true,
                    store: 'account.CustomerContactsAndUsers'
                }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);

    },

    setContactText: function(str) {
        var cmp = this.down('component[region=north]');
        if(cmp.rendered) cmp.getEl().dom.innerHTML =
            str ? str:this.noContactText;
    }

});
