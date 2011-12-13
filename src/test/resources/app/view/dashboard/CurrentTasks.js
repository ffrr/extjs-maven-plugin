/**
 * CurrentTasks
 * Current tasks view.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.view.dashboard.CurrentTasks', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.df-dashboard-currenttasks',


    frame: true,
    split: true,
    disableSelection: true,
    
    
    initComponent: function() {
        Ext.apply(this, {
            title: g('Current Tasks'),
            store: 'dashboard.CurrentTasks',
            loadMask: {
                msg: g('Please wait, loading...'),
                store: 'dashboard.CurrentTasksStore'
            },
            viewConfig: { stripeRows: true },
            columns: [{
                header: 'Project Name',
                width: 125,
                dataIndex: 'projectName'
            },{
                id: 'description',
                header: 'Task Description',
                width: 160,
                flex: 1,
                dataIndex: 'description'
            },{
                header:       g('Duration'),
                width:        65,
                dataIndex:    'duration',
                renderer:  DanteFrontend.view.Renderers.duration
            }, {
                header:       g('Begin Time'),
                width:        125,
                dataIndex:    'begin',
                xtype:        'datecolumn',
                format:       'd.m.Y H:i',
                hidden:       true
            }, {
                header:       g('End Time'),
                width:        125,
                dataIndex:    'end',
                xtype:        'datecolumn',
                format:       'd.m.Y H:i',
                hidden:       true
            }, {
                header:       g('OTRS Ticket'),
                width:        115,
                dataIndex:    'ticket'
            }, {
                header:       g('Owner'),
                width:        105,
                dataIndex:    'userName',
                hidden:       true
            }],
            features: [{
                ftype: 'grouping',
                groupHeaderTpl: '{name}'
            }]
        });
        this.callParent(arguments);
    }
});