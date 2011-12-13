/**
 * CurrentProjects
 * Store supporting the current projects panel.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.store.CurrentProjects', {
   extend: 'Ext.data.Store',
   
   model: 'DanteFrontend.model.Project',
   proxy: {
       type: 'direct',
       api: {
           read: dashboardController.listCurrentProjects
       }
   },
   autoLoad: false
});