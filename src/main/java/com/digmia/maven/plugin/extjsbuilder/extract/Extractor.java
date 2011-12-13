package com.digmia.maven.plugin.extjsbuilder.extract;

import com.digmia.maven.plugin.extjsbuilder.JsClass;
import com.digmia.maven.plugin.extjsbuilder.extract.DefaultRegexBasedExtractor.ExtractionError;
import java.util.List;

/**
 *
 * @author fk
 */
public interface Extractor {
    public List<String> extractDependencies(JsClass klass) throws ExtractionError;
}
