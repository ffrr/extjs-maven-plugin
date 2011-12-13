/**
 * TimeLine
 * The default worklog timeline grid.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */


Ext.define('DanteFrontend.view.worklog.TimeLine', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.df-worklog-timeline',
    require: ['DanteFrontend.lib.view.ExportTools'],

    margins:  '5 5 0 0',
    stripeRows: true,


    initComponent: function() {
        Ext.apply(this, {
            title:    g('List of Tasks'),
            store:    'worklog.TimeLine',
            features: [{
                groupHeaderTpl: '{name}',
                ftype: 'groupingsummary'
            }],
            loadMask: {
                msg:    g('Please wait, loading...'),
                store:  'worklog.TimeLine'
            },
            
            columns: [{
                header:     g('Employee Name'),
                dataIndex:  'userName',
                width:      100,
                sortable:   true
            },{
                header:     g('Customer Name'),
                dataIndex:  'customerName',
                width:      150,
                sortable:   true
            },{
                header:     g('Project Name'),
                dataIndex:  'projectName',
                width:      150,
                sortable:   true
            },{
                id:         'task_description_column',
                header:     g('Task Description'),
                dataIndex:  'description',
                renderer: DanteFrontend.view.Renderers.worklog.descriptionTooltip,
                width:      250,
                sortable:   true,
                summaryType:'count',
                summaryRenderer: DanteFrontend.view.Renderers.worklog.taskSummary
            },{
                renderer:   DanteFrontend.view.Renderers.duration,
                header:     g('Duration'),
                dataIndex:  'duration',
                width:      75,
                sortable:   true,
                align:      'right',
                summaryType:'sum',
                summaryRenderer: DanteFrontend.view.Renderers.duration
            },{
                header:     g('Task Started'),
                dataIndex:  'begin',
                width:      125,
                sortable:   true,
                align:      'right',
                xtype:      'datecolumn',
                format:     DanteFrontend.common.defaultDateFormat,
                summaryType: 'min',
                summaryRenderer: DanteFrontend.view.Renderers.date
            },{
                header:     g('Task Ended'),
                dataIndex:  'end',
                width:      125,
                sortable:   true,
                align:      'right',
                xtype:      'datecolumn',
                format:     DanteFrontend.common.defaultDateFormat,
                summaryType: 'max',
                summaryRenderer: DanteFrontend.view.Renderers.date
            }],
            autoExpandColumn: 'task_description_column',
            disableSelection: true
        });

        this.callParent(arguments);
    }
});
