/**
 * TimeLine
 * Store for the timeline grid.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

Ext.define('DanteFrontend.store.worklog.TimeLine', {
    extend: 'Ext.data.Store',

    model: 'DanteFrontend.model.TimeLine',
    proxy: {
        type: 'direct',
        api: {
           read: worklogController.listTimeLine
        }
    },

    remoteFilter: true,
    groupField: 'projectName',
    sortInfo: {
        field:      'projectName',
        direction:  'ASC'
    },
    autoload:   false
});