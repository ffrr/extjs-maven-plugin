/**
 * Panel
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */


Ext.define('DanteFrontend.view.dashboard.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-dashboard-root',
    
    collapsible:      false,
    border:           false,
    split:            true,
    margins:          '-5 0 0 0',
    layout:           'border',
    width:            '100%',
    height: '100%',
    region: 'center',
    
    initComponent: function() {
        Ext.apply(this, {
            title:            g('Dashboard'),
            items: [{
                region:           'center',
                xtype: 'panel',
                collapsible:      false,
                border:           false,
                split:            true,
                minSize:          250,
                maxSize:          400,
                margins:          '5 0 0 5',
                layout:           'border',
                items: [
                    {xtype: 'df-dashboard-currentprojects', region: 'north', height: '50%'},
                    {xtype: 'df-dashboard-currenttasks', region: 'center', autoHeight: true}
                ]
            },{
                region:           'east',
                xtype: 'panel',
                collapsible:      true,
                width:            400,
                border:           false,
                split:            true,
                minSize:          350,
                maxSize:          500,
                margins:          '5 5 0 0',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {xtype: 'df-dashboard-accountmanager'},
                    {xtype: 'df-dashboard-hotlinephone', flex: 1, maxHeight: 80},
                    {xtype: 'df-dashboard-hotlineemail', flex: 2}
                ]
            }]
        });
        this.callParent(arguments);
    }
});