package com.digmia.maven.plugin.extjsbuilder;

import java.io.File;
import java.io.IOException;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;


/**
 *
 * @author fk
 */
public class GlobalTest {
    
    @DataProvider(name = "globalData")
    public static Object[][] initGlobal() throws IOException {
        File appDirectory = new File(GlobalTest.class.getResource("/testApp").getFile());
        String appPrefix = "DanteFrontend";
        
        return new Object[][] {{ appDirectory, appPrefix }};
    }
    
    @Test(dataProvider = "globalData", expectedExceptions = { AssertionError.class })
    public void testIncompleteBuild1(File appDirectory, String appPrefix) {
        Global.init().build();
    }
    
    
    @Test(dataProvider = "globalData")
    public void testCompleteBuild(File appDirectory, String appPrefix) {
        Global.init()
            .setAppDirectory(appDirectory)
            .setAppPrefix(appPrefix)
            .build();
    }     
}
