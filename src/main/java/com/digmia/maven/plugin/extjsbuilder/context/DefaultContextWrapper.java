package com.digmia.maven.plugin.extjsbuilder.context;

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
    public void initialize(ContextBasedExtractor ext) {
        if(!isInitialized) {
            context = Context.enter();
            scope = context.initStandardObjects();
            if(ext != null) ext.visitWrapper(this);
            isInitialized = true;
        }
    }
    
    
    @Override
    public void initialize() {
        initialize((ContextBasedExtractor) null);
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
