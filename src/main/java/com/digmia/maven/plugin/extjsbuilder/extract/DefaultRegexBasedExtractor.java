package com.digmia.maven.plugin.extjsbuilder.extract;

import com.digmia.maven.plugin.extjsbuilder.Global;
import com.digmia.maven.plugin.extjsbuilder.JsClass;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.io.FileUtils;

/**
 *
 * @author fk
 */
public class DefaultRegexBasedExtractor implements Extractor {

    private Global global;
    
    private static final Pattern PATTERN_ARRAY = Pattern.compile("((requires|extend|controllers|views|models|stores)\\s*:\\s*\\[([A-Za-z0-9_.',\\s\\/]*?)\\]\\s*)", Pattern.DOTALL);
    private static final Pattern PATTERN_STRING = Pattern.compile("((requires|extend|controllers|views|models|stores)\\s*:\\s*([A-Za-z0-9_.']+)\\s*)", Pattern.DOTALL);
    
    private static final Pattern PATTERN_BLOCKCOMMENTS = Pattern.compile("/\\*.*?\\*/", Pattern.DOTALL);
    private static final Pattern PATTERN_LINECOMMENTS = Pattern.compile("//.*", Pattern.MULTILINE);
    
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
    public static class ExtractionError extends Exception {
        public ExtractionError(String msg) { super(msg); }
        public ExtractionError(String msg, Throwable ex) { super(msg, ex); }
    }
    
    public DefaultRegexBasedExtractor(Global global) {
        this.global = global;     
    }

                
    @Override
    public List<String> extractDependencies(JsClass klass) throws ExtractionError {        
        try {
            String contents = FileUtils.readFileToString(klass.getFile());
            contents = clean(contents);
            return runMatchers(contents);
        } catch (IOException ex) {
            throw new ExtractionError(ex.getMessage(), ex);
        }
    }
    
    private String clean(String contents) {
        return PATTERN_LINECOMMENTS.matcher(
            PATTERN_BLOCKCOMMENTS.matcher(contents).replaceAll("")
        ).replaceAll("");                
    }
    
    private List<String> runMatchers(String contents) {

        Map<JsClass.Type, List<String>> acc = createAcc();
        List<String> out = new LinkedList<String>();
        
        Matcher arrayMatcher = PATTERN_ARRAY.matcher(contents);
        collectDependenciesFromArrayMatcher(arrayMatcher, acc);
        
        Matcher stringMatcher = PATTERN_STRING.matcher(contents);
        collectDependenciesFromStringMatcher(stringMatcher, acc);        
        
        for(List<String>list: acc.values()) {
            Collections.reverse(list);
            out.addAll(list);
        }
        
        return out;
    }
    
    
    private Map<JsClass.Type, List<String>> createAcc() {
        
        Map<JsClass.Type, List<String>> acc = new LinkedHashMap<JsClass.Type, List<String>>();
        
        
        //in reversed order - first load required libs, the controllers, then etc. etc.
        acc.put(JsClass.Type.VIEW, new LinkedList<String>());
        acc.put(JsClass.Type.STORE, new LinkedList<String>());
        acc.put(JsClass.Type.MODEL, new LinkedList<String>());
        acc.put(JsClass.Type.CONTROLLER, new LinkedList<String>());
        acc.put(JsClass.Type.LIB, new LinkedList<String>()); 
        
        return acc;
    }    
    
    private void collectDependenciesFromStringMatcher(Matcher m, Map<JsClass.Type, List<String>> acc) {
        while(m.find()) {
            String key = m.group(2);
            String rawValue = m.group(3);
            TypeExtractionMapping tem = findTypeExtractionMapping(key);
            String path = processClassPath(rawValue, tem);
            if(!isExcluded(path) && !path.isEmpty()) acc.get(tem.type).add(path);
        }
    }
    
    private void collectDependenciesFromArrayMatcher(Matcher m,  Map<JsClass.Type, List<String>> acc) {
        while(m.find()) {
            String key = m.group(2);
            String values = m.group(3);
            for(String rawValue: values.split(",")) {
                TypeExtractionMapping tem = findTypeExtractionMapping(key);
                String path = processClassPath(rawValue, tem);
                if(!isExcluded(path) && !path.isEmpty()) acc.get(tem.type).add(path);
            }
        }
    }    
    
    private TypeExtractionMapping findTypeExtractionMapping(String key) {
        for(TypeExtractionMapping tem: extractionMappings) {
            if(tem.dependencyProperty.equals(key)) return tem;
        }
        
        return new TypeExtractionMapping(JsClass.Type.LIB, "", "lib");
    }

    
    private String processClassPath(String rawPath, TypeExtractionMapping tem) {
        String path = rawPath.replace("'", "").replace("\"", "").trim();
        if (tem.type != JsClass.Type.LIB) {
            // if this has a mapping, add the mapping prefix
            return tem.folderName + "." + path;
        } else {
            // if not, just delete the global app prefix
            return path.replace(global.getAppPrefix() + ".", "");
        }
           
    }
    
    private Boolean isExcluded(String path) {
        for(String prefix: global.getExternalPackagePrefixes()) {
            if(path.startsWith(prefix)) return true;
        }
        return false;
    }
    
}
