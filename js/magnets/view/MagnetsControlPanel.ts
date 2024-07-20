// Copyright 2013-2024, University of Colorado Boulder

/**
 * MagnetsControlPanel is a panel that contains controls for magnets.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import exampleSim from '../../exampleSim.js';
import ExampleSimStrings from '../../ExampleSimStrings.js';
import optionize from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MagnetsControlPanelOptions = SelfOptions & PanelOptions;

export default class MagnetsControlPanel extends Panel {

  /**
   * @param {MagnetsModel} model - the model for the entire screen
   * @param {Object} [options] - options for the control panel, see Panel.js for options
   */
  public constructor( model: MagnetsModel, providedOptions: MagnetsControlPanelOptions ) {

    // Demonstrate a common pattern for specifying options and providing default values
    const options = optionize<MagnetsControlPanelOptions, SelfOptions, PanelOptions>()( {

      // Default values for optional PanelOptions
      xMargin: 10,
      yMargin: 10,
      stroke: 'orange',
      lineWidth: 3
    }, providedOptions );

    // 'Magnet Controls' title
    const magnetControlsTitleNode = new Text( ExampleSimStrings.magnetControlsStringProperty, {
      font: new PhetFont( {
        size: 18,
        weight: 'bold'
      } )
    } );

    // 'Flip Polarity' button
    const flipPolarityButton = new RectangularPushButton( {
      content: new Text( ExampleSimStrings.flipPolarityStringProperty, {
        font: new PhetFont( 16 )
      } ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: () => {
        const orientation = model.barMagnet.orientationProperty.get() + Math.PI;
        model.barMagnet.orientationProperty.set( orientation );
        model.barMagnet2.orientationProperty.set( orientation );
      }
    } );

    const showBallCheckbox = new Checkbox( model.ball.visibleProperty, new Text( ExampleSimStrings.showBallStringProperty, {
      font: new PhetFont( 16 )
    } ), {
    } );

    // The contents of the control panel
    const content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        magnetControlsTitleNode,
        flipPolarityButton,
        showBallCheckbox
      ]
    } );

    super( content, options );
  }
}

exampleSim.register( 'MagnetsControlPanel', MagnetsControlPanel );