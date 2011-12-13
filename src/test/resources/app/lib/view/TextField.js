/**
 * ClearableText
 * Custom textfield with clear button.
 *
 * @author fk
 * @version 0.1
 * @date Jul 27, 2011
 */


Ext.define('DanteFrontend.lib.view.TextField', {
    extend: "Ext.form.field.Trigger",
    alias:["widget.df-textfield"],

    initComponent: function() {
        var triggers = {
            triggerCls: Ext.baseCSSPrefix + "form-clear-trigger",
            onTriggerClick:function(){
                this.setValue(null);
            }
        };

        if(this.clearable) Ext.apply(this.initialConfig, triggers);
        Ext.apply(this, this.initialConfig);

        this.callParent(arguments);
    }
});