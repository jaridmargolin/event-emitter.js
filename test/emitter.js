/*!
 * test/event-emitter.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'sinon',
  'event-emitter'
], function (assert, sinon, EventEmitter) {


/* -----------------------------------------------------------------------------
 * scope
 * ---------------------------------------------------------------------------*/

var handler1 = function () {},
    handler2 = function () {};

var context1 = { name: 1 },
    context2 = { name: 2 };


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('event-emitter.js', function () {

  /* ---------------------------------------------------------------------------
   * constructor
   * -------------------------------------------------------------------------*/

  describe('constructor', function () {

    it('Should add empty events store to instance.', function () {
      var emitter = new EventEmitter();
      assert.deepEqual(emitter.events, {});
    });

  });


  /* ---------------------------------------------------------------------------
   * on
   * -------------------------------------------------------------------------*/

  describe('on', function () {

    it('Should create an entry in events store with event name as key.', function () {
      var emitter = new EventEmitter();
      emitter.on('test', handler1);

      assert.ok(emitter.events['test']);
    });

    it('Should add event handler object to begining of the event subscriber array.', function () {
      var emitter = new EventEmitter();
      emitter.on('test', handler1, context1);
      emitter.on('test', handler2, context2);

      assert.deepEqual(emitter.events['test'][1], {
        fn: handler1,
        context: context1
      });
      assert.deepEqual(emitter.events['test'][0], {
        fn: handler2,
        context: context2
      });
    });

  });


  /* ---------------------------------------------------------------------------
   * off
   * -------------------------------------------------------------------------*/

  describe('off', function () {

    it('Should remove all events if no name is passed.', function () {
      var emitter = new EventEmitter();
      emitter.on('test', handler1, context1);
      emitter.on('test2', handler1, context1);
      emitter.off();

      assert.notOk(emitter.events['test']);
      assert.notOk(emitter.events['test2']);
    });

    it('Should remove all event handlers if no handler is passed.', function () {
      var emitter = new EventEmitter();
      emitter.on('test', handler1, context1);
      emitter.on('test', handler2, context2);
      emitter.on('test2', handler2, context2);
      emitter.off('test');

      assert.notOk(emitter.events['test']);
      assert.ok(emitter.events['test2']);
    });

    it('Should remove specific handler.', function () {
      var emitter = new EventEmitter();
      emitter.on('test', handler1, context1);
      emitter.on('test', handler2, context2);
      emitter.off('test', handler1);

      assert.deepEqual(emitter.events['test'][0], {
        fn: handler2,
        context: context2
      });

      assert.equal(emitter.events['test'].length, 1);
    });

  });


  /* ---------------------------------------------------------------------------
   * trigger
   * -------------------------------------------------------------------------*/

  describe('trigger', function () {

    it('Should call all handlers subscribed to event.', function () {
      var spy1 = sinon.spy(),
          spy2 = sinon.spy();

      var emitter = new EventEmitter();
      emitter.on('test', spy1);
      emitter.on('test', spy2);
      emitter.trigger('test');

      assert.ok(spy1.calledOnce);
      assert.ok(spy2.calledOnce);
    });

    it('Should call handlers with the passed context.', function () {
      var context = {};
      var handler = function () {
        assert.equal(this, context);
      };

      var emitter = new EventEmitter();
      emitter.on('test', handler, context);
      emitter.trigger('test');
    });

    it('Should not throw error if all listeners are removed while looping.', function () {
      var emitter = new EventEmitter();

      emitter.on('test', function () { emitter.off('test'); });
      emitter.on('test', function () {});
      emitter.trigger('test');
    });

    it('Should execute listeners removed during loop.', function () {
      var emitter = new EventEmitter();
      var handler1 = sinon.spy(function () { emitter.off('test', handler2); });
      var handler2 = sinon.spy(function () {});

      emitter.on('test', handler1);
      emitter.on('test', handler2);
      emitter.trigger('test');

      assert.isTrue(handler1.calledOnce);
      assert.isTrue(handler2.calledOnce);
    });

  });


});


});