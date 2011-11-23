package com.digmia.maven.plugin.extjsbuilder;

import java.io.File;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.io.FileUtils;

/**
 *
 * @author fk
 */
public class DependencyParser {
    
    private Global global;
    
    //private Map<String, JsClass> unorderedClassMap = new HashMap<String, JsClass>();
    private DefaultJsClassParser classParser;
    
    
    public static class JsClassTree {
        
        private JsClass root;

        public JsClassTree(JsClass root) {
            this.root = root;
        }
    }   
        
    public DependencyParser(Global global) {
        this.global = global;
        classParser = new DefaultJsClassParser(this.global);
    }
    
    public Map<String, JsClass> collectDependencies() {
        return populateUnorderedClassMap(collectFiles());
    }
    
    
    private Collection<File> collectFiles() {
        return FileUtils.listFiles(global.getAppDirectory(), new String[] {"js"}, true);
    }
    
    private Map<String, JsClass> populateUnorderedClassMap(Collection<File> files) {
        
        Map<String, JsClass> out = new HashMap<String, JsClass>();
        
        try {
            for(File f: files) {
                JsClass jsClass = classParser.parse(f);
                out.put(jsClass.getClassName(), jsClass);
            } 
        } finally {
            global.getContextWrapper().destroy();
        }
        return out;
    }

}
