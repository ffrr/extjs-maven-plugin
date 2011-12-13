/**
 * JsonReader
 * Custom jsonreader implementation.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 29, 2011
 */


Ext.define('DanteFrontend.lib.base.JsonReader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.df-reader-json',
    
    createAccessor : function(){
        var re = /[\[\.]/;
        return function(expr) {
            if(Ext.isEmpty(expr)){
                return Ext.emptyFn;
            }
            if(Ext.isFunction(expr)){
                return expr;
            }
            var i = String(expr).search(re);
            if(i >= 0){
                return function(obj) {
                    access = function(o, f) {
                        if(o) return o[f];
                        return null;
                    };

                    Ext.each(expr.split('.'), function(field) {
                        obj = access(obj, field);
                    });

                    return obj;
                }
                //return new Function('obj', 'return (obj != null) ? obj' + (i > 0 ? '.' : '') + expr +':null');
            }
            return function(obj){
                return obj[expr];
            };

        };
    }()
});
