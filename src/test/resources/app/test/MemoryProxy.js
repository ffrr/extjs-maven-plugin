/**
 * TestProxy
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 11, 2011
 */



Ext.define('DanteFrontend.test.MemoryProxy', {
    singleton: true,

    inst: function(fixtureName) {
        return Ext.create('Ext.data.proxy.Memory', {
            reader: {
                type: 'json',
                root: 'result'
            },
            data: DanteFrontend.test.Fixtures[fixtureName]
        });
    }
});