/**
 * Util
 * Utilities under a singleton class.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

Ext.define('DanteFrontend.lib.Util', {
    singleton: true,


    cache: function(obj) {
        console.log(arguments.caller);
    },

    location: function(url) {
        return function() {
            window.location = url;
        }
    },

    exportLocation: function(gridName, format) {
        return DanteFrontend.lib.Util.location(approot('/' + gridName + '/report/' + format));
    },

    createJsonFromString: function(str, root, value) {
        var namespace = str.split(".");
        if(namespace.length == 1) {
            root[namespace[0]] = value;
            return;
        }

        var current = root[namespace[0]] = root[namespace[0]] || {};

        Ext.each(namespace.slice(1), function(nested, i){
            if(i > 1) {
                current = current[nested] = current[nested] || {};
            }
            else {
                current[nested] = value;
            }
        });
    },

    first: function(arr) {
        if(!Ext.isEmpty(arr)) {
            return arr[0];
        }
        return false;
    }

    //verify: function()

});