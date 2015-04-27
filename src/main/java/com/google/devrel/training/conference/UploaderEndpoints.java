package com.google.devrel.training.conference;

import java.io.IOException;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.config.Named;

/**
 * Defines endpoint functions APIs.
 */
@Api(name = "uploaderendpoints", version = "v1",
scopes = {Constants.EMAIL_SCOPE },
        clientIds = {Constants.WEB_CLIENT_ID, Constants.API_EXPLORER_CLIENT_ID },
        description = "API for uploader endpoints.")

public class UploaderEndpoints {





    // Declare this method as a method available externally through Endpoints
    @ApiMethod(name = "uploadToCloud", path = "uploadToCloud",
            httpMethod = HttpMethod.POST)

    public UploaderClass uploadToCloud(@Named("name") String name, @Named("content") String content) throws ClassNotFoundException, IOException {
        return new UploaderClass(name, content, null);
    }
    
  //  @ApiMethod(name = "uploadToCloud", path = "uploadToCloud",
    //        httpMethod = HttpMethod.POST)
    //public UploaderClass uploadToCloud(@Named("name") String name, @Named("content") String content) throws ClassNotFoundException, IOException {
    //    return new UploaderClass(name, content, null);
   // }
    
    @ApiMethod(name ="download", path = "download", httpMethod = HttpMethod.POST)
    public UploaderClass download(@Named("name") String name, @Named("content") String content) throws ClassNotFoundException, IOException{
    return new UploaderClass(name, content, "1");
    }
    

}
