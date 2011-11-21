package com.digmia.maven.plugin.extjsbuilder;

import jargs.gnu.CmdLineParser;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import com.yahoo.platform.yui.compressor.CssCompressor;
import com.yahoo.platform.yui.compressor.JavaScriptCompressor;

public class JSBuilder2 {
	
    private static String version = "2.0.3";
    
    private static FileHelper fileHelper;
    
    private static ArrayList<File> outputFiles = new ArrayList<File>();

    private static String projectFile;
    private static String sourceDir;
    private static String homeDir;
    private static Boolean verbose;
	private static String debugSuffix;

	private static String deployDirName;
	private static String forceEncoding;
	private static String forceLineEnd;
	private static Boolean stripComments;
	private static Boolean removeTempPkg;
	private static String removeFilter;
	private static Boolean deployMode;
			
	private static Integer yuiLineBreak;
	private static Boolean yuiVerbose;
	private static Boolean yuiNoMunge;
	private static Boolean yuiPreserveSimi;
	private static Boolean yuiDisableOpt;
	private static Boolean yuiCompressCss;
	private static Boolean yuiCollapseLic;
    
    private static JSONObject projCfg;
    private static JSONArray pkgs;
    
	private static File deployDir;
	private static File headerFile;   
    private static String projectHome;

    
    private static long tstart = 0, taccum = 0; 
    public static void tstart() {
        tstart = System.currentTimeMillis();	
    }
    public static long tstop() {
        return taccum += (System.currentTimeMillis() - tstart);	
    }

    
    public static void main(String[] args) {
        if (parseArgs(args) != true) {
            printUsage();
        } else {
        	fileHelper = new FileHelper(verbose, verbose, forceEncoding);
            System.out.format("Using the '%s' encoding%n", (fileHelper.encoding==null) ? fileHelper.sysEncoding : fileHelper.encoding);            
       	
            openProjectFile(projectFile);
            createTempHeaderFile();
            loadPackages();
            mkDeployDir();
            copyResources();
            createTargetsWithFileIncludes();
            createTargetsWithDeps();
            writeHeadersToTargets();
            compressOutputFiles();
            cleanFiles();
        }
    }
    
    private static void printUsage() {        
        System.out.println("JSBuilder version " + version);
        System.out.println("Ext JS, LLC.");
        System.out.println("\nAvailable arguments:");
        System.out.println("    --projectFile -p    (REQUIRED) Location of a jsb2 project file");
        System.out.println("    --homeDir -d        (REQUIRED) Home directory to build the project to");
        System.out.println("    --verbose -v        (OPTIONAL) Output detailed information about what is being built");
        System.out.println("    --debugSuffix -s    (OPTIONAL) Suffix to append to JS debug targets, defaults to \'debug\'");
        System.out.println("    --help -h           (OPTIONAL) Prints this help display.");        
        
        System.out.println("\nAdditional Contrib Options:  (these options are contributions not in the original 2.0.0 source.)");
        System.out.println("    --sourceDir -f      (OPTIONAL) Overrides using the projectFile path as the source files path.");
        System.out.println("    --deployDir -n      (OPTIONAL) Overrides the deployDir (package name) setting in the .jsb2 file.");
        System.out.println("    --forceEncoding -e  (OPTIONAL) Convert text files to 'UTF-8', 'UTF-16LE', 'UTF-16BE', etc..., also strips BOMs");
        System.out.println("    --forceLineEnd -l   (OPTIONAL) Convert uncompressed CSS and JS files to 'unix' or 'windows'");
        System.out.println("    --stripComments -c  (OPTIONAL) Strip comments from debug versions of files");
        System.out.println("    --removeTempPkg -t  (OPTIONAL) Remove packages marked as temporary for final user deployment builds");
        System.out.println("    --removeFilter -F   (OPTIONAL) Remove folders designated by filter. Ex: -f pkg;test;welcome");
        System.out.println("    --deployMode -D     (OPTIONAL) Set common deploy options for deployment builds. -L -l -e -F are over-rideable");
        System.out.println("               Specifically: -l unix -e UTF-8 -L 1000 -c -C -I -T -F pkgs;src;test;welcome;docs;ext.jsb2;index.html");

        System.out.println("\nAdditional YUI Options:  (these options are the same as the YUI compressor command line options)");
		System.out.println("    --yui-line-break -L            (OPTIONAL) defaults to -1, which is no line breaks");
		System.out.println("    --yui-verbose -V               (OPTIONAL) defaults to not verbose");
		System.out.println("    --yui-nomunge -M               (OPTIONAL) defaults to munge function variables");
		System.out.println("    --yui-preserve-semi -P         (OPTIONAL) defaults to not preserve simi-colons at end of line");
		System.out.println("    --yui-disable-optimizations -O (OPTIONAL) defaults to enabling micro optimizations");
		System.out.println("    --yui-compress-css -C          (OPTIONAL) defaults to not compress css");
		System.out.println("    --yui-collapse-license -I      (OPTIONAL) defaults to not consolidating licenses per file");
        
        System.out.println("\nExample Usage:");
        System.out.println("Windows:");
        System.out.println("java -jar JSBuilder2.jar --projectFile C:\\Apps\\www\\ext3svn\\ext.jsb2 --homeDir C:\\Apps\\www\\deploy\\");
        System.out.println("Linux and OS X:");
        System.out.println("java -jar JSBuilder2.jar --projectFile /home/aaron/www/trunk/ext.jsb2 --homeDir /home/aaron/www/deploy/");
        System.out.println("\nJSBuilder2 is a JavaScript and CSS project build tool.");
        System.out.println("For additional information, see http://extjs.com/products/jsbuilder/");
    }
    
