/**
 * Project
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */

Ext.define('DanteFrontend.store.Projects', {
    extend: 'Ext.data.Store',

    model: 'DanteFrontend.model.Project',
    proxy: {
        type: 'direct',
        api: {
            read: userController.listProjectsByLoggedUser
        }
    },
    autoLoad: false
});