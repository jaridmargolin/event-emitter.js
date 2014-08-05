/*!
 * emitter.js
 * 
 * Copyright (c) 2014
 */


define(function () {


// ----------------------------------------------------------------------------
// Scope vars
// ----------------------------------------------------------------------------

var root = this;


// ----------------------------------------------------------------------------
// Emitter
// ----------------------------------------------------------------------------

var Emitter = function () {
  this.events = {};
};

//
// Add Event.
//
Emitter.prototype.on = function (name, handler, context) {
  (this.events[name] = this.events[name] || []).unshift({
    fn: handler,
    context: context || root
  });

  return this;
};

//
// Remove event.
//
Emitter.prototype.off = function (name, handler) {
  // Remove all events
  if (!name) {
    this.events = {};

  // Remove all handlers for events
  } else if (!handler) {
    delete this.events[name];

  // Remove specific handler for event
  } else {
    this._loopSubscribers(name, function (subscribers, i) {
      if (subscribers[i] === handler)  {
        subscribers.splice(i, 1);
      }
    });
  }

  return this;
};

//
// Calls handler for all event subscribers.
//
Emitter.prototype.trigger = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);

  this._loopSubscribers(name, function (subscribers, i) {
    var handler = subscribers[i];
    handler.fn.apply(handler.context, args);
  });

  return this;
};

//
//
//
Emitter.prototype._loopSubscribers = function (name, fn) {
  var subscribers = this.events[name] || [],
      l = subscribers.length;

  while (l--) {
    fn(subscribers, l);
  }
};


// ----------------------------------------------------------------------------
// Expose
// ----------------------------------------------------------------------------

return Emitter;


});