    private static boolean parseArgs(String[] args) {
        CmdLineParser parser = new CmdLineParser();

        CmdLineParser.Option projectFileOpt = parser.addStringOption('p', "projectFile");
        CmdLineParser.Option homeDirOpt = parser.addStringOption('d', "homeDir");
        CmdLineParser.Option verboseOpt = parser.addBooleanOption('v', "verbose");
        CmdLineParser.Option helpOpt = parser.addBooleanOption('h', "help");        
        CmdLineParser.Option debugSuffixOpt = parser.addStringOption('s', "debugSuffix");
               
        CmdLineParser.Option sourceDirOpt = parser.addStringOption('f', "sourceDir");
        CmdLineParser.Option deployDirOpt = parser.addStringOption('n', "deployDir");
        CmdLineParser.Option forceEncodingOpt = parser.addStringOption('e', "forceEncoding");
        CmdLineParser.Option forceLineEndOpt = parser.addStringOption('l', "forceLineEnd");
        CmdLineParser.Option stripCommentsOpt = parser.addBooleanOption('c', "stripComments");
        CmdLineParser.Option removeTempPkgOpt = parser.addBooleanOption('t', "removeTempPkg");
        CmdLineParser.Option removeFilterOpt = parser.addStringOption('F', "removeFilter");
        CmdLineParser.Option deployModeOpt = parser.addBooleanOption('D', "deployMode");
               
        CmdLineParser.Option yuiLineBreakOpt = parser.addIntegerOption('L', "yui-line-break");
        CmdLineParser.Option yuiVerboseOpt = parser.addBooleanOption('V', "yui-verbose");
        CmdLineParser.Option yuiNoMungeOpt = parser.addBooleanOption('M', "yui-nomunge");
        CmdLineParser.Option yuiPreserveSimiOpt = parser.addBooleanOption('P', "yui-preserve-semi");
        CmdLineParser.Option yuiDisableOptOpt = parser.addBooleanOption('O', "yui-disable-optimizations");
        CmdLineParser.Option yuiCompressCssOpt = parser.addBooleanOption('C', "yui-compress-css");
        CmdLineParser.Option yuiCollapseLicOpt = parser.addBooleanOption('I', "yui-collapse-license");

        try {
            parser.parse(args);
        }
        catch ( CmdLineParser.OptionException e ) {
            System.err.println(e.getMessage());
            System.exit(2);
        }

        homeDir = (String)parser.getOptionValue(homeDirOpt, "");
        projectFile = (String)parser.getOptionValue(projectFileOpt, "");
        debugSuffix = (String)parser.getOptionValue(debugSuffixOpt, "-debug");
        verbose = (Boolean)parser.getOptionValue(verboseOpt, false);
        Boolean help = (Boolean)parser.getOptionValue(helpOpt, false);

        // process deploy mode first
        deployMode = (Boolean)parser.getOptionValue(deployModeOpt, false);
        
        sourceDir = (String)parser.getOptionValue(sourceDirOpt, null);
        deployDirName = (String)parser.getOptionValue(deployDirOpt, null);
        forceEncoding = (String)parser.getOptionValue(forceEncodingOpt, (deployMode) ? "UTF-8" : null);
        forceLineEnd = (String)parser.getOptionValue(forceLineEndOpt, (deployMode) ? "unix" : null);
        stripComments = (Boolean)parser.getOptionValue(stripCommentsOpt, (deployMode) ? true : false);
        removeTempPkg = (Boolean)parser.getOptionValue(removeTempPkgOpt, (deployMode) ? true : false);
        removeFilter = (String)parser.getOptionValue(removeFilterOpt, (deployMode) ? "pkgs;src;test;welcome;docs;ext.jsb2;index.html" : null);
                
        yuiLineBreak = (Integer)parser.getOptionValue(yuiLineBreakOpt, (deployMode) ? 1000 : -1);
        yuiVerbose = (Boolean)parser.getOptionValue(yuiVerboseOpt, false);
        yuiNoMunge = (Boolean)parser.getOptionValue(yuiNoMungeOpt, false);
        yuiPreserveSimi = (Boolean)parser.getOptionValue(yuiPreserveSimiOpt, false);
        yuiDisableOpt = (Boolean)parser.getOptionValue(yuiDisableOptOpt, false);
        yuiCompressCss = (Boolean)parser.getOptionValue(yuiCompressCssOpt, (deployMode) ? true : false);
        yuiCollapseLic = (Boolean)parser.getOptionValue(yuiCollapseLicOpt, (deployMode) ? true : false);

        // if help don't proceed
        if (help) {
            return false;
        }
    	// Can't compare == using "" and strings, sometimes it works sometimes not
        //   its a compiler thing, it's about if compilation unit's literal string table happens to match for a particular "" instance or not
//      if (homeDir == "") {
        if ("".equals(homeDir)) {
            System.err.println("The --homeDir or -d argument is required and was not included in the commandline arguments.");
            return false;
        }
        if ("".equals(projectFile)) {
//        if (projectFile == "") {
            System.err.println("The --projectFile or -p argument is required and was not included in the commandline arguments.");
            return false;
        }
        if (forceLineEnd != null && !"windows".equals(forceLineEnd) && !"unix".equals(forceLineEnd)) {
            System.err.println("The --forceLineEnd or -l argument can only have 'unix' or 'windows' as values.");        	
        }
        return true;
    }
    
