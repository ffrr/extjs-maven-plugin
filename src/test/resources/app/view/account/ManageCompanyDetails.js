/**
 * ManageCompanyDetails
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 23, 2011
 */

Ext.define('DanteFrontend.view.account.ManageCompanyDetails', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.df-account-managecompanydetails',

    initComponent: function() {
        var config = {
            activeTab: 0,
            border: true,
            windowTitle: g('Company details'),
            width: 550,
            height: 350,
            items: [{
                id: 'addressTab',
                title: g('Address'),
                xtype: 'df-account-editcompanyaddr'
            },{
                id: 'otherTab',
                title: g('Other'),
                xtype: 'df-account-editcompanyaddinfo'
            }]
        };
        Ext.apply(this, config);
        this.callParent(arguments);
    }
});
