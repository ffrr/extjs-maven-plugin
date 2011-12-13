package com.digmia.maven.plugin.extjsbuilder.future;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.NativeObject;

/**
 * A simple helper class to convert native datatypes to java types.
 * (Since in older versions of Rhino native datatypes need conversion).
 * @author fk
 */
public class LegacyConvertor {
    
    public static List<String> nativeArrayToStringList(NativeArray input) {
        
        ArrayList<String> output = new ArrayList<String>();
        for (Object o : input.getIds()) {
            Integer idx = (Integer) o;
            output.add(input.get(idx, null).toString());
        }
        return output;
    }
    
    public static Map<String, Object> nativeObjectToMap(NativeObject input) {
        Map<String, Object> output = new HashMap<String, Object>();
        
        for(Object o: input.getIds()) {
            String key = (String) o;
            output.put(key, input.get(key, null));
        }
        
        return output;
    }
    
//    
//    
//    public static Scriptable getNodePath(List<String> nodes, Scriptable scope) {
//        Object current = scope.get(nodes.get(0), scope);
//        if(nodes.size() > 1 && current instanceof Scriptable) {
//            return getNodePath(nodes.subList(1, nodes.size()), (Scriptable) current);
//        }
//        
//        if(current instanceof Scriptable) { return (Scriptable) current; }
//        return null;
//    }    
//    
//    public static Scriptable getNodePath(String path, Scriptable scope) {
//        Scriptable value = getNodePath(Arrays.asList(path.split("\\.")), scope);
//        if(value != null) return value;
//        
//        throw new NoSuchNodeExists(path);
//    }
}
