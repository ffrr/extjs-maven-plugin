/**
 * CurrentProjects
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */

//store: DanteFrontend.dashboard.CurrentProjectsStore,


Ext.define('DanteFrontend.controller.dashboard.CurrentProjects', {
    extend: 'Ext.app.Controller',
    requires: ['DanteFrontend.view.Renderers', 'DanteFrontend.view.dashboard.Renderers'],
    views: ['dashboard.CurrentProjects'],
    stores: ['dashboard.CurrentProjects'],
    models: ['Project']
});