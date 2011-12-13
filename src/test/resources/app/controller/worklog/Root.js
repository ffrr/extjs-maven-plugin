/**
 * Root worklog panel controller.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

Ext.define('DanteFrontend.controller.worklog.Root', {
    extend: 'DanteFrontend.lib.Controller',

    stores: ['Employees', 'Months', 'Customers', 'Projects', 'worklog.TimeLine'],
    models: ['Employee', 'Month', 'Customer', 'Project', 'TimeLine'],
    views: ['worklog.Root', 'worklog.Filter', 'worklog.TimeLine'],

    rootView: 'df-worklog-root',
    api: {
        preload: worklogController.preload
    },

    refs: [{
            selector: 'df-worklog-filter',
            ref: 'filter'
        },{
            selector: 'df-worklog-timeline',
            ref: 'timeline'
        }],

    init: function() {
        this.on('storesloaded', function() {
            this.getFilter().load({
                success: this.filterLoadHandler,
                scope: this
            });
        }, this);

        this.control({
            'button[action=applyFilters]': {
                click: function() {
                    this.getFilter().submit({
                        success: this.filterSubmitHandler,
                        scope: this
                    });
                }
            }
        })

        this.callParent(arguments);
    },

    handlePreload: function(callback, resolver, args) {
        this.getApi().preload(this.getProjectId(args[1]), Ext.bind(function(res) {
            this.loadStores();
        }, this));
    },

    getPreloadParam: function(args) {
        return this.getProjectId(args[1]);
    },
        
    getProjectId: function(o) {
        return (!Ext.isEmpty(o)) ? o['project']: null;
    },

    getRootViewInstance: function() {
        return this.callParent(arguments);
    },

    filterLoadHandler: function() {},

    filterSubmitHandler: function() {
        this.getWorklogTimeLineStore().load();
    }
});