/**
 * TestProxy
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 11, 2011
 */



Ext.define('DanteFrontend.test.FileProxy', {
    singleton: true,

    inst: function(fixtureName) {
        return Ext.create('Ext.data.proxy.Ajax', {
            url: '/dante_frontend_spring/static/js/app/test/fixtures/'+ fixtureName +'.json',
            reader: {
                type: 'json',
                root: 'result',
                successProperty: 'success'
            }
            //data: DanteFrontend.test.Fixtures[fixtureName]
        });
    }
});