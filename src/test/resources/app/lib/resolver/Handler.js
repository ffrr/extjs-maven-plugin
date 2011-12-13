/**
 * Handler
 * Resolves actions to handlers, ie. just runs the associated handler.
 * 
 * @author fk
 * @version 0.1
 * @date Jul 6, 2011
 */

Ext.define('DanteFrontend.lib.resolver.Handler', {
    extend: 'DanteFrontend.lib.resolver.Resolver',

    resolve: function(regex, url) {
        var parsedUrl = this.parseUrl(regex, url);
        this.app.getHandler(parsedUrl.token).apply(this.app);
    }
});
