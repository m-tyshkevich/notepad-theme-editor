package com.google.devrel.training.conference;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.google.appengine.tools.cloudstorage.GcsFilename;

public class UploaderClass {
    public String message = "This message should never display. You done messed up.";

    
    public UploaderClass (String name, String content, String placeholder) throws IOException, ClassNotFoundException {
    	if(placeholder==null){
    		this.message = ("File named "+name+" has been uploaded to the cloud");
    		Cloud example = new Cloud();
    		try {
    		      /** Write and read back a map */
    		      GcsFilename filename = new GcsFilename("notepad-bucket-kobzar", (name+".txt"));
    		    //  Map<String, String> mapContent = new HashMap<>();
    		    //  mapContent.put(name, content);

    		    //  example.writeObjectToFile(filename, mapContent);

    		      /** Write and read back a byteArray */
    		      byte[] byteContent = content.getBytes(Charset.forName("UTF-8"));

    		      example.writeToFile(filename, byteContent);
    		      
    		      filename = new GcsFilename("notepad-bucket-kobzar", ("ThemeList.xml"));
    		      byte[] bytest = example.readFromFile(filename);
    		    	 String decoded = new String(bytest, "UTF-8");
    		    	 
    		      
    		      decoded = decoded + name + "|";
    		      byteContent = decoded.getBytes(Charset.forName("UTF-8"));

    		      example.writeToFile(filename, byteContent);
    			    }
    		 finally {
    		   //   example.helper.tearDown();
    		    }
    		
    	}
    	else{
        //this.message = ("Your download should start now (actually not)");
    	}
    	}

    public String getMessage() {
        return message;
    }
}
