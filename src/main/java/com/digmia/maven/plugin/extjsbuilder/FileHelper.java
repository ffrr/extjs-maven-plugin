package com.digmia.maven.plugin.extjsbuilder;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Collection;
import java.util.Vector;
import java.util.regex.Pattern;

// changing to non-static type class
//   is because adding last BOM member make potentially thread safe
//   one instance of this class per thread, each thread using its own instance only

public class FileHelper {
	
	public boolean verbose = false;
	public boolean debug = false;
	public String encoding = null;

	public int lastBOM = 0;
	public int lastSizeBOM = 0;
	public String lastENC = null;
	
	public boolean lastWinLE = false;
	public boolean lastUnixLE = false;
	public int lastStride = 1;
	
	public String sysEncoding = null;
	
	private byte[] fileCopyBuf = null;
	
    private static long tstart = 0;
	static long taccum = 0; 
    public static void tstart() {
        tstart = System.currentTimeMillis();	
    }
    public static long tstop() {
        return taccum += (System.currentTimeMillis() - tstart);	
    }

    
	FileHelper(boolean verbose, boolean debug, String encoding) {
		this.verbose = verbose;
		this.debug = debug;
		this.encoding = ("".equals(encoding)) ? null : encoding;		// only enforced on copyFile, rest is manual
		
	    sysEncoding = new java.io.OutputStreamWriter(new java.io.ByteArrayOutputStream()).getEncoding();
		System.out.println("System default encoding is " + sysEncoding + ".");		
	}
	
	// BOM and encoding helpers, yes these look ugly... nmf  --Beeaar
	public byte[] getBufEnc(byte[] a) {
		return getBufEnc(a, 0);
	}
	public byte[] getBufEnc(byte[] a, int i) {
		lastENC = null;
		lastBOM = lastSizeBOM = 0;
		if (a==null) return a;		
		
		int x=a[i]&0xFF, y=a[i+1]&0xFF, z=a[i+2]&0xFF; i=0;
		if ( (x==0xFE && y==0xFF) || (x==0xFF && y==0xFE) ||		// utf 16 BE or LE
				(x==0xEF && y==0xBB && z==0xBF) )					// utf 8
			i += (x==0xEF) ? 3 : 2;									// mark bytes to skip
        
        if (i > 0) {												// found BOM
        	lastSizeBOM = i;
        	lastBOM = x<<16 + y<<8 + z;
        	lastENC = (i==3) ? "UTF-8" : (x==0xFE) ? "UTF-16BE" : "UTF-16LE";
        	if (verbose) {
        		System.out.println("Detected BOM: " + Integer.toHexString(lastBOM) + " " + lastENC);		
        	}
        } else {													// scan bytes for clues
        	if (x==0 && y!=0)		lastENC = "UTF-16BE";			// after testing for BOM, we don't care if its ascii or utf8
        	else if (x!=0 && y==0)	lastENC = "UTF-16LE";			//   is the same for us, so long as the compressor only gets valid ascii
        }															// if compressor gets other than valid chars it throws exception

        return a;
	}
    public String toString(byte[] a) {
    	String s = null;
		if (a==null) return null;		
		try {
    		getBufEnc(a);
    		s = new String(a, lastSizeBOM, a.length - lastSizeBOM, (lastENC==null) ? sysEncoding : lastENC);
		} catch (Exception e) {	e.printStackTrace(); }
    	return s; 
	}
    public byte[] toBuf(String s, String enc) {
    	byte[] a = null;
		if (s==null) return null;		
		try {
   			a = s.getBytes( (enc==null) ? sysEncoding : enc );
    	} catch (Exception e) { e.printStackTrace(); }
    	return a; 
	}
    public byte[] transCode(byte[] a, String enc) {
		a = getBufEnc(a);								// seed the buffer encoding values
  	  	if (enc != null && !enc.equals(lastENC)) {
  	  		if (debug) System.out.println("Transcode detected: " + enc + " from " + ((lastENC==null) ? sysEncoding : lastENC));		
        	lastBOM = lastSizeBOM = 0;					// clear the bom size for the buffer, if you dont want this cleared, save or do toString toBuf manually
   			a = toBuf(toString(a), enc);				// this converts from its natural encoding to java utf16, then back to forced encoding
  	  	}
  	  	return a;
    }
    // this scans the whole file, this is inherently slow
    //   and no, regex path would order of magnitude slower
    //   the problem is that the JS files have gotten so big in general
    // the added stride correction has nearly no negative performance impact, btw.  i tested
    // also taking out the both w and u true short circuit is slower on the Ext dist 
    //   there are lots of files in the Ext dist with mixed LE
    public byte[] getBufLE(byte[] a, int length) {
    	boolean w = false, u = false;
    	int i=0, o=1, al=length;
	  	for (i=((0==a[0])?0:1); i<al && a[i++]==0; o++); lastStride=o;	// test for utf16 or utf32 etc.. stride is o
    	for (i=0; i < al && !(w && u); i++) {
        	while (i < al && a[i]!='\n') i++;
    		if (i>(o-1) && a[i-o]=='\r') w = true; else u = true;
    	}
    	lastWinLE = w; lastUnixLE = u;
    	return a;
    }
    public byte[] getBufLE(byte[] a) {
    	return getBufLE(a, a.length);
    }
    // ironically line-endings are one of the most code intensive
    //   this should work on utf16 etc.. now
    public byte[] transCodeLE(byte[] a, int length, boolean isUnix) {
		a = getBufLE(a);											// seed the buffer encoding values
		boolean e=isUnix, w = lastWinLE, u = lastUnixLE;
    	if (!(e && w) && !(!e && u)) return a;						// to unix, has windows || to win, has unix
 	  	if (debug)	System.out.println("Transcode detected: unix=" + isUnix + " from unix=" + lastUnixLE + " win=" + lastWinLE + "");		
 	  	
    	int i=0, j=0, o=lastStride, al=length;
 		if (!e) for (i=0,j=0; i<al; i++)							// if going to winLE
  			if (a[i]=='\n') j++;	  								//   count '\n' to ensure capacity
  		byte[] b = new byte[al+j*o+1];
  		for (i=0,j=0; i < al; j++) {
  			for (; i < al && '\n'!=(b[j++]=a[i++]); );
			j--; if (e && '\r'==b[j-o]) b[j-=o]='\n';				// unix, overwrite the \r with \n and assume next char \n overwritten or clipped
  			else if (!e && b[j]=='\n' && '\r'!=b[j-o]) { b[j]='\r'; b[j+=o]='\n'; }
  		}
  		
  		a = new byte[j];
 	  	System.arraycopy(b,0,a,0,j);
    	return a;
    }

 	
	// a lot of code for all this, but for sure a very short version of this kind of thing
	public byte[] readFile(File file) throws IOException {
    	FileInputStream in = null;
    	byte a[] = null;
		try {
	        in = new FileInputStream(file);
	        byte[] bt = new byte[(int)file.length()];
	        in.read(bt);
	        a = bt;
		} finally {
			try { if (in != null) in.close(); } catch(Exception e) { /* dont care */ };
		}
        return a;
    }
    public String readFileToString(File file) throws IOException {
    	return toString(readFile(file)); 
	}


