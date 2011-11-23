/**
 * Root
 * The root view (panel widget) of the whole application.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

Ext.define('DanteFrontend.view.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-root',

    initComponent: function() {
        Ext.apply(this, {
            layout: 'border',
            items: [{
                xtype: 'df-main-toolbar',
                region: 'north',
                margins: '0 0 5 0'
            },{
                xtype: 'df-main-panel',
                region: 'center'
            },{
                xtype: 'df-main-footer',
                region: 'south',
                margins: '10 10 10 5'
            }]
        });
        this.callParent(arguments);
    }
});
