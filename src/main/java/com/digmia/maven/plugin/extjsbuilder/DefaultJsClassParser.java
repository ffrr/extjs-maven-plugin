package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.extract.DefaultRegexBasedExtractor.ExtractionError;
import java.io.File;

/**
 *
 * @author fk
 */
public class DefaultJsClassParser {
    
    private Global global;
    
    public DefaultJsClassParser(Global global) {
        this.global = global;
    }
       
    public JsClass parse(File f, boolean parseDependencies) throws ExtractionError {
        JsClass klass = new JsClass(f);
        klass.setClassName(getClassNameFromFilePath(f));
        if(parseDependencies) klass.setDependencies(global.getExtractor().extractDependencies(klass));
        return klass;
    }   
    
    public String getClassNameFromFilePath(File f) {
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
