function drawsta () {

	                   var n = 1, // number of layers
                       m = 7, // number of samples per layer
                       stack = d3.layout.stack(),
                       layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); })),
                       yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
                       yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
                       
                       var margin = {top: 20, right: 0, bottom: 20, left: 30},
                       width = 330 -  margin.left - margin.right,
                       height = width * 0.6;
    
    

    
                       var x = d3.scale.ordinal()
                       .domain(d3.range(m))
                       .rangeRoundBands([0, width], .3);
                       
                       var y = d3.scale.linear()
                       .domain([0, yStackMax])
                       .range([height, 0]);
                       
                       var color = d3.scale.linear()
                       .domain([0, n - 1])
                       .range(["#aad", "#556"]);
                       
                       var xAxis = d3.svg.axis()
                       .scale(x)
                       .tickSize(0) //x axis line weight
                       .tickPadding(6)
                       .orient("bottom");
    
                        var yAxis = d3.svg.axis()
                        .scale(y)
                        .tickSize(0)
                        .tickPadding(6)
                        .orient("left");
    
                       var svg = d3.select("#card1").append("svg")
                       .attr("width", width + margin.left + margin.right)
                       .attr("height", height + margin.top + margin.bottom)
                       .append("g")
                       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                       
                       var layer = svg.selectAll(".layer")
                       .data(layers)
                       .enter().append("g")
                       .attr("class", "layer")
                       .style("fill", function(d, i) { return color(i); });
                       
                       var rect = layer.selectAll("rect")
                       .data(function(d) { return d; })
                       .enter().append("rect")
                       .attr("x", function(d) { return x(d.x); })
                       .attr("y", height)
                       .attr("width", x.rangeBand())
                       .attr("height", 0);
                       
                       rect.transition()
                       .delay(function(d, i) { return i * 10; })
                       .attr("y", function(d) { return y(d.y0 + d.y); })
                       .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });
                       
                       svg.append("g")
//                       .attr("class", "x axis")    //x axis line
                       .attr("transform", "translate(0," + height + ")")
                       .call(xAxis);
    
                        svg.append("g")
//                        .attr("class", "y axis")   //draw y line
                        .attr("transform", "translate(0," + 0 + ")")
                        .call(yAxis);
    
                       d3.selectAll("input").on("change", change);
                       
                       var timeout = setTimeout(function() {
                                                d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
                                                }, 2000);
                       
                       function change() {
                       clearTimeout(timeout);
                       if (this.value === "grouped") transitionGrouped();
                       else transitionStacked();
                       }
                       
                       function transitionGrouped() {
                       y.domain([0, yGroupMax]);
                       
                       rect.transition()
                       .duration(500)
                       .delay(function(d, i) { return i * 10; })
                       .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
                       .attr("width", x.rangeBand() / n)
                       .transition()
                       .attr("y", function(d) { return y(d.y); })
                       .attr("height", function(d) { return height - y(d.y); });
                       }
                       
                       function transitionStacked() {
                       y.domain([0, yStackMax]);
                       
                       rect.transition()
                       .duration(500)
                       .delay(function(d, i) { return i * 10; })
                       .attr("y", function(d) { return y(d.y0 + d.y); })
                       .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
                       .transition()
                       .attr("x", function(d) { return x(d.x); })
                       .attr("width", x.rangeBand());
                       }
                       
                       // Inspired by Lee Byron's test data generator.
                       function bumpLayer(n, o) {
                       
                        function bump(a) {
                          var x = 1 / (.1 + Math.random()),
                              y = 2 * Math.random() - .5,
                              z = 10 / (.1 + Math.random());
                          for (var i = 0; i < n; i++) {
                            var w = (i / n - y) * z;
                            a[i] += x * Math.exp(-w * w);
                          }
                       }
                       
                       var a = [], i;
                       for (i = 0; i < n; ++i) a[i] = o;//+ o * Math.random();
                       for (i = 0; i < 5; ++i) bump(a);
                       return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
                      }

// var margin = {top: 20, right: 0, bottom: 20, left: 30},
//     width = 330 -  margin.left - margin.right,
//     height = width * 0.6;

// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1);

// var y = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10, "%");

// var svg = d3.select("#card1").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.tsv("data.tsv", type, function(error, data) {
//   if (error) throw error;

//   x.domain(data.map(function(d) { return d.letter; }));
//   y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);

//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Frequency");

//   svg.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(d.letter); })
//       .attr("width", x.rangeBand())
//       .attr("y", function(d) { return y(d.frequency); })
//       .attr("height", function(d) { return height - y(d.frequency); });
// });

