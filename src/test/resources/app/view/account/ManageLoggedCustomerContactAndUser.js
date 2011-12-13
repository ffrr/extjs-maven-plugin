/**
 * ManageUserPreferences
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 23, 2011
 */

Ext.define('DanteFrontend.view.account.ManageLoggedCustomerContactAndUser', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-account-manageloggedccu',
    
    initComponent: function() {
        var config = {
            layout: 'border',
            windowTitle: g('User preferences'),
            width: 350,
            height: 250,
            padding: '8 0 8 0',
            border: false,
            items: {
                region: 'center',
                xtype: 'df-account-editcc'
            }
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});