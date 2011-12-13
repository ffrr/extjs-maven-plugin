package com.digmia.maven.plugin.extjsbuilder;

import java.io.File;
import java.util.List;

/**
 *
 * @author fk
 */

public class JsClass {

    private String className;
    
    private List<String> dependencies;
    private File file;
    
    private Type classType;

    public static enum Type {
        VIEW, MODEL, CONTROLLER, STORE, LIB;
    };

    public JsClass(File file) {
        this.file = file;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public List<String> getDependencies() {
        return dependencies;
    }

    public void setDependencies(List<String> dependencies) {
        this.dependencies = dependencies;
    }

    public File getFile() {
        return file;
    }

    public Type getClassType() {
        return classType;
    }

    public void setClassType(Type classType) {
        this.classType = classType;
    }

    @Override
    public String toString() {
        return file.getPath();
    }
    
    
    
} 