// function type(d) {
//   d.frequency = +d.frequency;
//   return d;
// }

// alert("ss");
                       //--------------------------------

    
//-------------------------second chart------------------------------//
    
    
    var data = {
        lineChart : [
                     {
                     date  : '2006-02-22',
                     label : 'foo',
                     value : 950
                     },
                     {
                     date  : '2006-08-22',
                     label : 'bar',
                     value : 1000
                     },
                     {
                     date  : '2007-01-11',
                     label : 'baz',
                     value : 700
                     },
                     {
                     date  : '2008-10-01',
                     label : 'boing',
                     value : 534
                     },
                     {
                     date  : '2009-02-24',
                     label : 'loool',
                     value : 1423
                     },
                     {
                     date  : '2010-12-30',
                     label : 'YEAH',
                     value : 1222
                     },
                     {
                     date  : '2011-05-15',
                     label : 'Hurray',
                     value : 948
                     },
                     {
                     date  : '2012-04-02',
                     label : 'WTF',
                     value : 1938
                     },
                     {
                     date  : '2013-08-19',
                     label : 'OMG',
                     value : 1245
                     },
                     {
                     date  : '2013-11-11',
                     label : 'ROFL',
                     value : 888
                     }
                     ]
    };
    
    var DURATION = 1500;
    var DELAY    = 500;
    
    /**
     * draw the fancy line chart
     *
     * @param {String} elementId elementId
     * @param {Array}  data      data
     */
    function drawLineChart( elementId, data ) {
        // parse helper functions on top
        var parse = d3.time.format( '%Y-%m-%d' ).parse;
        // data manipulation first
        data = data.map( function( datum ) {
                        datum.date = parse( datum.date );
                        
                        return datum;
                        } );
        
        // TODO code duplication check how you can avoid that
        var containerEl = document.getElementById( elementId ),
        width       = containerEl.clientWidth,
        height      = width * 0.6,
        margin      = {
            top    : 30,
            right  : 10,
            left   : 10,
            bottom : 10.
        },
        
        detailWidth  = 98,
        detailHeight = 55,
        detailMargin = 10,
        
        container   = d3.select( containerEl ),
        svg         = container.select( 'svg' )
        .attr( 'width', width )
        .attr( 'height', height + margin.top ),
        
        x          = d3.time.scale().range( [ 0, width - detailWidth ] ),
        xAxis      = d3.svg.axis().scale( x )
        .ticks (4)
        .tickSize( 0 ),
        xAxisTicks = d3.svg.axis().scale( x )
        .ticks( 6 )
        .tickSize( 0 )
        .tickFormat( '' ),

        y          = d3.scale.linear().range( [height, 0] ),
        yAxis = d3.svg.axis().scale( y ).orient("right")
        .ticks ( 5 )
        .tickSize(-width),


                
        area = d3.svg.area()
        .interpolate( 'linear' )
        .x( function( d )  { return x( d.date ) + detailWidth / 2; } )
        .y0( height )
        .y1( function( d ) { return y( d.value ); } ),
        
        line = d3.svg.line()
        .interpolate( 'linear' )
        .x( function( d ) { return x( d.date ) + detailWidth / 2; } )
        .y( function( d ) { return y( d.value ); } ),
        
        startData = data.map( function( datum ) {
                             return {
                             date  : datum.date,
                             value : 0
                             };
                             } ),
        
        circleContainer;
        
        // Compute the minimum and maximum date, and the maximum price.
        x.domain( [ data[ 0 ].date, data[ data.length - 1 ].date ] );
        // hacky hacky hacky :(
        y.domain( [ 0, d3.max( data, function( d ) { return d.value; } ) + 700 ] );
        
        svg.append( 'g' )
        .attr( 'class', 'lineChart--xAxisTicks' )
        .attr( 'transform', 'translate(' + detailWidth / 2 + ',' + height + ')' )
        .call( xAxisTicks );
        
        svg.append( 'g' )
        .attr( 'class', 'lineChart--xAxis' )
        .attr( 'transform', 'translate(' + detailWidth / 2 + ',' + ( height + 7 ) + ')' )
        .call( xAxis );
        
        // svg.append( 'g' )
        // .attr( 'class', 'lineChart--yAxisTicks' )
        // //
        // // .attr( 'transform', 'translate(' - detailHeight / 2 + ',' + ( width + 7 ) + ')' )
        // .call( yAxisTicks );

        svg.append( 'g' )
        .attr( 'class', 'lineChart--yAxis' )
        // .attr("transform", "translate(0," + height + ")")
        // .attr( 'transform', 'translate(' - detailHeight / 2 + ',' + ( width + 7 ) + ')' )
        .call( yAxis )
      

      //   .append("text")
      // .attr("transform", "rotate(-90)")
      // .attr("y", 6)
      // .attr("dy", ".71em")
      // .style("text-anchor", "end")
      // .text("Price ($)");;
        
        // Add the line path.
        svg.append( 'path' )
        .datum( startData )
        .attr( 'class', 'lineChart--areaLine' )
        .attr( 'd', line )
        .transition()
        .duration( DURATION )
        .delay( DURATION / 2 )
        .attrTween( 'd', tween( data, line ) )
        .each( 'end', function() {
              drawCircles( data );
              } );
        
        
        // Add the area path.
        svg.append( 'path' )
        .datum( startData )
        .attr( 'class', 'lineChart--area' )
        .attr( 'd', area )
        .transition()
        .duration( DURATION )
        .attrTween( 'd', tween( data, area ) );
        
        // Helper functions!!!
        function drawCircle( datum, index ) {
            circleContainer.datum( datum )
            .append( 'circle' )
            .attr( 'class', 'lineChart--circle' )
            .attr( 'r', 0 )
            .attr(
                  'cx',
                  function( d ) {
                  return x( d.date ) + detailWidth / 2;
                  }
                  )
            .attr(
                  'cy',
                  function( d ) {
                  return y( d.value );
                  }
                  )
            .on( 'mouseenter', function( d ) {
                d3.select( this )
                .attr(
                      'class',
                      'lineChart--circle lineChart--circle__highlighted'
                      )
                .attr( 'r', 7 );
                
                d.active = true;
                
                showCircleDetail( d );
                } )
            .on( 'mouseout', function( d ) {
                d3.select( this )
                .attr(
                      'class',
                      'lineChart--circle'
                      )
                .attr( 'r', 6 );
                
                if ( d.active ) {
                hideCircleDetails();
                
                d.active = false;
                }
                } )
            .on( 'click touch', function( d ) {
                if ( d.active ) {
                showCircleDetail( d )
                } else {
                hideCircleDetails();
                }
                } )
            .transition()
            .delay( DURATION / 10 * index )
            .attr( 'r', 6 );
        }
        
        function drawCircles( data ) {
            circleContainer = svg.append( 'g' );
            
            data.forEach( function( datum, index ) {
                         drawCircle( datum, index );
                         } );
        }
        
        function hideCircleDetails() {
            circleContainer.selectAll( '.lineChart--bubble' )
            .remove();
        }
        
        function showCircleDetail( data ) {
            var details = circleContainer.append( 'g' )
            .attr( 'class', 'lineChart--bubble' )
            .attr(
                  'transform',
                  function() {
                  var result = 'translate(';
                  
                  result += x( data.date );
                  result += ', ';
                  result += y( data.value ) - detailHeight - detailMargin;
                  result += ')';
                  
                  return result;
                  }
                  );
            
            details.append( 'path' )
            .attr( 'd', 'M2.99990186,0 C1.34310181,0 0,1.34216977 0,2.99898218 L0,47.6680579 C0,49.32435 1.34136094,50.6670401 3.00074875,50.6670401 L44.4095996,50.6670401 C48.9775098,54.3898926 44.4672607,50.6057129 49,54.46875 C53.4190918,50.6962891 49.0050244,54.4362793 53.501875,50.6670401 L94.9943116,50.6670401 C96.6543075,50.6670401 98,49.3248703 98,47.6680579 L98,2.99898218 C98,1.34269006 96.651936,0 95.0000981,0 L2.99990186,0 Z M2.99990186,0' )
            .attr( 'width', detailWidth )
            .attr( 'height', detailHeight );
            
            var text = details.append( 'text' )
            .attr( 'class', 'lineChart--bubble--text' );
            
            text.append( 'tspan' )
            .attr( 'class', 'lineChart--bubble--label' )
            .attr( 'x', detailWidth / 2 )
            .attr( 'y', detailHeight / 3 )
            .attr( 'text-anchor', 'middle' )
            .text( data.label );
            
            text.append( 'tspan' )
            .attr( 'class', 'lineChart--bubble--value' )
            .attr( 'x', detailWidth / 2 )
            .attr( 'y', detailHeight / 4 * 3 )
            .attr( 'text-anchor', 'middle' )
            .text( data.value );
        }
        
        function tween( b, callback ) {
            return function( a ) {
                var i = d3.interpolateArray( a, b );
                
                return function( t ) {
                    return callback( i ( t ) );
                };
            };
        }
    }

    drawLineChart('lineChart', data.lineChart );

}
