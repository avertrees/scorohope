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
$(document).ready(function() {

    var widgetId = 'vizcontainer', // Must match the ID in index.jade
        widgetWidth = 700,
        widgetHeight = 700, // Default width and height
        personImageUrl = 'images/app.png'; // Can be blank

    // Jquery variables
    var $content = $('.content'),
        $loading = $('.loading'),
        $error = $('.error'),
        $errorMsg = $('.errorMsg'),
        $traits = $('.traits'),
        $results = $('.results');
    var userhash = "@";

    /**
     * Clear the "textArea"
     */
    $('.clear-btn').click(function() {
        $('.clear-btn').blur();
        $content.val('');
    });

    /**
     * Grab the user from the URL and or set to null if not passed from the Twitter bot
     */
    userhash = userhash + getURLVariable("user");
    console.log(userhash);
    if (userhash !== "" && userhash != false) {
    	userhash = '@'+userhash;
    	handleRequest(userhash);
    }

    /**
     * 1. Create the request
     * 2. Call the API
     * 3. Call the methods to display the results
     */
    $('.analysis-btn').click(function() {
        userhash = $("#userhash").val();
        
        handleRequest(userhash);
    }); // End analysis-btn click


    function handleRequest(userhash) {
        $('.analysis-btn').blur();
        $loading.show();
        $error.hide();
        $traits.hide();
        $results.hide();

        // Log out the request with the userhash 
        console.log("Sending request for tweets for " + userhash);
        
        // Update personality-hdr header with userhash
        $("#personality-hdr").html("Personality Profile*: "+ userhash);


        // Post to the server to get tweets
        $.post('/tweetInsights', {
            id: userhash
        }, function(data) {
            $loading.hide();

            var tweets = data.t;
            var insights = data.p;
            var tweet;
            $('#tweets').empty();

            if (insights.error) {
                showError(insights.error);
            } else {
                $results.show();
                showTraits(insights);
                showTextSummary(insights);
                showVizualization(insights);
                
                // Loop through and add tweets to page
                for (var i = 0; i < tweets.length; i++) {
                    tweet = tweets[i];
                	
                	$('#tweets').append('<p>'+tweet+'</p>');
                	
                }
            }

        }); // End post		

    } // End handleRequest function

    /**
     * Display an error or a default message
     * @param  {String} error The error
     */
    function showError(error) {
        var defaultErrorMsg = 'Error processing the request, please try again later.';
        $error.show();
        $errorMsg.text(error || defaultErrorMsg);
    }

    /**
     * Displays the traits received from the
     * Personality Insights API in a table,
     * just trait names and values.
     */
    function showTraits(data) {
        console.log('Displaying traits...');
        $traits.show();

        var traitList = flatten(data.tree),
            table = $traits;

        table.empty();

        // Header
        $('#header-template').clone().appendTo(table);

        // For each trait
        for (var i = 0; i < traitList.length; i++) {
            var elem = traitList[i];

            var Klass = 'row';
            Klass += (elem.title) ? ' model_title' : ' model_trait';
            Klass += (elem.value === '') ? ' model_name' : '';

            if (elem.value !== '') { // Trait child name
                $('#trait-template').clone()
                    .attr('class', Klass)
                    .find('.tname')
                    .find('span').html(elem.id).end()
                    .end()
                    .find('.tvalue')
                    .find('span').html(elem.value === '' ? '' : (elem.value + ' (± ' + elem.sampling_error + ')'))
                    .end()
                    .end()
                    .appendTo(table);
            } else {
                // Model name
                $('#model-template').clone()
                    .attr('class', Klass)
                    .find('.col-lg-12')
                    .find('span').html(elem.id).end()
                    .end()
                    .appendTo(table);
            }
        }
    }

    /**
     * Construct a text representation for big5 traits crossing, facets and
     * values.
     */
    function showTextSummary(data) {
        console.log('showTextSummary()');
        var paragraphs = [
            assembleTraits(data.tree.children[0]),
            assembleFacets(data.tree.children[0]),
            assembleValues(data.tree.children[2])
        ];
        var div = $('.summary-div');
        div.empty();
        paragraphs.forEach(function(sentences) {
            $('<p></p>').text(sentences.join(' ')).appendTo(div);
        });
    }

    /**
     * Renders the sunburst visualization. The parameter is the tree as returned
     * from the Personality Insights JSON API.
     * It uses the arguments widgetId, widgetWidth, widgetHeight and personImageUrl
     * declared on top of this script.
     */
    function showVizualization(theProfile) {
        console.log('showVizualization()');

        $('#' + widgetId).empty();
        var d3vis = d3.select('#' + widgetId).append('svg:svg');
        var widget = {
            d3vis: d3vis,
            data: theProfile,
            loadingDiv: 'dummy',
            switchState: function() {
                console.log('[switchState]');
            },
            _layout: function() {
                console.log('[_layout]');
            },
            showTooltip: function() {
                console.log('[showTooltip]');
            },
            id: 'SystemUWidget',
            COLOR_PALLETTE: ['#1b6ba2', '#488436', '#d52829', '#F53B0C', '#972a6b', '#8c564b', '#dddddd'],
            expandAll: function() {
                this.vis.selectAll('g').each(function() {
                    var g = d3.select(this);
                    if (g.datum().parent && // Isn't the root g object.
                        g.datum().parent.parent && // Isn't the feature trait.
                        g.datum().parent.parent.parent) { // Isn't the feature dominant trait.
                        g.attr('visibility', 'visible');
                    }
                });
            },
            collapseAll: function() {
                this.vis.selectAll('g').each(function() {
                    var g = d3.select(this);
                    if (g.datum().parent !== null && // Isn't the root g object.
                        g.datum().parent.parent !== null && // Isn't the feature trait.
                        g.datum().parent.parent.parent !== null) { // Isn't the feature dominant trait.
                        g.attr('visibility', 'hidden');
                    }
                });
            },
            addPersonImage: function(url) {
                if (!this.vis || !url) {
                    return;
                }
                var icon_defs = this.vis.append('defs');
                var width = this.dimW,
                    height = this.dimH;

                // The flower had a radius of 640 / 1.9 = 336.84 in the original, now is 3.2.
                var radius = Math.min(width, height) / 16.58; // For 640 / 1.9 -> r = 65
                var scaled_w = radius * 2.46; // r = 65 -> w = 160

                var id = 'user_icon_' + this.id;
                icon_defs.append('pattern')
                    .attr('id', id)
                    .attr('height', 1)
                    .attr('width', 1)
                    .attr('patternUnits', 'objectBoundingBox')
                    .append('image')
                    .attr('width', scaled_w)
                    .attr('height', scaled_w)
                    .attr('x', radius - scaled_w / 2) // r = 65 -> x = -25
                    .attr('y', radius - scaled_w / 2)
                    .attr('xlink:href', url)
                    .attr('opacity', 1.0)
                    .on('dblclick.zoom', null);
                this.vis.append('circle')
                    .attr('r', radius)
                    .attr('stroke-width', 0)
                    .attr('fill', 'url(#' + id + ')');
            }
        };

        widget.dimH = widgetHeight;
        widget.dimW = widgetWidth;
        widget.d3vis.attr('width', widget.dimW).attr('height', widget.dimH);
        widget.d3vis.attr('viewBox', "0 0 " + widget.dimW + ", " + widget.dimH);
        renderChart.call(widget);
        widget.expandAll.call(widget);
        if (personImageUrl)
            widget.addPersonImage.call(widget, personImageUrl);
    }

    /**
     * Returns a 'flattened' version of the traits tree, to display it as a list
     * @return array of {id:string, title:boolean, value:string} objects
     */
    function flatten( /*object*/ tree) {
        var arr = [],
            f = function(t, level) {
                if (!t) return;
                if (level > 0 && (!t.children || level !== 2)) {
                    arr.push({
                        'id': t.name,
                        'title': t.children ? true : false,
                        'value': (typeof(t.percentage) !== 'undefined') ? Math.floor(t.percentage * 100) + '%' : '',
                        'sampling_error': (typeof(t.sampling_error) !== 'undefined') ? Math.floor(t.sampling_error * 100) + '%' : ''
                    });
                }
                if (t.children && t.id !== 'sbh') {
                    for (var i = 0; i < t.children.length; i++) {
                        f(t.children[i], level + 1);
                    }
                }
            };
        f(tree, 0);
        return arr;
    }

    /**
     * Function to get the userhash from the URL
     */
    function getURLVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

});