package com.digmia.maven.plugin.extjsbuilder;

import com.digmia.maven.plugin.extjsbuilder.util.FilenameListFilter;
import java.io.File;
import java.io.IOException;
import java.util.List;
import org.apache.commons.io.FileUtils;
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
        File appDirectory = new File(GlobalTest.class.getResource("/app").getFile());
        String appPrefix = "DanteFrontend";
        Global global = Global.init()
            .setAppDirectory(appDirectory)
            .setOutputDirectory(appDirectory)
            .setAppPrefix(appPrefix)
            .setDependencyBootstrapFiles(FileUtils.listFiles(appDirectory, new FilenameListFilter("preboot.js", "login.js"), null))
            .setAppRootFile(new File(GlobalTest.class.getResource("/app/app.js").getFile()))
            .build();
        return new Object[][] {{ global }};
    }
    
    @Test(dataProvider = "global")
    public void runDependencyParser(Global global) throws IOException {
       DependencyCollector dp = new DependencyCollector(global);
       List<JsClass> deps = dp.collectDependencies();
       BuildWriter bw = new BuildWriter(global);
       bw.buildFromOrderedList(deps);
       Reporter.log(global.getOutputFile().toString(), true);
    }
    
}
