/**
 * preboot
 * 
 * @author fk
 * @version 0.1
 * @date Jul 25, 2011
 */


Ext.Loader.setConfig({
    enabled: true
});

Ext.BLANK_IMAGE_URL = media('/img/s.gif');
Ext.app.REMOTING_API.enableBuffer = 100;
Ext.Direct.addProvider(Ext.app.REMOTING_API);

//differentiate between prod and dev-test
Ext.Direct.on('exception', function(ex) {
    DanteFrontend.lib.Notify.base.error(g("Remote error"), ex.message);
});

Ext.Ajax.defaultHeaders = {
  'X-Supplied-Token': csrfTkn
};

Ext.Ajax.on('requestexception', function(conn, response) {
    DanteFrontend.lib.Notify.base.error(g('XmlHttpRequest error'), 
    'Status ' + response.status + ': ' + response.statusText);
});

Ext.Date.patterns = {
    MonthFilter: 'j/n/Y',
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    SK: "d. m. Y"
};

Ext.tip.QuickTipManager.init();

//overrides