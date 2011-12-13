/**
 * Root
 * The root controller. Handles viewport state changes - popups, main panel state changes, etc.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

//pre-init libs which are referenced as singleton classes in 


Ext.define('DanteFrontend.controller.Root', {
    extend: 'DanteFrontend.lib.Controller',

    views: [
        'Root',
        'main.Panel',
        'main.Footer',
        'main.Toolbar'
    ]
});