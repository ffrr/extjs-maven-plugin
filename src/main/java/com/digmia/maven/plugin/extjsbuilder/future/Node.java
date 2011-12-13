package com.digmia.maven.plugin.extjsbuilder.future;

import java.util.Arrays;
import java.util.List;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * Simple API for Scriptable traversal.
 * Ex: Node.in(scope, context).path("global.someproperty").get("SomeComplex.Prop")
 * @author fk
 */

public class Node {
    
    private Scriptable root;
    private Context context;
    private Boolean strict;

    public static class NoSuchNodeExists extends RuntimeException {
        NoSuchNodeExists(String msg) { super(msg); }
    };    
    
    private Node(Scriptable root, Context context, Boolean strict) {
        this.root = root; this.context = context; this.strict = strict != null ? strict:false;
    }

    public static Node in(Scriptable root, Context context) {
        return new Node(root, context, false);
    };
    
    public static Node in(Scriptable root, Context context, Boolean strict) {
        return new Node(root, context, strict);
    };    

    /**
     * Splits the path by dots and tries to recursively find the node value.
     * 
     * @param path
     * @return 
     */
    public Node path(String path) {
        Scriptable value = recurseNodePath(Arrays.asList(path.split("\\.")), root);
        if(value != null) return new Node(value, context, strict);

        if (strict) throw new NoSuchNodeExists(path);
        else return null;
    }
    
    /**
     * Finds the scriptable object by name in current scope.
     * 
     * @param name
     * @return 
     */
    public Node name(String name) {
        Object value = root.get(name, root);
        if(value instanceof Scriptable) return new Node((Scriptable) value, context, strict);
        
        if (strict) throw new NoSuchNodeExists(name);
        else return null;
    }

    public Scriptable get() {
        return root;
    }

    private Scriptable recurseNodePath(List<String> nodes, Scriptable scope) {
        Object current = scope.get(nodes.get(0), scope);
        if(nodes.size() > 1 && current instanceof Scriptable) {
            return recurseNodePath(nodes.subList(1, nodes.size()), (Scriptable) current);
        }

        if(current instanceof Scriptable) { return (Scriptable) current; }
        return null;
    }        
   
}