package com.digmia.maven.plugin.extjsbuilder.future;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.apache.commons.io.FileUtils;
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
        String includeFile = FileUtils.readFileToString(new File(ParsingFacadeTest.class.getResource("/testInclude.js").getFile()), "utf-8");    

        Context ctx = Context.enter();
        Scriptable root = ctx.initStandardObjects();
        
        // first we need to initialize the context with dummy constructs
        ctx.evaluateString(root, contextInitFile, "<contextInit>", 1, null);
        
        // fill the context with the actual app file
        ctx.evaluateString(root, appFile, "<app>", 1, null);
        
        //
        ctx.evaluateString(root, includeFile, "<inc>", 1, null);

        
        return new Object[][] {
            {ctx, root}
        };
    }
    
    @Test(dataProvider = "context")
    public void testAppRequires(Context ctx, Scriptable root) {
        Node global = Node.in(root, ctx).name("global");
        
        Scriptable requires = global.path("defines.app.requires").get();
        NativeObject defines = (NativeObject) global.path("defines").get();
        List<String> req = LegacyConvertor.nativeArrayToStringList((NativeArray) requires);
        Map<String, Object> xtends = LegacyConvertor.nativeObjectToMap(defines);
        
        for(String s: xtends.keySet()) {
            Reporter.log(s, true);    
        }

        Reporter.log(req.toString(), true);
    }
    
    @Test
    public void fileBoilerplate() {
        File test = new File(ParsingFacadeTest.class.getResource("/contextInit.js").getFile());
        Reporter.log(String.valueOf(test.getAbsolutePath().replace(File.separator, "%").split("%").length), true);
        Reporter.log(test.getAbsolutePath().substring(test.getAbsolutePath().lastIndexOf("target") + "target".length()), true);
    }
    
    
    
        
}