    public void writeFile(byte[] a, int offset, int length, File file, Boolean append) throws IOException {
    	FileOutputStream fw = null;
        try {
			fw = new FileOutputStream(file, append);			
			fw.write(a, offset, Math.min(length, a.length));
        } finally {
            try { if (fw!=null) fw.flush(); } catch(Exception e) { /* dont care */ }
            try { if (fw!=null) fw.close(); } catch(Exception e) { /* dont care */ }
        }
    }
    public void writeFile(byte[] a, File file, Boolean append, int sizeBOM) throws IOException {
    	if (!append) sizeBOM = 0;
		writeFile(a, sizeBOM, a.length-sizeBOM, file, append);
    }
    public void writeFile(byte[] a, File file, Boolean append) throws IOException {
       	writeFile(a, 0, a.length, file, append);
    }
    public void writeFileText(byte[] a, String tarENC, File file, Boolean append) throws IOException {
       	writeFile(transCode(a, tarENC), file, append);
    }
    public void writeStringToFile(String s, String tarENC, File file, Boolean append) throws IOException {
    	writeFile(toBuf(s, tarENC), file, append);
    }

    // ... and the big end all be all copy
    //  still need to add support for mixed line-endings, which the normal stream readers would handle
    //    but they would screw up the encoding  
    public void copyFileText(File from, File to, boolean append, String forceEncoding) throws IOException {
   	  	String enc = (forceEncoding==null) ? encoding : forceEncoding;
   		byte[] a = readFile(from);
   	  	a = (enc == null) ? getBufEnc(a) : transCode(a, enc);		// seed the buffer encoding values or do transCode which will implicitly seed for appends from the caller
   	  	writeFile(a, to, append, lastSizeBOM);						// implicitly skips the BOMs on append or encoding, transCode will sero out the lastSizeBOM if it actually does a transCode
    }
    public void copyFile(File from, File to) throws IOException {    	
		int len;
    	FileInputStream in = null;
    	FileOutputStream out = null;
		try { 
	    	in = new FileInputStream(from);
	    	out = new FileOutputStream(to);
			byte[] buf = (fileCopyBuf!=null) ? fileCopyBuf :
				(fileCopyBuf = new byte[1024*16]);
			while ((len = in.read(buf)) > 0)
				out.write(buf, 0, len);
		} finally {
			try { if (out != null) out.close(); } catch (Exception e) { /* don't care */ }
			try { if (in != null) in.close(); } catch (Exception e) {/* don't care */ }
		}
    }

    
    public String getExtention(String name) {
		String s = null;		
		int i = name.lastIndexOf('.');						// needs to search from the right end
		if (i > 0) s = name.substring(i);					// needs to be aware of files that start with '.'	
		return s;
    }
    public String insertFileSuffix(String name, String suffix) throws Exception {
        int i = name.lastIndexOf(".");
        if (i == -1) {
        	// this technically should never happen, because this is only called when ther is a known extention
        	//   however this really isnt an exception, its ok for files to nto have an extention
        	// 	 also a new try catch frame is expensive
        	throw new Exception("No period in the target file output.");
        }
        return name.substring(0, i) + suffix + name.substring(i);
    }

