/**
 * JsonWriter
 * Custom jsonwriter implementation.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 30, 2011
 */


Ext.define('DanteFrontend.lib.base.JsonWriter', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.df-writer-json',

    constructor: function(config) {
        this.callParent(arguments);
    },

    getRecordData: function(record) {

        var remap = function(incoming, field, record, value) {
            name = field[this.nameProperty] || field.name;
            if(Ext.isEmpty(field['mapping'])) {
                data[name] = record.get(field.name);
            } else {
                DanteFrontend.lib.Util.createJsonFromString(field['mapping'], incoming, record.get(field.name));
            }
            return incoming;
        };
        
        var isPhantom = record.phantom === true,
            writeAll = this.writeAllFields || isPhantom,
            nameProperty = this.nameProperty,
            fields = record.fields,
            data = {},
            changes,
            name,
            field,
            key;
        
        if (writeAll) {
            fields.each(function(field){
                if (field.persist) {
                    //name = field[nameProperty] || field.name;
                    
                    //data[name] = record.get(field.name);
                    
                    data = remap(data, field, record);
                }
            });
        } else {
            // Only write the changes
            changes = record.getChanges();
            for (key in changes) {
                if (changes.hasOwnProperty(key)) {
                    field = fields.get(key);
                    name = field[nameProperty] || field.name;
                    data[name] = changes[key];
                    //data = remap(data, field, record, changes);
                }
            }
            if (!isPhantom) {
                // always include the id for non phantoms
                data[record.idProperty] = record.getId();
            }
        }
        return data;
    }
});
