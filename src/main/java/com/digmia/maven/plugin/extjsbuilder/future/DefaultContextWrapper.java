package com.digmia.maven.plugin.extjsbuilder.future;

import com.digmia.maven.plugin.extjsbuilder.extract.Extractor;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * Default context initializer.
 * @author fk
 */
public class DefaultContextWrapper implements ContextWrapper {
    
    private Context context;
    private Scriptable scope;
    private Boolean isInitialized = false;
    
    
    @Override
    public void initialize(Extractor ext) {
        if(!isInitialized) {
            context = Context.enter();
            scope = context.initStandardObjects();
            isInitialized = true;
        }
    }   
    
    @Override
    public void initialize() {
        initialize((Extractor) null);
    }    
    
    @Override
    public Scriptable getScope() {
        return scope;
    }

    @Override
    public Context getContext() {
        return context;
    }
    
    @Override
    public void destroy() {
        Context.exit();
    }

    @Override
    public Boolean isInitialized() {
        return isInitialized;
    }

       
}
