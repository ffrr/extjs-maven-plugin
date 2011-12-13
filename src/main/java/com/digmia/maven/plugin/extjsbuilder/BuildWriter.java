package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.util.FileHelper;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author fk
 */
public class BuildWriter {
    private FileHelper fileHelper;
    private Global global;
    
    public BuildWriter(Global global) {
        fileHelper = new FileHelper(true, false, "UTF-8");
        this.global = global;
    }
    
    public void buildFromOrderedList(List<JsClass> list) throws IOException {
        
        global.getOutputFile().createNewFile();
        FileWriter writer = new FileWriter(global.getOutputFile());
        
        try {
            for(JsClass klass: list) {
                File f = klass.getFile();
                String s = fileHelper.readFileToString(f);
                writer.append(s);
                
                //append newline after each file
                writer.append(String.format("%n"));
            }
        } finally {
            writer.close();
        }
    }
    
}
