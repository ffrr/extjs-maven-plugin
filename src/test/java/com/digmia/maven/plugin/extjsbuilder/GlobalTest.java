package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.context.ContextWrapper;
import com.digmia.maven.plugin.extjsbuilder.context.DefaultContextWrapper;
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
        ContextWrapper cw = new DefaultContextWrapper();
        
        return new Object[][] {{ appDirectory, appPrefix, cw }};
    }
    
    @Test(dataProvider = "globalData", expectedExceptions = { AssertionError.class })
    public void testIncompleteBuild1(File appDirectory, String appPrefix, ContextWrapper cw) {
        Global.init().build();
    }
    
    @Test(dataProvider = "globalData", expectedExceptions = { AssertionError.class })
    public void testIncompleteBuild2(File appDirectory, String appPrefix, ContextWrapper cw) {
        Global.init()
            .setContextWrapper(cw)
            .build();
    }    
    
    @Test(dataProvider = "globalData", expectedExceptions = { AssertionError.class })
    public void testIncompleteBuild3(File appDirectory, String appPrefix, ContextWrapper cw) {
        Global.init()
            .setAppDirectory(appDirectory)
            .setContextWrapper(cw)
            .build();
    }        
    
    @Test(dataProvider = "globalData")
    public void testCompleteBuild(File appDirectory, String appPrefix, ContextWrapper cw) {
        Global.init()
            .setAppDirectory(appDirectory)
            .setContextWrapper(cw)
            .setAppPrefix(appPrefix)
            .build();
    }     
}
