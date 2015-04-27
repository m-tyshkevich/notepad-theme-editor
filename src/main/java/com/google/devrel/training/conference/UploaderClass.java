package com.google.devrel.training.conference;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.google.appengine.tools.cloudstorage.GcsFilename;

public class UploaderClass {
    public String message = "Downloading";

    
    public UploaderClass (String name, String content, String placeholder) throws IOException, ClassNotFoundException {
    	if(placeholder==null){
    		this.message = ("File named "+name+" has been uploaded to the cloud");
    		Cloud example = new Cloud();
    		try {
    		      /** Write and read back a map */
    		      GcsFilename filename = new GcsFilename("notepad-bucket-kobzar", (name+".xml"));
    		    //  Map<String, String> mapContent = new HashMap<>();
    		    //  mapContent.put(name, content);

    		    //  example.writeObjectToFile(filename, mapContent);

    		    //  System.out.println("Wrote " + mapContent + " read: " + example.readObjectFromFile(filename));

    		      /** Write and read back a byteArray */
    		      byte[] byteContent = content.getBytes(Charset.forName("UTF-8"));

    		      example.writeToFile(filename, byteContent);

    		    //  System.out.println("Wrote " + Arrays.toString(byteContent) + " read: "
    		      //    + Arrays.toString(example.readFromFile(filename)));
    		    }
    		 finally {
    		   //   example.helper.tearDown();
    		    }
    		
    	}
    	else{
        this.message = ("Your download should start now (actually not)");
    	}
    	}

    public String getMessage() {
        return message;
    }
}
