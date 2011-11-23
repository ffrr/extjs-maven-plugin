package com.digmia.maven.plugin.extjsbuilder.context;

import com.digmia.maven.plugin.extjsbuilder.Global;
import com.digmia.maven.plugin.extjsbuilder.Global.GlobalBuilder;
import com.digmia.maven.plugin.extjsbuilder.JsClass;
import java.util.List;

/**
 *
 * @author fk
 */
public interface ContextBasedExtractor {
    public void visitWrapper(ContextWrapper cw);
    public void visitGlobalInit(Global g);
    public List<String> extractDependencies(JsClass klass, Global global);
}
