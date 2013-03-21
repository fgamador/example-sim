// Copyright 2002-2013, University of Colorado

/**
 * The Easel stage for this simulation.
 *grunt
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  "use strict";
  var Easel = require( 'easel' );
  var Inheritance = require( 'PHETCOMMON/util/Inheritance' );
  var ModelViewTransform2D = require( 'PHETCOMMON/view/ModelViewTransform2D' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Property = require( 'PHETCOMMON/model/property/Property' );
  var BarMagnetNode = require( 'view/BarMagnetNode' );

  function ExampleSimStage( imagesLoader, canvas, model ) {

    var that = this;

    Easel.Stage.call( this, canvas ); // constructor stealing

    this.enableMouseOver();
    Easel.Touch.enable( this, false, false );

    // At this window size, scaling is 1.
    var UNITY_WINDOW_SIZE = new Dimension2( 1024, 768 );

    // model-view transform
    var MVT_SCALE = 1;
    var MVT_OFFSET = new Vector2( 0, 0 ); // origin relative to rootContainer
    var mvt = new ModelViewTransform2D( MVT_SCALE, MVT_OFFSET );

    // canvas background
    var background = new Easel.Shape();

    // Nodes added to rootContainer will be scaled as the browser window is resized.
    var rootContainer = new Easel.Container();

    // bar magnet
    var barMagnetNode = new BarMagnetNode( imagesLoader.getImage( "barMagnet" ), model.barMagnet, mvt );

    // rendering order
    this.addChild( background );
    this.addChild( rootContainer );
    rootContainer.addChild( barMagnetNode );

    // window-resize handler
    var handleResize = function() {

      // get the window width
      var windowSize = new Dimension2( $( window ).width(), $( window ).height() );

      // make the canvas fill the window
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;

      // expand the background to fill the canvas
      background.graphics
          .beginFill( 'black' )
          .rect( 0, 0, canvas.width, canvas.height );

      // move the root node to the center of the canvas, so the origin remains at the center
      rootContainer.x = canvas.width / 2;
      rootContainer.y = canvas.height / 2;

      // isometric scaling
      var scale = Math.min( windowSize.width / UNITY_WINDOW_SIZE.width, windowSize.height / UNITY_WINDOW_SIZE.height );
      rootContainer.scaleX = scale;
      rootContainer.scaleY = scale;

      // force rendering update
      that.tick();
    };
    $( window ).resize( handleResize );
    handleResize(); // initial size
  }

  Inheritance.inheritPrototype( ExampleSimStage, Easel.Stage ); // prototype chaining

  ExampleSimStage.prototype.reset = function() {
    // If you need to reset anything when the "Reset All" button is pressed, add it here.
  };

  return ExampleSimStage;
} );
