/**
 * Root
 * Root worklog panel
 * 
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

Ext.define('DanteFrontend.view.worklog.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-worklog-root',

    
    collapsible: false,
    border: false,
    margins: '-5 0 0 0',
    width: '100%',
    height: '100%',

    timeLineBottomToolbar: null,

    initComponent: function() {
        Ext.apply(this, {
            title: g('Worklog'),
            layout: 'border',
            region: 'center',
            items: [{
                preventHeader: true,
                region:       'west',
                collapsible:  true,
                width:        250,
                frame:        true,
                split:        true,
                minSize:      250,
                maxSize:      400,
                margins:      '5 0 5 5',
                layout: 'anchor',
                items: [{
                    xtype: 'df-worklog-filter',
                    height: 200
                }]
            }, Ext.apply({
                xtype: 'df-worklog-timeline',
                region: 'center',
                margins: '5 5 5 0'
            }, this.timeLineBottomToolbar)]
        });
        this.callParent(arguments);
    }
});