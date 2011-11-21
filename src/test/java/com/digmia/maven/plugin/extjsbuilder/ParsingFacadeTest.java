package com.digmia.maven.plugin.extjsbuilder;


import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import org.apache.commons.io.FileUtils;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.NativeArray;
import org.mozilla.javascript.Scriptable;
import org.testng.Reporter;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;


/**
 * Default Builder mojo testcase.
 * @author fk
 */
public class ParsingFacadeTest {
    
    @DataProvider(name = "context")
    public static Object[][] testJsFileProvider() throws IOException {
        String contextInitFile = FileUtils.readFileToString(new File(ParsingFacadeTest.class.getResource("/contextInit.js").getFile()), "utf-8");    
        String appFile = FileUtils.readFileToString(new File(ParsingFacadeTest.class.getResource("/app.js").getFile()), "utf-8");    
        String includeFile = FileUtils.readFileToString(new File(ParsingFacadeTest.class.getResource("/include.js").getFile()), "utf-8");    

        Context ctx = Context.enter();
        Scriptable root = ctx.initStandardObjects();
        
        // first we need to initialize the context with dummy constructs
        ctx.evaluateString(root, contextInitFile, "<contextInit>", 1, null);
        
        // fill the context with the actuall app file
        ctx.evaluateString(root, appFile, "<app>", 1, null);
        
        ctx.evaluateString(root, includeFile, "<app>", 1, null);

        
        return new Object[][] {
            {ctx, root}
        };
    }
    
    @Test(dataProvider = "context")
    public void testAppRequires(Context ctx, Scriptable root) {
        Scriptable requires = ParsingUtils.getNodePath("global.conf.requires", root, ctx);
        List<String> req = ParsingUtils.nativeArrayToStringList((NativeArray) requires);
        Reporter.log(req.toString(), true);
    }
    
    
    
        
}
