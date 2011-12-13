/**
 * ConfirmationGrid
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Nov 7, 2011
 */

Ext.define('DanteFrontend.view.budget.balanceitems.ConfirmationGrid', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-budget-confirmationgrid',
    
    getDefaultToolbarConfig: function() {
        return {
            buttonAlign: 'left',
            items: [{
                action: 'confirm',
                text: g('Add your confirmation'),
                scope: this,
                iconCls: 'icon-add'
            },{
                action: 'unconfirm',
                text: g('Remove your confirmation'),
                scope: this,
                iconCls: 'icon-remove'
            }]
        };
    },
    
    switchButtons: function(confRec) {
        var confirm = this.down('button[action=confirm]'),
            unconfirm = this.down('button[action=unconfirm]');        
        
        confirm.hide(); unconfirm.hide();
                
        if(confRec) {
            if(confRec.isConfirmable()) confirm.show();
            if(confRec.isRevokable()) unconfirm.show();
        }
        
    }  
});
