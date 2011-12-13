package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.extract.Extractor;
import com.digmia.maven.plugin.extjsbuilder.extract.DefaultRegexBasedExtractor;
import java.io.File;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/**
 *
 * @author fk
 */
public class Global {
    
    private static final String defaultOutputFileName = "app-build";
    
    private File appDirectory;
    private File appRootFile;
    private File outputDirectory;
    private File outputFile;
    
    
    private String appPrefix;
    private Extractor extractor;
    private List<String> externalPackagePrefixes;
    private List<File> bootstrapFileList; 
    
    public static class GlobalBuilder {
        private Extractor extractor;
        private File outputDirectory;
        private String outputFileName;
        private File outputFile;
        private File appDirectory;
        private File appRootFile;
        private String appPrefix;
        private List<String> externalPackagePrefixes = new LinkedList<String>(); 
        private List<File> bootstrapFileList = new LinkedList<File>(); 
        
        private GlobalBuilder() {};
               
        public Global build() {
            //building constraints here
            assert appRootFile != null && appRootFile.canRead() : "Application root file is undefined or unreadable";
            assert appPrefix != null: "Application prefix cannot be null";
            assert outputDirectory != null && outputDirectory.isDirectory() 
                    && outputDirectory.canWrite() : "Output directory cannot be found or is not writable.";
            
            initAppDirectory();
            
            assert appDirectory!= null && appDirectory.isDirectory() 
                    && appDirectory.canRead() : "JS application root directory cannot be found or is unreadable.";
            
            
            checkBootstrapFileList();
            
            initOutputFile();
            
            
            Global global = new Global(this);
            return global;
            
        }

        public GlobalBuilder setAppDirectory(File directory) {
            appDirectory = directory;
            return this;
        }
        
        public GlobalBuilder setAppPrefix(String prefix) {
            appPrefix = prefix.replace(".", "");
            return this;
        }   
        
        public GlobalBuilder setExtractor(Extractor extractor) {
            this.extractor = extractor;
            return this;
        }

        public GlobalBuilder setAppRootFile(File appRootFile) {
            this.appRootFile = appRootFile;
            return this;
        }
        
        public GlobalBuilder setOutputDirectory(File outputDirectory) {
            this.outputDirectory = outputDirectory;
            return this;
        }
        
        public GlobalBuilder setDependencyBootstrapFiles(Collection<File> list) {
            if(list != null) this.bootstrapFileList = new LinkedList<File>(list);
            return this;
        }
        
        public GlobalBuilder setOutputFileName(String outputFileName) {
            if(outputFileName != null) this.outputFileName = outputFileName;
            return this;
        }

        public GlobalBuilder setExternalPackagePrefixes(List<String> externalPackagePrefixes) {
            if(externalPackagePrefixes != null) this.externalPackagePrefixes = new LinkedList<String>(externalPackagePrefixes);
            return this;
        }
        
        
        private void checkBootstrapFileList() {
            if(!bootstrapFileList.isEmpty()) {
                for(File f: bootstrapFileList) {
                    assert f != null && f.canRead() && f.isFile() : 
                        String.format("The supplied bootstrap file '%s' cannot be found or is unreadable.", f.getAbsolutePath());
                }
            }
        }
        
        private void initOutputFile() {
            if(outputFileName == null) outputFileName = Global.defaultOutputFileName;
            if(!outputFileName.contains(".js")) outputFileName += ".js"; 
            
            outputFile = new File(outputDirectory.getPath() + File.separator + outputFileName);
        }
        
        private void initAppDirectory() {
            if(appDirectory == null) appDirectory = appRootFile.getParentFile();
        }
        
    }
    
    public static GlobalBuilder init() {
        return new GlobalBuilder();
    }
    
    private Global(GlobalBuilder gb) {
        
        appDirectory = gb.appDirectory;
        appPrefix = gb.appPrefix;
        appRootFile = gb.appRootFile;
        outputDirectory = gb.outputDirectory;
        outputFile = gb.outputFile;
        
        extractor = gb.extractor;
        externalPackagePrefixes = gb.externalPackagePrefixes;
        
        bootstrapFileList = gb.bootstrapFileList;

        //init
        if(extractor == null) extractor = new DefaultRegexBasedExtractor(this);
        externalPackagePrefixes.add("Ext");
    }

    public File getAppDirectory() {
        return appDirectory;
    }

    public String getAppPrefix() {
        return appPrefix;
    }

    public Extractor getExtractor() {
        return extractor;
    }

    public List<String> getExternalPackagePrefixes() {
        return externalPackagePrefixes;
    }

    public File getAppRootFile() {
        return appRootFile;
    }

    public List<File> getBootstrapFileList() {
        return bootstrapFileList;
    }

    public File getOutputDirectory() {
        return outputDirectory;
    }

    public File getOutputFile() {
        return outputFile;
    }
}
