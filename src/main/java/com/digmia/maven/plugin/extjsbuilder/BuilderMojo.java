package com.digmia.maven.plugin.extjsbuilder;

/*
 * Copyright 2001-2005 The Apache Software Foundation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import com.digmia.maven.plugin.extjsbuilder.Global.GlobalBuilder;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;


/**
 * A maven goal, which builds single file consisting of ExtJS dependency classes 
 * specified inline in the js classfiles.
 *
 * @goal build
 * @phase process-sources
 */
public class BuilderMojo extends AbstractMojo
{
    /**
     * The directory which will contain the build file.
     * @parameter expression="${build.outputDir}"
     * @required
     */
    private File buildOutputDir;
    
    /**
     * The file name of the build file. Defaults to "app-build".
     * @parameter expression="${build.outputFilename}"
     */
    private String buildOutputFilename;    
    
    
    /**
     * Root file of the application, from which the dependencies will be calculated and traversed.
     * @parameter expression="${app.dir}"
     */
    private File appDir;
    
    /**
     * Root file of the application, from which the dependencies will be calculated and traversed.
     * @parameter expression="${app.rootFile}"
     * @required
     */
    private File appRootFile;

    /**
     * Paths to bootstrap files, to be included before any dependencies.
     * @parameter expression="${app.bootstrapFiles}"
     */
    private File[] appBootstrapFiles;  
    
    
    /**
     * Application root namespace (used to resolve the relative view, model, store and controller paths specified on controllers).
     * @parameter expression="${app.rootNamespace}"
     * @required
     */
    private String appRootNamespace;  
    
    /**
     * Package prefix fragments, which should not be followed in the dependency tree. 
     * Since you don't want to build the whole ext project each time, the prefix 'Ext.' is included by default.
     * Specifying additional prefixes allows you to resolve certain dependencies yourself.
     * 
     * @parameter expression="${app.externalPrefixes}"
     */    
    private String[] appExternalPrefixes;
    
    
    
    @Override
    public void execute() throws MojoExecutionException {   
        try {
            GlobalBuilder gb = Global.init()
                .setAppPrefix(appRootNamespace)
                .setAppRootFile(appRootFile)
                .setDependencyBootstrapFiles(Arrays.asList(appBootstrapFiles))
                .setOutputDirectory(buildOutputDir)
                .setOutputFileName(buildOutputFilename)
                .setAppDirectory(appDir)
                .setExternalPackagePrefixes(Arrays.asList(appExternalPrefixes));

            Global global = gb.build();
            
            List<JsClass> classList = new DependencyCollector(global).collectDependencies();

            getLog().info("Classfile ordering: " + classList.toString().replace(",", String.format("%n")));
            
            new BuildWriter(global).buildFromOrderedList(classList);
            
        } catch(IOException io) {
            throw new MojoExecutionException("IO Error: ", io.getCause());
        } catch(AssertionError ae) {
            throw new MojoExecutionException("Configuration error: ", ae.getCause());
        }
    }
}
