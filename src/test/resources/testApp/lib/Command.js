/**
 * Command
 * Command pattern implementation.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */


Ext.define('DanteFrontend.lib.Command', {
    config: {
        token: ''
    },
   
    constructor: function(config) {
        Ext.apply(this, config);
    },

    execute: Ext.emptyFn
});