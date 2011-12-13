package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.extract.DefaultRegexBasedExtractor.ExtractionError;
import java.io.File;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.apache.commons.io.FileUtils;

/**
 * @author fk
 */
public class DependencyCollector {
    
    private Global global;
    private DefaultJsClassParser classParser;
        
    private static class OrderingSession {
        private Map<String, JsClass> unorderedMap;
        private JsClass root;
        private Collection<JsClass> bootstrapClasses;
        private Map<String, JsClass> orderedMap = new LinkedHashMap<String, JsClass>();
        
        public OrderingSession(JsClass root, Map<String, JsClass> unorderedMap) {
            this.root = root; this.unorderedMap = unorderedMap;
        }
                
        public List<JsClass> getOrderedClassList() {
            List<JsClass> orderedList = new LinkedList<JsClass>();
            if(orderedMap.isEmpty()) { 
                orderedMap.put(root.getClassName(), root);
                traverse(root, new LinkedList<String>()); 
            }
            //the root dep should be last, again, remove and add
            orderedMap.remove(root.getClassName());
            
            orderedList.addAll(orderedMap.values());
            if(bootstrapClasses != null) orderedList.addAll(bootstrapClasses);            
            Collections.reverse(orderedList);
            orderedList.add(root);
            return orderedList;            
        }
        
        private void traverse(JsClass currentClass, List<String> parentVector) {
            String currentClassName = currentClass.getClassName();
            
            //if the vector of parent class names already contains this class name
            //it effectively means there is a circular dependency somewhere along the chain
            //a file cannot depend on itself, throw an assertion error
            assert !parentVector.contains(currentClassName): "Circular dependency, exiting.";                
            parentVector.add(currentClassName);
            
            //if this dependency exists in the map, it means it was already required by a class up in the dependency chain
            //we need to push it lower in the chain
            
            //so we remove it if it exists (if it does not, nothing happens on removal
            orderedMap.remove(currentClassName);
            
            //and put it back again, which effectively pushed it forward
            orderedMap.put(currentClassName, currentClass);            
            
            for(String dependencyName: currentClass.getDependencies()) {
                JsClass dependency = unorderedMap.get(dependencyName);
                assert dependency instanceof JsClass: String.format("Dependency %s required by %s not found!", dependencyName, currentClassName);
                traverse(dependency, parentVector);
            }
            //remove the current class from parent vector after taking care of it's dependency chain
            parentVector.remove(currentClassName);
        }

        public OrderingSession setBootstrapClasses(Collection<JsClass> bootstrapClasses) {
            this.bootstrapClasses = bootstrapClasses;
            return this;
        }
    }
        
    public DependencyCollector(Global global) {
        this.global = global;
        classParser = new DefaultJsClassParser(this.global);
    }
    
    
    public List<JsClass> collectDependencies() {
        String appRootClassName = classParser.getClassNameFromFilePath(global.getAppRootFile());
        Map<String, JsClass> unorderedDependencyMap = createClassMap(collectFiles());
        JsClass rootClass = unorderedDependencyMap.get(appRootClassName);
        List<JsClass> orderedDependencyList = new OrderingSession(rootClass, unorderedDependencyMap)
            .setBootstrapClasses(
                createClassMap(global.getBootstrapFileList(), false).values())
            .getOrderedClassList();
        return orderedDependencyList;
    }

       
    private Collection<File> collectFiles() {
        return FileUtils.listFiles(global.getAppDirectory(), new String[] {"js"}, true);
    }
    
    private Map<String, JsClass> createClassMap(Collection<File> files) {
        return createClassMap(files, true);
    }

    private Map<String, JsClass> createClassMap(Collection<File> files, boolean parseDependencies) {
        
        Map<String, JsClass> out = new LinkedHashMap<String, JsClass>();
        
        try {
            for(File f: files) {
                JsClass jsClass = classParser.parse(f, parseDependencies);
                out.put(jsClass.getClassName(), jsClass);
            } 
        } catch(ExtractionError ex) {
            throw new RuntimeException(ex.getMessage(), ex);
        }
        return out;
    }

}
