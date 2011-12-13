/**
 * CurrentTasks
 * Store supporting the current tasks panel.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.store.dashboard.CurrentTasks', {
    extend: 'Ext.data.Store',

    model: 'DanteFrontend.model.Task',
    proxy: {
       type: 'direct',
       api: {
           read: dashboardController.listCurrentTasks
       }
    },
    groupField: 'userName',
    sorters: [{
            property : 'begin',
            direction: 'DESC'
    }],
    autoLoad:   false
});