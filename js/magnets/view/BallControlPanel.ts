// Copyright 2024, University of Colorado Boulder

/**
 * BallControlPanel is a panel that contains controls for the ball.
 *
 * @author Franz Amador
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Range from '../../../../dot/js/Range.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import exampleSim from '../../exampleSim.js';
import ExampleSimStrings from '../../ExampleSimStrings.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type BallControlPanelOptions = SelfOptions & PanelOptions;

export default class BallControlPanel extends Panel {

  /**
   * @param {MagnetsModel} model - the model for the entire screen
   * @param {Object} [options] - options for the control panel, see Panel.js for options
   */
  public constructor( model: MagnetsModel, providedOptions: BallControlPanelOptions ) {

    // Demonstrate a common pattern for specifying options and providing default values
    const options = optionize<BallControlPanelOptions, SelfOptions, PanelOptions>()( {

      // Default values for optional PanelOptions
      xMargin: 10,
      yMargin: 10,
      stroke: 'orange',
      lineWidth: 3
    }, providedOptions );

    // 'Ball Controls' title
    const ballControlsTitleNode = new Text( ExampleSimStrings.ballControlsStringProperty, {
      font: new PhetFont( {
        size: 18,
        weight: 'bold'
      } )
    } );

    const showBallCheckbox = new Checkbox( model.ball.visibleProperty, new Text( ExampleSimStrings.showBallStringProperty, {
      font: new PhetFont( 16 )
    } ), {
    } );

    const range = new Range( 0, 100 );
    const ballDiameterSlider = new HSlider( model.ball.diameterProperty, range, {
      labelContent: 'Ball Diameter',
    } );

    // The contents of the control panel
    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        ballControlsTitleNode,
        showBallCheckbox,
        ballDiameterSlider
      ]
    } );

    super( content, options );
  }
}

exampleSim.register( 'BallControlPanel', BallControlPanel );