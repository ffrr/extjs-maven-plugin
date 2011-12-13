/**
 * TimeLine
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.model.TimeLine', {
    extend: 'Ext.data.Model',

    fields: [
        'id',
        'userName',
        'projectName',
        'customerName',
        'description',
          { name: 'begin',
            type: 'date',
            dateFormat: DanteFrontend.common.jsonDateFormat,
            sortType: Ext.data.SortTypes.asDate
          },{
            name: 'end',
            type: 'date',
            dateFormat: DanteFrontend.common.jsonDateFormat,
            sortType: Ext.data.SortTypes.asDate
          },
         'duration',
         'hidden'
    ]
});
