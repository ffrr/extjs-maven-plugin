/**
 * Router
 * Basic routing
 * 
 * @author fk
 * @version 0.1
 * @date Jun 28, 2011
 */

Ext.define('DanteFrontend.lib.Router', {
    extend: 'Ext.util.Observable',

    config: {
        registeredRoutes: [],
        resolverCache: Ext.create('Ext.util.MixedCollection')
    },

    constructor: function(cfg) {
        this.initConfig(cfg);
        this.callParent(arguments);
    },

    registerRoutes: function(arr, ref) {
        Ext.each(arr, function(r) {
           r.resolver = this.getResolver(r.resolver, ref);
        }, this);
        this.setRegisteredRoutes(Ext.Array.merge(this.getRegisteredRoutes(), arr));
    },

    route: function(url) {
        var cmd = Ext.create('DanteFrontend.lib.Command', {
            token: url,
            execute: Ext.bind(this.resolve, this, arguments)
        });

        DanteFrontend.lib.CommandBus.add(cmd);
    },

    resolve: function(url) {
        var r = this.getMatchingRoute(url);
        if(!Ext.isEmpty(r)) {
            r.resolver.resolve(r.path, url, Ext.isEmpty(r.target) ? null:r.target);
        } else {
            console.error('This url cannot be resolved: ' + url);
        }
    },

    getMatchingRoute: function(url) {
        var ret = null;
        Ext.each(this.getRegisteredRoutes(), function(r) {
            if(r.path.test(url)) {
                ret = r;
                return false;
            }
            return true;
        });
        return ret;
    },

    getResolver: function(className, ref) {
        className = 'DanteFrontend.lib.resolver.' + className;
        var instance = this.getResolverCache().get(className);
        if(Ext.isEmpty(instance)) {
            instance = Ext.create(className, ref);
            this.getResolverCache().add(className, instance);
        }
        return instance;
    }
});