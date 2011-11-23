package com.digmia.maven.plugin.extjsbuilder;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

/**
 *
 * @author fk
 */
public class DefaultJsClassParser {
    
    private Global global;
    
    public DefaultJsClassParser(Global global) {
        this.global = global;
    }
    
    public JsClass parse(File file) {
        return getJsClassFromFile(file);
    }
    
    private JsClass getJsClassFromFile(File f) {
        JsClass klass = new JsClass(f);
        try {
            String contents = FileUtils.readFileToString(f);
            global.getContextWrapper().getContext().evaluateString(global.getContextWrapper().getScope(), contents, "<" + f.getName() + ">", 1, null);
            klass.setClassName(getClassNameFromFilePath(f));
            klass.setDependencies(global.getExtractor().extractDependencies(klass, global));
        } catch (IOException ex) {
        }
        return klass;
    }   
    
    private String getClassNameFromFilePath(File f) {
        String path = f.getAbsolutePath()
            //remove extension
            .substring(0, f.getAbsolutePath().lastIndexOf(".")) 
            //remove app dir absolute path portion
            .replace(global.getAppDirectory().getAbsolutePath() + "/", "") 
            //convert to dot notation
            .replace(File.separator, "."); 
                
        return path;
    }
}