    private static void openProjectFile(String projectFileName) {
        try {
        	File projectDir = null;
        	File projectFile = null;
        	
        	// try source dir
        	//   this allows you to have a project file that is in a different place than the source
        	//   or have a project file thats relative to the source by using relative path on the projectFileName
        	if (sourceDir != null && !"".equals(sourceDir)) {
        		projectDir = new File(sourceDir);
        		projectFile = new File(projectDir.getAbsolutePath() + File.separatorChar + projectFileName);
        	}
        	
        	// try project file
        	//   this follows the old semantics, except that the project dir will be substituted for
        	//   the sourceDir if they specified one
        	if (projectFile==null || !projectFile.exists() || projectFile.isDirectory()) {
        		projectFile = new File(projectFileName); 
        		if (projectDir == null)
        			projectDir = new File(projectFile.getAbsoluteFile().getParent());
        	}
        	
        	if (!projectDir.exists())
        		throw new Exception(String.format("Source directory '%s' does not exist", projectDir.getAbsolutePath()));
        	projectHome = projectDir.getAbsolutePath();
   
            // read the file into a string
            String s = fileHelper.readFileToString(projectFile);
    
            // create json obj from string
            projCfg = new JSONObject(s);
            System.out.format("Loading the '%s' Project%n", projCfg.get("projectName"));            
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
            System.err.println("Failed to open project file.");
            System.exit(1);
        }
    }
    
