/**
 * Global functions
 * 
 * @author fk
 * @version 0.1
 * @date Jul 12, 2011
 */

var g = function(text) {
    return text;
}

var approot = function(str) {
    return '/dante_frontend_spring' + str;
}

var media = function(str) {
    return approot('/static' + str);
}

var res = function(str) {
    try {
        return eval("_resources." + str);
    } catch (e) {
        console.error('Cannot resolve identifier: ' + str);
    }
};

//console = console != undefined ? console :{
//    log: function() {},
//    info: function() {},
//    warn: function() {}
//};

//fixed some stuff
//other
