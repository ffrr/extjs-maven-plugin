package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.context.ContextWrapper;
import com.digmia.maven.plugin.extjsbuilder.context.DefaultContextWrapper;
import java.io.File;
import java.io.IOException;
import org.testng.Reporter;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 *
 * @author fk
 */
public class DependencyParserTest {
    
    @DataProvider(name = "global")
    public static Object[][] initGlobal() throws IOException {
        File appDirectory = new File(GlobalTest.class.getResource("/testApp").getFile());
        String appPrefix = "DanteFrontend";
        ContextWrapper cw = new DefaultContextWrapper();
        Global global = Global.init()
            .setAppDirectory(appDirectory)
            .setContextWrapper(cw)
            .setAppPrefix(appPrefix)
            .build();
        return new Object[][] {{ global }};
    }
    
    @Test(dataProvider = "global")
    public void runDependencyParser(Global global) {
       DependencyParser dp = new DependencyParser(global);
       Reporter.log(dp.collectDependencies().toString(), true);
    }
    
}
