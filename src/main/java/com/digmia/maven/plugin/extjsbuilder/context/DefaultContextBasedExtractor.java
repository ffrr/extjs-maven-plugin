package com.digmia.maven.plugin.extjsbuilder.context;

import com.digmia.maven.plugin.extjsbuilder.Global;
import com.digmia.maven.plugin.extjsbuilder.JsClass;
import com.digmia.maven.plugin.extjsbuilder.LegacyConvertor;
import com.digmia.maven.plugin.extjsbuilder.Node;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;
import org.mozilla.javascript.Scriptable;

/**
 *
 * @author fk
 */
public class DefaultContextBasedExtractor implements ContextBasedExtractor {

    private Global global = null;
    
    private static final List<TypeExtractionMapping> extractionMappings = new LinkedList<TypeExtractionMapping>() {{
        add(new TypeExtractionMapping(JsClass.Type.CONTROLLER, "controllers", "controller"));
        add(new TypeExtractionMapping(JsClass.Type.MODEL, "models", "model"));
        add(new TypeExtractionMapping(JsClass.Type.STORE, "stores", "store"));
        add(new TypeExtractionMapping(JsClass.Type.VIEW, "views", "view"));
    }};

    private static class TypeExtractionMapping {
        
        public final JsClass.Type type;
        public final String dependencyProperty;
        public final String folderName;
        
        TypeExtractionMapping(JsClass.Type type, String dependencyProperty, String folderName) {
            this.type = type; this.dependencyProperty = dependencyProperty; this.folderName = folderName;
        }
    }
    public static class ExtractionError extends RuntimeException {
        public ExtractionError(String msg) { super(msg); }
        public ExtractionError(String msg, Throwable ex) { super(msg, ex); }
    }

        
    @Override
    public void visitWrapper(ContextWrapper cw) {
        cw.getContext().evaluateString(cw.getScope(), getContextInitializationString(), "<default init>", 1, null);
    }
    
    
    @Override
    public void visitGlobalInit(Global g) {
        g.getExternalPackagePrefixes().add("Ext");
    }
    
    
    @Override
    public List<String> extractDependencies(JsClass klass, Global g) {
        // a little ugly, but it's not 
        global = g;
        
        Node root = Node.in(global.getContextWrapper().getScope(), 
                global.getContextWrapper().getContext(), true)
                .name("root");
        try {
            Scriptable config = root.path("configs").name(klass.getClassName()).get();
            if(!(config instanceof NativeObject)) throw new ExtractionError("Class file contains no config");
            
            Map<String, Object> configMap = LegacyConvertor.nativeObjectToMap((NativeObject) config);
            
            return getDependencyListFromConfig(configMap);
            
        } catch (Node.NoSuchNodeExists ex) {
            throw new ExtractionError(ex.getMessage(), ex);
        }
    }
    
    private List<String> getDependencyListFromConfig(Map<String, Object> config) {
        List<String> acc = new ArrayList<String>();

        accumulateDependencyClasses("extend", null, config, acc);
        accumulateDependencyClasses("requires", null, config, acc);
        
        for(TypeExtractionMapping em: extractionMappings) {
            accumulateDependencyClasses(em.dependencyProperty, em, config, acc);
        }
        
        
        
        return acc;
    }
    

    private void accumulateDependencyClasses(String configKey, TypeExtractionMapping tem, Map<String, Object> config, List<String> acc) {
        Object require = config.get(configKey);
        if(require != null) {
            if (require instanceof NativeArray) {
                List<String> rawPaths = LegacyConvertor.nativeArrayToStringList((NativeArray) require);
                for(String rawPath: rawPaths) {
                    acc.add(processClassPath(rawPath, tem));
                }
                
            }
            
            if(require instanceof String) {
                acc.add(processClassPath((String) require, tem));
            }
        }
    }
    
    private String processClassPath(String path, TypeExtractionMapping tem) {
        if (tem != null) {
            // if this has a mapping, add the mapping prefix
            return tem.folderName + "." + path;
        } else {
            // if not, just delete the global app prefix
            return path.replace(global.getAppPrefix(), "");
        }
        
        
    }

    private String getContextInitializationString() {
        return 
            "var root = { configs: {} };\n" +
            "var Ext = {\n" +
                "application: function(conf) { root.configs[\"app\"] = conf;},\n" +
                "define: function(str, conf) { root.configs[str] = conf;}, \n" +
                "require: function(arr) { root.currentReq = arr;}\n" +
            "};\n";
    }    
}
