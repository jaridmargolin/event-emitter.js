/*!
 * test/_amd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'event-emitter/event-emitter'
], function (assert, sinon, EventEmitter) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('amd - event-emitter.js', function () {

  it('Should create a new instance.', function () {
    var emitter = new EventEmitter();
    assert.isInstanceOf(emitter, EventEmitter);
  });

});


});