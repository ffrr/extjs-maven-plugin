package com.digmia.maven.plugin.extjsbuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.Scriptable;

/**
 *
 * @author fk
 */
public class ParsingUtils {
    
    public static class NoSuchNodeExists extends RuntimeException {
        NoSuchNodeExists(String msg) { super(msg); }
    };
    
    public static List<String> nativeArrayToStringList(NativeArray input) {
        
        ArrayList<String> output = new ArrayList<String>();
        for (Object o : input.getIds()) {
            Integer idx = (Integer) o;
            output.add(input.get(idx, null).toString());
        }
        return output;
    }
    
    
    public static Scriptable getNodePath(List<String> nodes, Scriptable scope, Context ctx) {
        Object current = scope.get(nodes.get(0), scope);
        if(nodes.size() > 1 && current instanceof Scriptable) {
            return getNodePath(nodes.subList(1, nodes.size()), (Scriptable) current, ctx);
        }
        
        if(current instanceof Scriptable) { return (Scriptable) current; }
        return null;
    }    
    
    public static Scriptable getNodePath(String path, Scriptable scope, Context ctx) {
        Scriptable value = getNodePath(Arrays.asList(path.split("\\.")), scope, ctx);
        if(value != null) return value;
        
        throw new NoSuchNodeExists(path);
    }
}
