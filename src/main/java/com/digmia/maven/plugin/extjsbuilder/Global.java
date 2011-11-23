package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.context.ContextBasedExtractor;
import com.digmia.maven.plugin.extjsbuilder.context.ContextWrapper;
import com.digmia.maven.plugin.extjsbuilder.context.DefaultContextBasedExtractor;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author fk
 */
public class Global {
    
    private ContextWrapper contextWrapper;
    private File appDirectory;
    private String appPrefix;
    private ContextBasedExtractor extractor;
    private List<String> externalPackagePrefixes;
    
    public static class GlobalBuilder {
        private ContextWrapper contextWrapper;
        private ContextBasedExtractor extractor;
        private File appDirectory;
        private String appPrefix;
        private List<String> externalPackagePrefixes = new ArrayList<String>(); 
        
        private GlobalBuilder() {};
               
        public Global build() {
            //building constraints here
            assert contextWrapper != null : "Context wrapper cannot be null";
            assert appDirectory!= null && appDirectory.isDirectory() && appDirectory.canRead() : "JS application root directory cannot be found or is unreadable.";
            assert appPrefix != null: "Application prefix cannot be null";
            
            init();
            
            Global global = new Global(this);
            return global;
            
        }

        public GlobalBuilder setContextWrapper(ContextWrapper contextWrapper) {
            this.contextWrapper = contextWrapper;
            return this;
        }
        
        public GlobalBuilder setAppDirectory(File directory) {
            appDirectory = directory;
            return this;
        }
        
        public GlobalBuilder setAppPrefix(String prefix) {
            appPrefix = prefix.replace(".", "");
            return this;
        }   
        
        public GlobalBuilder setExtractor(ContextBasedExtractor extractor) {
            this.extractor = extractor;
            return this;
        }           
        
        private void init() {
            if(extractor == null) extractor = new DefaultContextBasedExtractor();
            contextWrapper.initialize(extractor);
        }

    }
    
    public static GlobalBuilder init() {
        return new GlobalBuilder();
    }
    
    private Global(GlobalBuilder gb) {
        contextWrapper = gb.contextWrapper;
        appDirectory = gb.appDirectory;
        appPrefix = gb.appPrefix;
        extractor = gb.extractor;
        externalPackagePrefixes = gb.externalPackagePrefixes;
        
        extractor.visitGlobalInit(this);
    }

    public File getAppDirectory() {
        return appDirectory;
    }

    public String getAppPrefix() {
        return appPrefix;
    }

    public ContextWrapper getContextWrapper() {
        return contextWrapper;
    }
    
    public ContextBasedExtractor getExtractor() {
        return extractor;
    }

    public List<String> getExternalPackagePrefixes() {
        return externalPackagePrefixes;
    }
        
}
