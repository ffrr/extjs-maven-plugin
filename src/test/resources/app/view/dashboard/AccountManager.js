/**
 * AccountManager
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */

Ext.define('DanteFrontend.view.dashboard.AccountManager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-dashboard-accountmanager',
    
    frame: true,
    split: true,
    height: 100,
    minHeight: 100,

    initComponent: function() {
        Ext.apply(this, {
            title: g('Account Manager'),
            items: [{
                border: false,
                html: res('tpl.accountManager')
            }]
        });
        this.callParent(arguments);
    }

});