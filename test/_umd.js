/*!
 * test/_umd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'emitter/emitter'
], function (assert, sinon, Emitter) {


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('umd - emitter.js', function () {

  it('Should create a new instance.', function () {
    var emitter = new Emitter();
    assert.isInstanceOf(emitter, Emitter);
  });

});


});