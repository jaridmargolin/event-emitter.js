/*!
 * test/_umd.js
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

describe('umd - event-emitter.js', function () {

  it('Should create a new instance.', function () {
    var emitter = new EventEmitter();
    assert.isInstanceOf(emitter, EventEmitter);
  });

});


});