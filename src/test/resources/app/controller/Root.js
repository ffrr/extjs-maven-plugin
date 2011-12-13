/**
 * Root
 * The root controller. Handles viewport state changes - popups, main panel state changes, etc.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

//pre-init libs which are referenced as singleton classes in 
Ext.require([
    'DanteFrontend.view.Renderers',  'DanteFrontend.lib.Util'
]);

Ext.define('DanteFrontend.controller.Root', {
    extend: 'Ext.app.Controller',

    views: [
        'Root',
        'main.Panel',
        'main.Footer',
        'main.Toolbar'
    ],

    refs: [{
        ref: 'content', selector: 'df-main-panel'
    }],

    init: function() {
        //xpath-like comma-separation does not work with component queries (yet?)
        this.control({
            'df-main-toolbar button': {
                click: this.clickHandler
            },
            'df-main-toolbar menuitem': { 
                click: this.clickHandler
            }
        });

    },

    clickHandler: function(invoker) {
        if(Ext.isDefined(invoker.action)) {
            if(this.application.router)
            this.application.router.route(invoker.action, invoker.text);
        }
    }
});