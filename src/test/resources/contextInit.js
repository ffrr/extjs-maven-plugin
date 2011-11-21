var global = {};
var Ext = {
    ns: function() {},
    application: function(conf) { global.conf = conf;},
    extend: function(str, conf) { global[str] = conf;}
};

var DanteFrontend = {
    common: {}
};