package com.google.devrel.training.conference;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.google.appengine.tools.cloudstorage.GcsFilename;

public class Lister {
    public String message = "Downloading";

    
    public Lister (String name) throws IOException, ClassNotFoundException {
    	 GcsFilename filename = new GcsFilename("notepad-bucket-kobzar", name+".xml");
    	 Cloud example = new Cloud();
    	 byte[] byteContent = example.readFromFile(filename);
    	 String decoded = new String(byteContent, "UTF-8");
        this.message = (decoded);
    	}
    	

    public String getMessage() {
        return message;
    }
}
