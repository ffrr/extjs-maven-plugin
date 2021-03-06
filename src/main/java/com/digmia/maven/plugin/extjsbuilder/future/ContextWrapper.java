/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.digmia.maven.plugin.extjsbuilder.future;

import com.digmia.maven.plugin.extjsbuilder.extract.Extractor;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * @author fk
 */
public interface ContextWrapper {
    
    void initialize(Extractor civ);
    void initialize();
    
    void destroy();
    Scriptable getScope();
    Context getContext();
    
    Boolean isInitialized();
}