    //http://www.java-tips.org/java-se-tips/java.io/how-to-copy-a-directory-from-one-location-to-another-loc.html
    public void copyDirectory(File sourceLocation , File targetLocation, final String regExPattern) throws IOException {        
        if (sourceLocation.isDirectory()) {
            if (!targetLocation.exists()) {
                targetLocation.mkdir();
            }
            
            String[] children = sourceLocation.list(new FilenameFilter() {
                        private Pattern pattern = Pattern.compile(regExPattern);
                        public boolean accept(File dir, String name) {
                            File newFile = new File(dir.getAbsolutePath() + File.separatorChar + name);
                            Boolean isSvn = (newFile.getAbsolutePath().indexOf(".svn") != -1);
                            Boolean isHidden = newFile.isHidden();
                            Boolean isDir = newFile.isDirectory();
                            Boolean matches = pattern.matcher(name).matches();
                            if (isSvn || isHidden) {
                                return false;
                            } else if (isDir) {
                                return true;
                            } else {
                                return matches;
                            }                            
                        }                            
                });
            
            for (int i=0; i<children.length; i++) {
                copyDirectory(new File(sourceLocation, children[i]),
                        new File(targetLocation, children[i]), regExPattern);
            }
        } else {
            Boolean isSvn = (sourceLocation.getAbsolutePath().indexOf(".svn") != -1);
            Boolean isHidden = sourceLocation.isHidden();
            if (isSvn || isHidden) {
                return;
            } 
            
            tstart();
            copyFile(sourceLocation, targetLocation);            
            tstop();
        }
    }
    public File[] listFilesAsArray(File directory, FilenameFilter filter, boolean recurse) {
            Collection<File> files = listFiles(directory, filter, recurse);
            
            File[] arr = new File[files.size()];
            return files.toArray(arr);
    }
    
    public Collection<File> listFiles(File directory, FilenameFilter filter, boolean recurse) {
        Vector<File> files = new Vector<File>();

        // Get files / directories in the directory
        File[] entries = directory.listFiles();
        
        // Go over entries
        for (File entry : entries) {
            // If there is no filter or the filter accepts the 
            // file / directory, add it to the list
            if (filter == null || filter.accept(directory, entry.getName())) {
                files.add(entry);
            }
            
            // If the file is a directory and the recurse flag
            // is set, recurse into the directory
            if (recurse && entry.isDirectory()) {
                files.addAll(listFiles(entry, filter, recurse));
            }
        }	
        // Return collection of files
        return files;		
    }
    
    void deleteTree(File f) throws IOException { 
		if (f.isDirectory()) {
			for (File c : f.listFiles())
				deleteTree(c);
		}
		if (!f.delete()) throw new FileNotFoundException("Failed to delete file: " + f);
    }
    
    void deleteEmptyDirs(File f) throws IOException { 
		if (f.isDirectory()) {
			for (File c : f.listFiles())
				if (f.isDirectory()) deleteEmptyDirs(c);
			if (f.listFiles().length == 0 && !f.delete())
				throw new FileNotFoundException("Failed to delete file: " + f);
		}
    } 

}
