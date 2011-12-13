package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.future.ParsingFacadeTest;
import bsh.StringUtil;
import java.io.File;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.io.FileUtils;
import org.testng.Reporter;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 *
 * @author fk
 */
public class PatternTest {
    
    
    @DataProvider(name = "stringData")
    public static Object[][] stringData() throws IOException {
        String appFile = FileUtils.readFileToString(new File(ParsingFacadeTest.class.getResource("/app.js").getFile()), "utf-8");    
        String includeFile = FileUtils.readFileToString(new File(ParsingFacadeTest.class.getResource("/testInclude.js").getFile()), "utf-8");    

        return new Object[][] {{ appFile, includeFile }};
    }
    
    //@Test(dataProvider = "stringData")
    public void classDefinition(String app, String include) {
        Pattern.compile("^Ext\\.define\\((.*),(.*)\\);", Pattern.DOTALL);
    }
    
    //@Test(dataProvider = "stringData")
    public void allReq(String app, String include) {
        Pattern arrayPattern = Pattern.compile("((requires|extend|controllers|views|models|stores)\\s*:\\s*\\[(.*?)\\]\\s*)", Pattern.DOTALL);
        Pattern singleStringPattern = Pattern.compile("((requires|extend|controllers|views|models|stores)\\s*:\\s*([A-Za-z0-9_.']+)\\s*)", Pattern.DOTALL);
        Pattern excludeBlockComments = Pattern.compile("/\\*.*?\\*/", Pattern.DOTALL);
        Pattern excludeLineComments = Pattern.compile("//.*", Pattern.MULTILINE);
        app = excludeBlockComments.matcher(app).replaceAll("");
        
        //include = excludeBlockComments.matcher(include).replaceAll("");
        Matcher m1 = singleStringPattern.matcher(include);
        Matcher m2 = arrayPattern.matcher(app);
        
        
//        while(m2.find()) {
//            Reporter.log(String.format("Match start: %d, end: %d, group: '%s'.", m2.start(), m2.end(), m2.group(3)), true);
//        }
        
        while(m2.find()) {
            String s = m2.group(3);
            //Reporter.log(s, true);
            
            String replaced = excludeLineComments.matcher(s).replaceAll("");
            
            //Reporter.log(replaced, true);
            //Reporter.log(String.format("Match start: %d, end: %d, group: '%s'.", m1.start(), m1.end(), m1.group(3)), true);
        }        
    }    
    
}
