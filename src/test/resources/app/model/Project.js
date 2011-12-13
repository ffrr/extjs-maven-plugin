/**
 * Project model
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.model.Project', {
    extend: 'Ext.data.Model',

    //TODO: push the other fields to ProjectStats model, probably?
    fields: ['id', 'name', 'timePlanned', 'timeSpent', 'timeSpentGraph']
});