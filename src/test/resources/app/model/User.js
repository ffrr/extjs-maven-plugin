/**
 * User
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 30, 2011
 */

Ext.define('DanteFrontend.model.User', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id'
    },{
        name: 'login'
    },{
        name: 'name'
    },{
        name: 'password'
    }]
});
