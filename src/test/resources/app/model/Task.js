/**
 * Task
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.model.Task', {
    extend: 'Ext.data.Model',

    fields: ['id', 'description',
        {name: 'begin', type: 'date'},
        {name: 'end', type: 'date'},
        'duration', 'ticket', 'projectName', 'userName']
});