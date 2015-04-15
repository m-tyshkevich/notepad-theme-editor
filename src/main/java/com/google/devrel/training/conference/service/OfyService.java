package com.google.devrel.training.conference.service;

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;


public class OfyService {
    
    public static Objectify ofy() {
        return ObjectifyService.ofy();
    }
   
    public static ObjectifyFactory factory() {
        return ObjectifyService.factory();
    }
}
