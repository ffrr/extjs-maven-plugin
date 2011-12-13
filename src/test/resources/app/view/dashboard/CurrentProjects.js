/**
 * CurrentProjects
 * Current projects view.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.view.dashboard.CurrentProjects', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.df-dashboard-currentprojects',

    frame: true,
    split: true,
    viewConfig: {
        emptyText:      g('No projects are currently in progress.'),
        stripeRows:     true
    },
    
    initComponent: function() {
        Ext.apply(this, {
            title: g('Current Projects'),
            features: [{ftype: 'grouping'}],

            disableSelection: true,
            store: 'dashboard.CurrentProjects',
            columns: [{
              id: 'projectName',
              header: g('Project Name'),
              width: 160,
              renderer: DanteFrontend.view.Renderers.dashboard.projectName,
              dataIndex: 'name',
              flex:         1
            },{
              align: 'right',
              header: g('Planned'),
              width: 65,
              renderer: DanteFrontend.view.Renderers.duration,
              dataIndex: 'timePlanned'
            },{
              align: 'right',
              header: g('Remaining'),
              width: 75,
              renderer: DanteFrontend.view.Renderers.dashboard.timeRemaining,
              dataIndex: 'timeSpent'
            },{
              header: '',
              width: 250,
              sortable: false,
              menuDisabled: true,
              renderer: DanteFrontend.view.Renderers.dashboard.plannedTimeRemaining,
              dataIndex: 'timeSpentGraph'
            }]
        });
        this.callParent(arguments);
    }
    
    
    
});