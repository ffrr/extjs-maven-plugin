/**
 * RootWithExportTools
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 2, 2011
 */

Ext.define('DanteFrontend.controller.worklog.RootWithExportTools', {
    extend: 'DanteFrontend.controller.worklog.Root',

    views: ['worklog.RootWithExportTools', 'worklog.Filter', 'worklog.TimeLine'],
    rootView: 'df-worklog-root-et',

    init: function() {
        this.callParent(arguments);
    },

    filterLoadHandler: function() {
        this.switchExportTools();
    },

    filterSubmitHandler: function() {
        this.switchExportTools();
        this.getWorklogTimeLineStore().load();
    },

    switchExportTools: function() {
        this.getFilter().getForm().findField('customer').getValue() == 0 ?
            this.getTimeline().down('df-exporttools').disableExport():
            this.getTimeline().down('df-exporttools').enableExport();

    }


});

/**
 * Root worklog panel controller.
 *
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

//Ext.define('DanteFrontend.controller.worklog.RootWithExportTools', {
//    extend: 'DanteFrontend.lib.Controller',
//
//    stores: ['worklog.Employees', 'worklog.Months', 'worklog.Customers', 'worklog.Projects', 'worklog.TimeLine'],
//    models: ['Employee', 'Month', 'Customer', 'Project', 'TimeLine'],
//    views: ['worklog.Root', 'worklog.Filter', 'worklog.TimeLine'],
//
//    rootView: 'df-worklog-root',
//    api: {
//        preload: worklogController.preload
//    },
//
//    refs: [{
//            selector: 'df-worklog-filter',
//            ref: 'filter'
//        },{
//            selector: 'df-worklog-timeline',
//            ref: 'timeline'
//        }],
//
//    init: function() {
//        this.on('storesloaded', function() {
//            this.getFilter().load({
//                success: this.filterLoadHandler,
//                scope: this
//            });
//        }, this);
//
//        this.control({
//            'button[action=applyFilters]': {
//                click: function() {
//                    this.getFilter().submit({
//                        success: this.filterSubmitHandler,
//                        scope: this
//                    });
//                }
//            }
//        })
//
//        this.callParent(arguments);
//    },
//
//    beforeLoad: function(callback, resolver, args) {
//        this.getApi().preload(this.getProjectId(args[1]), function(res) {
//            if(res) {
//                callback.apply(resolver, args);
//            }
//        });
//    },
//
//    getProjectId: function(o) {
//        return (!Ext.isEmpty(o)) ? o['project']: null;
//    },
//
//    getRootViewInstance: function() {
//        return this.callParent(arguments);
//    },
//
//    filterLoadHandler: function() {},
//
//    filterSubmitHandler: function() {
//        this.getWorklogTimeLineStore().load();
//    }
//});