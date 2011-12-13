/**
 * MainPanel
 * Main content panel controller.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

Ext.define('DanteFrontend.controller.main.Panel', {
    extend: 'Ext.app.Controller',

    views: ['main.Panel'],
    refs: [{ ref: 'content', selector: 'df-main-panel'}],

    loadController: function(controller) {
        console.log(controller.getContent());
        //this.getContent().add(controller.getContent());
    }
});