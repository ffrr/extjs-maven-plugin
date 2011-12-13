package com.digmia.maven.plugin.extjsbuilder.util;

import java.io.File;
import java.io.FilenameFilter;
import java.util.Arrays;
import java.util.Collection;
import org.apache.commons.io.filefilter.IOFileFilter;

/**
 * Case-sensitive file name filter, which compares the file names with a list of allowed names.
 * @author fk
 */
public class FilenameListFilter implements IOFileFilter {

    private Collection<String> files;
    
    public FilenameListFilter(String... fileNames) {
        this.files = Arrays.asList(fileNames);
    }
    
    @Override
    public boolean accept(File file, String string) {
        return files.contains(file.getName());
    }

    @Override
    public boolean accept(File file) {
        return files.contains(file.getName());
    }
}
