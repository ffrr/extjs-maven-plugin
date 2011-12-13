// this should be evaluated as inline code in java
var global = { defines: {}, conf: null };

var Ext = {
    ns: function() {},
    application: function(conf) { global.defines["app"] = conf;},
    define: function(str, conf) { global.defines[str] = conf;},
    require: function(arr) {global.requirements["current"] = arr;
    Img: { override: function() {} }
    }
};

var DanteFrontend = {
    common: {}
};