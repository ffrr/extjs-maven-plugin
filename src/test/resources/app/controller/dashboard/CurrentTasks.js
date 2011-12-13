/**
 * CurrentTasks
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */


Ext.define('DanteFrontend.controller.dashboard.CurrentTasks', {
    extend: 'Ext.app.Controller',
    requires: ['DanteFrontend.view.Renderers', 'DanteFrontend.view.dashboard.Renderers'],
    views: ['dashboard.CurrentTasks'],
    stores: ['dashboard.CurrentTasks'],
    models: ['Task']
});