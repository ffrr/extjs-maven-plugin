/**
 * Filter
 * Filter form for the TimeLine grid.
 *
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.view.worklog.Filter', {
    extend: 'Ext.form.Panel',
    alias: 'widget.df-worklog-filter',

    frame:        true,
    collapsible:  true,
    anchor:       '100%',
    buttonAlign:    'center',

    initComponent: function() {
        var config = {
            paramsAsHash: true,
            title:        g('Filters'),

            api: {
                load: worklogController.filterLoad,
                submit: worklogController.filterExecute
            },
            items: [{
                xtype: 'combo',
                name: 'month',
                fieldLabel: g('Month'),
                labelWidth: 60,
                queryMode: 'local',
                store: 'Months',
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                minListWidth: 130,
                forceSelection: true,
                emptyText: g('All months')
              },{
                xtype: 'df-combo',
                name: 'employee',
                fieldLabel: g('Employee'),
                labelWidth: 60,
                queryMode: 'local',
                store: 'Employees',
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                minListWidth: 250,
                emptyText: g('All employees'),
                clearable: true
              },{
                id: 'customer-combo',
                xtype: 'df-combo',
                name: 'customer',
                fieldLabel: g('Customer'),
                labelWidth: 60,
                queryMode: 'local',
                store: 'Customers',
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                minListWidth: 250,
                emptyText: g('All customers'),
                clearable: true
              },{
                xtype: 'df-combo',
                name: 'project',
                fieldLabel: g('Project'),
                labelWidth: 60,
                queryMode: 'local',
                store: 'Projects',
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                minListWidth:   250,
                emptyText: g('All projects'),
                clearable: true
              }
            ],
            buttons: [{
                text: g('Apply filters'),
                action: 'applyFilters'
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.callParent(arguments);
    }
});