    private static void loadPackages() {
        try {
            pkgs = projCfg.getJSONArray("pkgs");            
            System.out.format("Loaded %d Packages%n", pkgs.length());            
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
            System.err.println("Failed to find \'pkgs\' configuration.");            
        }
    }
    
    private static void createTempHeaderFile() {
        try {
            StringBuilder headerBuilder = new StringBuilder();
            headerFile = File.createTempFile("header",".hd");
            headerFile.deleteOnExit();
            String licText = projCfg.getString("licenseText");
            String[] licTextArray = licText.split("\n");
            headerBuilder.append("/*!\n");
            for (int i = 0, licTextLn = licTextArray.length; i < licTextLn; i++) {                
                headerBuilder.append(" * " + licTextArray[i] + "\n");
            }
            headerBuilder.append(" */\n");            
            fileHelper.writeStringToFile(headerBuilder.toString(), forceEncoding, headerFile, false);   // make sure header is same encoding if possible
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to create temporary header file.");
        }
    }
    
    private static void mkDeployDir() {
        try {
        	if (deployDirName == null || "".equals(deployDirName))
        		deployDirName = projCfg.getString("deployDir");
            System.out.format("Using the '%s' package name as deploy directory.%n", deployDirName);            
            deployDir = new File(homeDir + File.separatorChar + deployDirName);
            deployDir.mkdirs();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to create deploy directory.");            
        }        
    }
    
