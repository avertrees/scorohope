/*eslint-env node*/
/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
  app = express(),
  bluemix = require('./config/bluemix'),
  watson = require('watson-developer-cloud'),
  extend = require('util')._extend,
  Twit = require('twit');


// Bootstrap application settings
require('./config/express')(app);

// if bluemix credentials exists, then override local
var credentials = extend({
    version: 'v2',
    url: '<url>',
    username: '<username>',
    password: '<password>'
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

// Twitter connection variables
var tweet = new Twit({
    consumer_key: 'UzKo8x3QIxUalpkpaPP2EtJLq',
    consumer_secret: 'zCkAFFYPTyJp3nerjXPMUfBU4pwZEpdtBh50fxVvN6eKEdMP5b',
    access_token: '855910023658168321-O3bqZSIsSSirhg0uxTChFJV1sHmEt6v',
    access_token_secret: 'tCy7PzspG0FF100vAxjRojWRzsriDJGC5dtIJrj0gqRBc'
});

// Create the service wrapper
var personalityInsights = new watson.personality_insights(credentials);

// Render the Index page
app.get('/', function(req, res) {
  res.render('index');
});

// Ajax post for Twitter and Watson
app.post('/tweetInsights', function(req, res) {
    var query = req.body.id;
    var options;
    var tpath;
    var tpush;

    console.log("Got request for tweets");
    
    if(query.charAt(0)==='@'){
    	console.log("Handle to query is: " + query);
    	
    	options = {
        screen_name: query,
        count: 200,
        include_rts: false
        };
        
        tpath = 'statuses/user_timeline';
    	
    }
    else {
    	console.log("Term to query is: " + query);
    	
    	options = {
        q: query,
        lang: 'en',
        count: 300,
        };
        
        tpath = 'search/tweets';
    	
    }

    var tweets = [];

    // Send a get to the Twitter API to retrieve a specifice user's timeline
    tweet.get(tpath, options, function(err, data) {

        if (err) {
            console.log(err);
        }
        
        if(query.charAt(0)==='@'){
        	
        	// Loop through and add tweets to an array
        	for (var i = 0; i < data.length; i++) {
        		tweets.push(data[i].text);
        		}
        		
        } else {
        	
        	// Loop through and add tweets to an array
        	for (var i = 0; i<data.statuses.length; i++){
        		tweets.push(data.statuses[i].text);
        	}
        }

        console.log("Returning tweets");
        var insightsData = tweets.join(' ');
        
        console.log(insightsData);

        console.log("Request received for Personality Insights...");

        personalityInsights.profile({
            text: insightsData
        }, function(err, profile) {
            if (err) {
                console.log('error:', err);
                return res.json({t: err, p: err});
            } else {
            	console.log("Personality acquired.")
                //console.log(JSON.stringify(profile, null, 2));
                //console.log(tweets);
                return res.json({
                    t: tweets,
                    p: profile
                });
            }

        }); // End personalityinsights.profile	

    }); // End tweet.get   


}); // End app.post


var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
