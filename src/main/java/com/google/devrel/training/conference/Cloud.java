package com.google.devrel.training.conference;
import com.google.appengine.tools.cloudstorage.GcsFileOptions;
import com.google.appengine.tools.cloudstorage.GcsFilename;
import com.google.appengine.tools.cloudstorage.GcsInputChannel;
import com.google.appengine.tools.cloudstorage.GcsOutputChannel;
import com.google.appengine.tools.cloudstorage.GcsService;
import com.google.appengine.tools.cloudstorage.GcsServiceFactory;
import com.google.appengine.tools.cloudstorage.RetryParams;
//import com.google.appengine.tools.development.testing.LocalBlobstoreServiceTestConfig;
//import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
//import com.google.appengine.tools.development.testing.LocalServiceTestHelper;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
/**
 * A main method to show how to use the GCS client locally.
 *
 */
public class Cloud {

  /**
   * Use this to make the library run locally as opposed to in a deployed servlet.
   */
  //LocalServiceTestHelper helper = new LocalServiceTestHelper(
   //   new LocalBlobstoreServiceTestConfig(), new LocalDatastoreServiceTestConfig());

  /**
   * This is the service from which all requests are initiated.
   * The retry and exponential backoff settings are configured here.
   */
  private final GcsService gcsService =
      GcsServiceFactory.createGcsService(RetryParams.getDefaultInstance());

  /**
   * Writes the provided object to the specified file using Java serialization. One could use
   * this same technique to write many objects, or with another format such as Json or XML or just a
   * DataOutputStream.
   *
   * Notice at the end closing the ObjectOutputStream is not done in a finally block.
   * See below for why.
   */
  void writeObjectToFile(GcsFilename fileName, Object content) throws IOException {
    GcsOutputChannel outputChannel =
        gcsService.createOrReplace(fileName, GcsFileOptions.getDefaultInstance());
    @SuppressWarnings("resource")
    ObjectOutputStream oout =
        new ObjectOutputStream(Channels.newOutputStream(outputChannel));
    oout.writeObject(content);
    oout.close();
  }

  /**
   * Writes the byte array to the specified file. Note that the close at the end is not in a
   * finally.This is intentional. Because the file only exists for reading if close is called, if
   * there is an exception thrown while writing the file won't ever exist. (This way there is no
   * need to worry about cleaning up partly written files)
   */
  void writeToFile(GcsFilename fileName, byte[] content) throws IOException {
    @SuppressWarnings("resource")
    GcsOutputChannel outputChannel =
        gcsService.createOrReplace(fileName, GcsFileOptions.getDefaultInstance());
    outputChannel.write(ByteBuffer.wrap(content));
    outputChannel.close();
  }

  /**
   * Reads an object from the specified file using Java serialization. One could use this same
   * technique to read many objects, or with another format such as Json or XML or just a
   * DataInputStream.
   *
   * The final parameter to openPrefetchingReadChannel is a buffer size. It will attempt to buffer
   * the input by at least this many bytes. (This must be at least 1kb and less than 10mb) If
   * buffering is undesirable openReadChannel could be called instead, which is totally unbuffered.
   */
  Object readObjectFromFile(GcsFilename fileName)
      throws IOException, ClassNotFoundException {
    GcsInputChannel readChannel = gcsService.openPrefetchingReadChannel(fileName, 0, 1024 * 1024);
    try (ObjectInputStream oin = new ObjectInputStream(Channels.newInputStream(readChannel))) {
      return oin.readObject();
    }
  }

  /**
   * Reads the contents of an entire file and returns it as a byte array. This works by first
   * requesting the length, and then fetching the whole file in a single call. (Because it calls
   * openReadChannel instead of openPrefetchingReadChannel there is no buffering, and thus there is
   * no need to wrap the read call in a loop)
   *
   * This is really only a good idea for small files. Large files should be streamed out using the
   * prefetchingReadChannel and processed incrementally.
   */
  byte[] readFromFile(GcsFilename fileName) throws IOException {
    int fileSize = (int) gcsService.getMetadata(fileName).getLength();
    ByteBuffer result = ByteBuffer.allocate(fileSize);
    try (GcsInputChannel readChannel = gcsService.openReadChannel(fileName, 0)) {
      readChannel.read(result);
    }
    return result.array();
  }

  /**
   * Writes a map to GCS and then reads it back printing the result to standard out.
   * Then does the same for a byte array.
   * (You may wish to suppress stderr as there is a lot of noise)
   */
 // public static void main(String[] args) throws IOException, ClassNotFoundException {
 //  LocalExample example = new LocalExample();
  //  example.helper.setUp();
  //  try {
      /** Write and read back a map */
   //   GcsFilename filename = new GcsFilename("MyBucket", "foo");
   //   Map<String, String> mapContent = new HashMap<>();
    //  mapContent.put("foo", "bar");

    //  example.writeObjectToFile(filename, mapContent);

    //  System.out.println("Wrote " + mapContent + " read: " + example.readObjectFromFile(filename));

      /** Write and read back a byteArray */
     // byte[] byteContent = new byte[] {1, 2, 3, 4, 5};

     // example.writeToFile(filename, byteContent);

     // System.out.println("Wrote " + Arrays.toString(byteContent) + " read: "
     //     + Arrays.toString(example.readFromFile(filename)));
   // } finally {
   //   example.helper.tearDown();
   // }
 // }
}