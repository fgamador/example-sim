// Copyright 2013-2024, University of Colorado Boulder

/**
 * BallNode is the view for the ball. It is responsible for the visual representation of a ball,
 * and keeping that visual representation synchronized with a Ball instance.
 *
 * @author Franz Amador
 */

import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { DragListener, Image, Node } from '../../../../scenery/js/imports.js';
import exampleSim from '../../exampleSim.js';
import Ball from '../model/Ball.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type BallNodeOptions = SelfOptions & ShadedSphereNodeOptions;

export default class BallNode extends ShadedSphereNode {

  public constructor( ball: Ball, modelViewTransform: ModelViewTransform2, providedOptions?: BallNodeOptions ) {

    assert && assert( ball instanceof Ball, 'invalid ball' );
    assert && assert( modelViewTransform instanceof ModelViewTransform2, 'invalid modelViewTransform' );

    const options = optionize<BallNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      cursor: 'pointer',
      mainColor: 'yellow'
    }, providedOptions );

    super( modelViewTransform.modelToViewDeltaX( ball.diameterProperty ), options );

    // Move the ball by dragging it.
    this.addInputListener( new DragListener( {
      allowTouchSnag: true, // When dragging across it on a touch device, pick it up
      positionProperty: ball.positionProperty,
      transform: modelViewTransform
    } ) );

    ball.diameterProperty.link( diameter => {
      this.radius = diameter / 2;
    } );

    // Observe changes in model position, and move this Node to the new position in the view.
    // This Property exists for the lifetime of the simulation, so this listener does not need to be unlinked.
    ball.positionProperty.link( position => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    } );

    ball.visibleProperty.link( visible => {
      this.visible = visible;
    } );
  }
}

exampleSim.register( 'BallNode', BallNode );