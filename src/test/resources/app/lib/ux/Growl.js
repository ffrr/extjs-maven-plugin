/**
 * Growl
 * Growl-like notification support for ExtJS.
 * Supports ExtJS4.x
 * 
 * @author fk
 * @author anon (tnx anyway ;)
 * @version 0.2
 * @date Jul 12, 2011
 */

Ext.namespace("DanteFrontend.lib.ux");

DanteFrontend.lib.ux.Growl = (function() {
    var _container,
        _closerTpl = '<div class="x-growl-msg-close"></div>',
        _basicTpl = '<div class="x-growl-msg">{0}</div>',
        _fullTpl = '<div class="x-growl-msg {2} {3}"><div class="x-growl-msg-title">{0}</div><div class="x-growl-msg-body">{1}</div></div>',

        _config = {
            alignment: "t-t",
            duration: 1500,
            context: document,
            offset: [0, 0],

            show: function(notification, options) {
                if (!options.pin) {
                    notification.fadeIn({duration: 500}).pause((options.duration || _config.duration)).fadeOut({duration: 1000, remove: true})
                } else {
                    notification.fadeIn({duration: 500});
                }
            },

            close: function(notification, evt, elt, options) {
                notification.fadeOut({remove: true});
            },

			click: Ext.emptyFn
        },

        _getContainer = function() {
            if (!_container) {
                _container = Ext.core.DomHelper.insertFirst(document.body, {id:'x-growl-ct'}, true);
            }

            return _container;
        };

    return {
        notify: function(options) {
            var closer,
                notification,
                container = _getContainer(),
                hasIcon = options.iconCls ? "x-growl-msg-has-icon" : "",
                hasTitle = options.title ? "x-growl-msg-has-title" : "",
                content = options.content ? Ext.String.format(_basicTpl, options.content) :
                                            Ext.String.format(_fullTpl, options.title || "", options.message || "", hasTitle + " " + hasIcon, options.iconCls || "");

            notification = Ext.core.DomHelper[(options.alignment || _config.alignment).indexOf("b") === -1 ? "append" : "insertFirst"](container, content, true);
            notification.on("click", function(evt, elt, op) {
				if (Ext.fly(elt).hasClass("x-growl-msg-close")) {
                	(options.close || _config.close)(notification, evt, elt, options);
				} else {
					(options.click || _config.click)(notification, evt, elt, options);
				}
            });

            if (options.closable !== false) {
                closer = Ext.core.DomHelper.append(notification, _closerTpl, true);

                notification.hover(closer.fadeIn, closer.fadeOut, closer);
            }

            container.alignTo((options.context || _config.context), (options.alignment || _config.alignment), (options.offset || _config.offset));

            (options.show || _config.show)(notification, options);
        },

        init: function(config) {
            Ext.apply(_config, config);
        }
    };
})();