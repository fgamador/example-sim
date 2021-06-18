// Copyright 2013-2020, University of Colorado Boulder

/**
 * ParticlesModel is the top-level model for the 'Particles' screen. You can think of the top-level model as a container
 * for all of the pieces that make up the model for a screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import exampleSim from '../../exampleSim.js';
import Particle from './Particle.js';

// constants
const GRAVITY = new Vector2( 0, 0.2 );
const INITIAL_X = 500;
const INITIAL_Y = 20;

class ParticlesModel {

  constructor() {

    // @public {Particle[]} the complete set of particles
    this.particles = [];

    // @public Notifies listeners when a Particle is added.
    this.particleAddedEmitter = new Emitter( {
      parameters: [ { valueType: Particle } ]
    } );

    // @public Notifies listeners when a Particle is removed.
    this.particleRemovedEmitter = new Emitter( {
      parameters: [ { valueType: Particle } ]
    } );

    // @public Whether the model is advanced on each call to step.
    this.isPlayingProperty = new BooleanProperty( true );
  }

  /**
   * Resets the model to its initial state. This method is called when the simulation's "Reset All" button is pressed.
   * @public
   */
  reset() {
    while ( this.particles.length > 0 ) {
      this.removeParticle( this.particles[ this.particles.length - 1 ] );
    }
  }

  /**
   * Steps the model each time the clock ticks.
   * @param {number} dt - time step, in seconds
   * @public
   */
  step( dt ) {
    if ( this.isPlayingProperty.value ) {
      this.stepOnce();
    }
  }

  /**
   * Steps the model one step. Called directly when using the step button of the time control.
   * @public
   */
  stepOnce() {

    // Create some new particles
    for ( let i = 0; i < 3; i++ ) {
      const particle = new Particle( INITIAL_X, INITIAL_Y );
      this.particles.push( particle );
      this.particleAddedEmitter.emit( particle );
    }

    // Apply a force to all particles, resulting in motion.
    this.particles.forEach( particle => {
      particle.applyForce( GRAVITY );
    } );

    // Remove particles that have exceeded their lifespan.
    this.particles.forEach( particle => {
      if ( particle.hasExceededLifespan() ) {
        this.removeParticle( particle );
      }
    } );
  }

  /**
   * Removes a particle.
   * @param {Particle} particle
   * @private
   */
  removeParticle( particle ) {
    this.particles.splice( this.particles.indexOf( particle ), 1 );
    this.particleRemovedEmitter.emit( particle );
    particle.dispose();
  }
}

exampleSim.register( 'ParticlesModel', ParticlesModel );
export default ParticlesModel;