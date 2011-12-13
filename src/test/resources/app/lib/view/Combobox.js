/**
 * Combo
 * Custom combobox.
 *
 * @author fk
 * @version 0.1
 * @date Jul 27, 2011
 */


Ext.define('DanteFrontend.lib.view.Combobox', {
    extend: "Ext.form.field.ComboBox",
    alias:["widget.df-combo"],
    
    initComponent: function() {
        var triggers = {
            trigger1Cls: Ext.baseCSSPrefix + "form-clear-trigger",
            trigger2Cls: Ext.baseCSSPrefix + "form-arrow-trigger"
        };
        
        this.addEvents('clear');
        if(this.clearable) Ext.apply(this.initialConfig, triggers);
        Ext.apply(this, this.initialConfig);

        this.callParent(arguments);
    },

    onTrigger2Click:function(){
        var me = this;
        if(!me.readOnly&&!me.disabled){
            if(me.isExpanded){me.collapse();}
            else{
                me.onFocus({});
                if(me.triggerAction==="all"){me.doQuery(me.allQuery,true);}
                else{me.doQuery(me.getRawValue());}
            }
            me.inputEl.focus();
        }
    },
    
    onTrigger1Click:function(){
    	var me=this;
    	me.clearValue();
        this.fireEvent('clear', this);
    }
});