    private static void createTargetsWithFileIncludes() {
        try {
            int len = pkgs.length();
            /* loop over packages for fileIncludes */
            for (int i = 0; i < len; i++) {
                /* Build pkg and include file deps */
                JSONObject pkg = pkgs.getJSONObject(i);	
                /* if we don't include dependencies, it must be fileIncludes */
                if (!pkg.optBoolean("includeDeps", false)) {
                    String targFileName = pkg.getString("file");
                    
                    String ext = fileHelper.getExtention(targFileName);          
                    if (".js".equals(ext) || (".css".equals(ext) && yuiCompressCss)) {
                        targFileName = fileHelper.insertFileSuffix(targFileName, debugSuffix);
                    }

                    if (verbose) {
                        System.out.format("Building the '%s' package as '%s'%n", pkg.getString("name"), targFileName);    
                    }
                
                    /* create file and write out header */						
                    File targetFile = new File(deployDir.getCanonicalPath() + File.separatorChar + targFileName);
                    outputFiles.add(targetFile);
                    targetFile.getParentFile().mkdirs();
//                    fileHelper.writeStringToFile("", targetFile, false);			// first file doesn't append anymore

                    /* get necessary file includes for this specific package */
                    JSONArray fileIncludes = pkg.getJSONArray("fileIncludes");
                    int fileIncludesLen = fileIncludes.length();
                    if (verbose) {
                        System.out.format("- There are %d file include(s).%n", fileIncludesLen);    
                    }                    

                    /* loop over file includes */
                    String enc = null;
                    for (int j = 0; j < fileIncludesLen; j++) {
                        /* open each file, read into string and append to target */
                        JSONObject fileCfg = fileIncludes.getJSONObject(j);

                        String subFileName = projectHome + File.separatorChar + fileCfg.getString("path") + fileCfg.getString("text");
                        if (verbose) {
                            System.out.format("- - %s%s%n", fileCfg.getString("path"), fileCfg.getString("text"));    
                        }                        
                        File subFile = new File(subFileName); 

//                        String tempString = fileHelper.readFileToString(subFile);
//                        fileHelper.writeStringToFile(tempString, targetFile, true);
                        fileHelper.copyFileText(subFile, targetFile, (j!=0), enc);		// only append after first file (j!=0)
                        if (j==0) enc = fileHelper.lastENC;							// ensure spliced files have same encoding
                    }
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to create targets with fileIncludes.");
        }
    }
    
    private static void createTargetsWithDeps() {
        try {
            int len = pkgs.length();
            for (int i = 0; i < len; i++) {
                /* Build pkg and include file deps */
                JSONObject pkg = pkgs.getJSONObject(i);	
                /* if we need to includeDeps, they should already be built. */
                if (pkg.optBoolean("includeDeps", false)) {
                    String targFileName = pkg.getString("file");
                    
                    String ext = fileHelper.getExtention(targFileName);          
                    if (".js".equals(ext) || (".css".equals(ext) && yuiCompressCss)) {
                    	targFileName = fileHelper.insertFileSuffix(targFileName, debugSuffix);
                    }

                    if (verbose) {
                        System.out.format("Building the '%s' package as '%s'%n", pkg.getString("name"), targFileName);
                        System.out.println("This package is built by included dependencies.");                        
                    }

                    /* create file and write out header */	// not actually writing header here, just making the file					
                    File targetFile = new File(deployDir.getCanonicalPath() + File.separatorChar + targFileName);
                    outputFiles.add(targetFile);
                    targetFile.getParentFile().mkdirs();
//                  fileHelper.writeStringToFile("", targetFile, false);			// first file doesn't append anymore

                    /* get necessary pkg includes for this specific package */
                    JSONArray pkgDeps = pkg.getJSONArray("pkgDeps");
                    int pkgDepsLen = pkgDeps.length();
                    if (verbose) {
                        System.out.format("- There are %d package include(s).%n", pkgDepsLen);    
                    }
                    
                    /* loop over file includes */
                    String enc = null;
                    for (int j = 0; j < pkgDepsLen; j++) {
                        /* open each file, read into string and append to target */
                        String name = pkgDeps.getString(j);
                        if (verbose) {
                            System.out.format("- - %s%n", name);
                        }
                        
                    	String debugName = null;
                    	
                    	ext = fileHelper.getExtention(name);          
                        if (".js".equals(ext) || (".css".equals(ext) && yuiCompressCss)) {
                        	debugName = fileHelper.insertFileSuffix(name, debugSuffix);
                        }
                        
                        File file = null;
                        if (debugName != null) {
                        	file = new File(deployDir.getCanonicalPath() + File.separatorChar + debugName);                        
                        	if (!file.exists() && debugName != null) 
                        		file = new File(deployDir.getCanonicalPath() + File.separatorChar + name);
                        }
                        fileHelper.copyFileText(file, targetFile, (j!=0), enc);		// only append after first file (j!=0)
                        if (j==0) enc = fileHelper.lastENC;							// ensure spliced files have same encoding
                    }
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println("Failed to create target with package dependencies.");
        }
    }
 
    
    // this effectively writes headers to JS and CSS files only
    //  it basically rewrites all of the already copied deploy files with new headers, 
    //  sort of in-place. this is dog slow
    public static void writeHeadersToTargets() {
        System.out.println("Writing headers...");
//        taccum = 0;

        // looks pretty, but this is slow as hell
        //  it doesn't get all cases, and isn't being consistently used so you have diverging path in diff stages of the app
//        Collection<File> outFiles = fileHelper.listFiles(deployDir, new FilenameFilter() {
//            private Pattern pattern = Pattern.compile(".*[\\.js|\\.css]");
//            public boolean accept(File dir, String name) {
//                return pattern.matcher(name).matches() && !(new File(dir.getAbsolutePath() + File.separatorChar + name).isDirectory());
//            }                            
//        }, true);

        // switching to using the raw bytes, save time and bad conversion issues
        //   since no provisions in this util for encoding in the most general sense.
        // java will skip swallowing the BOM unless you guess the right type for conversion
        //   when using stream or string based conversion, so these provisions are not redundant.
        byte hcWin[] = null, hcUnix[] = null;
       	try {
            byte[] headerContents = fileHelper.readFile(headerFile);
       		for (File f : outputFiles) {
 
 
	        	if (f.isDirectory()) continue;
				String ext = fileHelper.getExtention(f.getName());
	            if (!".js".equals(ext) && !".css".equals(ext))
	            	continue;
	            
	            if (f.getName().equals("ext-all-debug.js")){
	            	hcWin = null;
	            }
	            byte[] codeContents = fileHelper.readFile(f);
	
	        	tstart();
	            // ok, now we have the encoding issues
	            //  since this is the only place that tries to actually splice a file
	            //  that was autogenerated, possibly with different encoding than the 
	            //  distribution or svn download... java stream support for BOM is still bad
	            //  so doing this manually, the long, but fast, way.
	            //  ** moved code to writeFileText and getBufEnc in FileHelper **
	        	fileHelper.getBufLE(fileHelper.getBufEnc(codeContents));
	        	boolean css = ".css".equals(ext);
	            int szBom = fileHelper.lastSizeBOM;
	            String enc = fileHelper.lastENC;
	            int stride = fileHelper.lastStride;
	            boolean isUnix = fileHelper.lastUnixLE; 		// if it has any unix then we side with unix encoding, which is smaller
	                        
		        // this is where we collapse headers, using a binary scan
	            //   this is being done here as we are already paying the cost of re-constituting the 
	            //   files, and this is less invasive code wise. This effectively ignores utf encoding, even utf32,
	            //   so long as we have a input header using only straight ASCII sequences regardless of its encoding.
	            // on this front, this bundle has an enhanced YUI CssCompressor thats slightly faster and wont munge an 
	            //   otherwise pristine top header, unlike the current version in 2.4.2.
	            boolean writeHeader = true;
	            byte a[] = codeContents, h[] = headerContents;					// w is the write index for a
	            int al = a.length, hl = h.length, w=0;
//	            for (int i=0,j=0,w=0,s=0,al=a.length,hl=h.length; i<al; j=0) {	// start header scan
//	            	while (i<al && a[i]!='/') i++;								// hard coding '/' and '!' for speed
//	            	for (s=i; i<al && j<hl && a[i]==h[j]; ) {					// slightly sloppy ws and encoding equalization
//	            		while (i<al && j<hl && a[i]==h[j]) { i++; j++; }
//	            		while (i<al && (a[i]==0 || a[i]=='\r' || a[i]==' ' || a[i]=='\t' || a[i]=='\n')) i++; 
//	            		while (j<hl && (h[j]==0 || h[j]=='\r' || h[j]==' ' || h[j]=='\t' || h[j]=='\n')) j++;
//	            	}
//	            	if (j >= hl && a[s+2]=='!') {								// found
//	            		if (s==szBom) writeHeader = false;						//   skip if at top, and we just won't write our header
//	            		else if (yuiCollapseLic) a[s+2] = ' '; else break;		// subsequent headers need not be written on collapse
//	            	}
//            	}
	            // this version cleans comments leaving license headers
	            //   and is mindful string literals and js escapes for reg-ex
	            // this kind of thing is generally a bitch
	            //   like not looking to see if we are in a string "" or ''
	            for (int i=0,j=0,s=0,o=stride; i<al; j=0) {
	            	while (i<al && a[i]!='/' && a[i]!='\'' && a[i]!='\"') i++;	// hard coding '/' and '!' for speed
	            	if(i<al && a[i]!='/' && (a[i++-o]!='/' && !css))			// is a string, for js make sure not a reg-ex escape
	            		for(j=a[i]; i<al && j!=a[i++];);						//   is string, find end	            	
	            	if(w>0) for(; s<i; a[w++]=a[s++]);							// squeeze the buffer
	            	for (s=i,j=0; i<al && j<hl && a[i]==h[j];) {				// slightly sloppy ws and encoding equalization
	            		while (i<al && j<hl && a[i]==h[j]) { i++; j++; }
	            		while (i<al && (a[i]==0 || a[i]==' ' || a[i]=='\t' || a[i]=='\n' || a[i]=='\r')) i++; 
	            		while (j<hl && (h[j]==0 || h[j]==' ' || h[j]=='\t' || h[j]=='\n' || h[j]=='\r')) j++;
	            	}
	            	if (j >= hl) {												// found ours, we assume our header has a ! in it
	            		if (s==szBom) writeHeader = false;						//   skip if at top, and we just won't write our header
	            		else if (yuiCollapseLic) a[s+o*2] = ' ';				//   subsequent headers need not be written on collapse 
	            		else if (!stripComments) break;							//   can bail if not stripping comments
	            	} else if (stripComments && (j==2 || 						// at least /* but not !, assume our header has no stride
	            			(!css && j==1 && a[i]=='/'))) {						//   is a '//' comment
	            		if (j==1) while(i<al && a[i]!='\r' && a[i]!='\n') i++;	//   skip to eol
	            		else while(i<al && !(a[i-o*2]=='*' && a[i-o]=='/')) i++;//   skip to end marker
	            		if (w==0) w=s; s=i; // start squeeze
	            	}
            	}
	            if (w>0) { al=w; byte b[] = new byte[al]; System.arraycopy(a, 0, b, 0, al); a=b; }         
	            tstop();
	            
	  
	            // this really is the slow way, opening stream several times
	            //  also this processing sort of negates the 'header file' write earlier to
	            //  try to offset issues. this doesn't solve all the issues, but 
	            //  it does make sure the BOM is before the header. if utf 16 we
	            //  are screwed anyway, but this code gets the ball rolling.
	            if (writeHeader) {													// with Ext distribution it will almost never write the header
	            	tstart();														//    if collapse header option is on
					if (isUnix) headerContents = (hcUnix!=null) ? hcUnix : (hcUnix = fileHelper.transCodeLE(h, 0, isUnix));
	            	if (!isUnix) headerContents = (hcWin!=null) ? hcWin : (hcWin = fileHelper.transCodeLE(h, 0, isUnix));
	            	tstop();
	            	if (szBom > 0) fileHelper.writeFile(codeContents, 0, szBom, f, false);
		            fileHelper.writeFileText(headerContents, enc, f, (szBom > 0));	// this converts the header to the correct encoding for the file
	            }
	            tstart();
	           	if (forceLineEnd != null) codeContents = fileHelper.transCodeLE(a, a.length, "unix".equals(forceLineEnd));
	            tstop();
	            fileHelper.writeFile(codeContents, szBom, codeContents.length - szBom, f, writeHeader);
        	}
    	} catch (Exception e) {
    		e.printStackTrace();        		
            System.err.println("Failed to write headers.");
    	}
//        System.out.println("header processign time: " + taccum);
//        System.out.println("resource copy time: " + fileHelper.taccum);
    }
    
   
    static ErrorReporter reporter = null;
    
    public static void compressOutputFiles() {
        System.out.println("Compressing output files...");

        // YUI compression options
        boolean munge = (!yuiNoMunge); 						//true;		// ** lifting out of loop by Beeaar
        boolean preserveAllSemiColons = yuiPreserveSimi;	//false;
        boolean disableOptimizations = yuiDisableOpt;		//false;
        int linebreakpos = yuiLineBreak;					//-1;
        boolean ycVerbose = yuiVerbose;						//false;
        
        // not generating a new error reporter each time
        //  its not using any closure in the loop so no point. this should be way faster
        if (reporter != null) reporter = new ErrorReporter() {            
            public void warning(String message, String sourceName,
                    int line, String lineSource, int lineOffset) {
            	if (line < 0) message = line + ':' + lineOffset + ':' + message;
                System.err.println("\n[WARNING] " + message);
            }	
            public void error(String message, String sourceName,
                    int line, String lineSource, int lineOffset) {
            	if (line < 0) message = line + ':' + lineOffset + ':' + message;
            	System.err.println("\n[ERROR] " + message);
            }
            public EvaluatorException runtimeError(String message, String sourceName,
                    int line, String lineSource, int lineOffset) {
                error(message, sourceName, line, lineSource, lineOffset);
                return new EvaluatorException(message);
            }
        };
        
        // check and process each file that might need compression
        for (File f : outputFiles) {
        	try {
            	
				// get extension and process names
            	if (f.isDirectory()) continue;
				String name = f.getName(), ext = fileHelper.getExtention(name);
                if (!".js".equals(ext) && !(".css".equals(ext) && yuiCompressCss))
                	continue;

				String path = f.getAbsolutePath();
				name = name.substring(0, name.lastIndexOf(ext));
				path = path.substring(0, path.lastIndexOf(name));

				String outName = null, outPath = null;
				outName = name.replace(debugSuffix, "");
				outPath = path + outName + ext;

                if (verbose) {
                    System.out.println("- - " + name + " -> " + outName);
                }

                String out = null;
                String in = fileHelper.readFileToString(f);	 					// must use our reader
                
                // process compressible files                
                if (".js".equals(ext)) {
					JavaScriptCompressor compressor = new JavaScriptCompressor(in, reporter); in=null;   
					out = compressor.compress(linebreakpos, munge, ycVerbose,
							preserveAllSemiColons, disableOptimizations);					
	                
				} else if (".css".equals(ext) && yuiCompressCss) {             	
					CssCompressor compressor = new CssCompressor(in); in=null;	// under the covers YUI just appends to a new SB
					out = compressor.compress(linebreakpos);					// their final product is just a string, just get that directly
				}
                if (out != null)
					fileHelper.writeFile(out.getBytes("UTF-8"), new File(outPath), false);	// ensure final form not barf in browser by forcing utf8           	

            } catch (EvaluatorException e) {    
                e.printStackTrace();           
                System.exit(2);		// Return a special error code used specifically by the web front-end.
    
            } catch (IOException e) {
	            e.printStackTrace();
	            System.exit(1);
	        }
	        
        }
        
    }
    
    public static void copyResources() {
    	taccum = 0;
        try {
            JSONArray resources = projCfg.getJSONArray("resources");
            int resourceLen = resources.length();
            
            for (int z = 0; z < resourceLen; z++) {
                JSONObject resourceCfg = resources.getJSONObject(z);
                String filters = resourceCfg.getString("filters");
                File srcDir = new File(projectHome + File.separatorChar + resourceCfg.getString("src"));
                File destDir = new File(deployDir.getCanonicalPath() + File.separatorChar + resourceCfg.getString("dest"));
                if (srcDir.isDirectory())
                	destDir.mkdirs();
                tstart();
                fileHelper.copyDirectory(srcDir, destDir, filters);
                tstop();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void cleanFiles() {
        System.out.println("Removing temporary files...");
    	taccum = 0;
    	
        int len = pkgs.length();
        String[] filterList = {}; 
        if (removeFilter != null) filterList = removeFilter.trim().split(";");

        // this step will apply the filters to the individual packages
        for (int i = 0; i < len; i++) {
        	try {

        		JSONObject pkg = pkgs.getJSONObject(i);
        		String debugName = null;
                String name = pkg.getString("file"); 
                
                // filter
        		boolean passFilter = true;
    			for (String s : filterList)
    				if (s!=null && name!=null && name.startsWith(s))
   						{ passFilter = false; break; }
        		if (passFilter && (!removeTempPkg || pkg.optBoolean("keep", true)))
	            	continue;
	            	
                // build names and files	                
                String ext = fileHelper.getExtention(name);          
                if (".js".equals(ext) || (".css".equals(ext) && yuiCompressCss)) {
                	debugName = fileHelper.insertFileSuffix(name, debugSuffix);
                }
                
                File debugFile = null;
                File file = new File(deployDir.getCanonicalPath() + File.separatorChar + name);
                if (debugName != null) {
                	debugFile = new File(deployDir.getCanonicalPath() + File.separatorChar + debugName);
                }

                if (verbose) {
                    System.out.format("Removing the temporary '%s' package '%s'%n", pkg.getString("name"), name);
                }
                
                // delete
                if (file.exists()) {
                	file.delete();
                }
                if (debugFile.exists()) {
                	debugFile.delete();
                }
	        
		    } catch (Exception e) {
		        e.printStackTrace();
		        System.err.println("Failed to remove temporary files.");
		    }
        }
        
        // this step will cull the final set
    	try {
			for (String s : filterList) {
				File file = new File(deployDir.getCanonicalPath() + File.separatorChar + s);
				if (file.exists())
					fileHelper.deleteTree(file);
			}
 	    } catch (Exception e) {
	        e.printStackTrace();
	        System.err.println("Failed to filter folders.");
	    }       
        
        // now remove empty directories
    	try {
            File file = new File(deployDir.getCanonicalPath());
            fileHelper.deleteEmptyDirs(file);
 	    } catch (Exception e) {
	        e.printStackTrace();
	        System.err.println("Failed clean empty folders.");
	    }
       
	 }
}