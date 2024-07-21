/**
 * Ball is the model of a ball. The ball has fixed diameter and mutable position.
 *
 * @author Franz Amador
 */

import Property from '../../../../axon/js/Property.js';
import TModel from '../../../../joist/js/TModel.js';
import exampleSim from '../../exampleSim.js';

export default class Ball implements TModel {

  diameterProperty: Property<number>;
  positionProperty: Property<Vector2>;
  visibleProperty: Property<boolean>;

  public constructor( diameter: number, position: Vector2 ) {
    this.diameterProperty = new Property( diameter );
    this.positionProperty = new Property( position );
    this.visibleProperty = new Property( true );
  }

  public reset(): void {
    this.diameterProperty.reset();
    this.positionProperty.reset();
    this.visibleProperty.reset();
  }
}

exampleSim.register( 'Ball', Ball );