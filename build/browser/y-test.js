(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestConnector;

TestConnector = (function() {
  function TestConnector(_at_id) {
    var options;
    this.id = _at_id;
    options = {
      syncMethod: "syncAll",
      role: "slave",
      user_id: this.id,
      perform_send_again: false
    };
    this.on_bound_to_y = (function(_this) {
      return function() {
        _this.init(options);
        _this.execution_order = [];
        _this.receive_buffer = {};
        return _this.receive_handlers.push(function(user, message) {
          return _this.execution_order.push(message);
        });
      };
    })(this);
  }

  TestConnector.prototype.join = function(conn) {
    var c, cid, _ref, _results;
    if (this.connections[conn.id] == null) {
      this.connections[conn.id] = {
        conn: conn
      };
      this.userJoined(conn.id, "slave");
      conn.join(this);
      this.flushAll();
      conn.flushAll();
      this.flushAll();
      conn.flushAll();
      _ref = conn.connections;
      _results = [];
      for (cid in _ref) {
        c = _ref[cid];
        if (this.connections[cid] == null) {
          _results.push(this.join(c.conn));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  TestConnector.prototype.getOpsInExecutionOrder = function() {
    return this.execution_order;
  };

  TestConnector.prototype.send = function(uid, message) {
    var rb, _name;
    if ((message.sync_step != null) && false) {
      return this.receiveMessage(uid, message);
    } else {
      rb = this.connections[uid].conn.receive_buffer;
      if (rb[_name = this.id] == null) {
        rb[_name] = [];
      }
      return rb[this.id].push(message);
    }
  };

  TestConnector.prototype.broadcast = function(message) {
    var c, name, _ref, _results;
    _ref = this.connections;
    _results = [];
    for (name in _ref) {
      c = _ref[name];
      _results.push(this.send(name, message));
    }
    return _results;
  };

  TestConnector.prototype.flushOne = function(uid) {
    var message, _ref;
    if (((_ref = this.receive_buffer[uid]) != null ? _ref.length : void 0) > 0) {
      message = this.receive_buffer[uid].shift();
      return this.receiveMessage(uid, message);
    }
  };

  TestConnector.prototype.flushOneRandom = function() {
    var c, cid, connlist, i;
    connlist = (function() {
      var _ref, _results;
      _ref = this.receive_buffer;
      _results = [];
      for (cid in _ref) {
        c = _ref[cid];
        _results.push(cid);
      }
      return _results;
    }).call(this);
    i = Math.ceil(Math.random() * connlist.length - 0.5);
    return this.flushOne(connlist[i]);
  };

  TestConnector.prototype.flushAll = function() {
    var message, messages, n, _i, _len, _ref;
    _ref = this.receive_buffer;
    for (n in _ref) {
      messages = _ref[n];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        this.receiveMessage(n, message);
      }
    }
    return this.receive_buffer = {};
  };

  return TestConnector;

})();

if (typeof window !== "undefined" && window !== null) {
  if (typeof Y === "undefined" || Y === null) {
    throw new Error("You must import Y first!");
  } else {
    window.Y.TestConnector = TestConnector;
  }
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = TestConnector;
}



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NvZGlvL3dvcmtzcGFjZS95LXRlc3Qvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvY29kaW8vd29ya3NwYWNlL3ktdGVzdC9saWIveS10ZXN0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0lBLElBQUEsYUFBQTs7QUFBQTtBQUtlLEVBQUEsdUJBQUMsTUFBRCxHQUFBO0FBQ1gsUUFBQSxPQUFBO0FBQUEsSUFEWSxJQUFDLENBQUEsS0FBRCxNQUNaLENBQUE7QUFBQSxJQUFBLE9BQUEsR0FDRTtBQUFBLE1BQUEsVUFBQSxFQUFhLFNBQWI7QUFBQSxNQUNBLElBQUEsRUFBTyxPQURQO0FBQUEsTUFFQSxPQUFBLEVBQVMsSUFBQyxDQUFBLEVBRlY7QUFBQSxNQUdBLGtCQUFBLEVBQW9CLEtBSHBCO0tBREYsQ0FBQTtBQUFBLElBTUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTthQUFBLFNBQUEsR0FBQTtBQUNmLFFBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxPQUFOLENBQUEsQ0FBQTtBQUFBLFFBSUEsS0FBQyxDQUFBLGVBQUQsR0FBbUIsRUFKbkIsQ0FBQTtBQUFBLFFBTUEsS0FBQyxDQUFBLGNBQUQsR0FBa0IsRUFObEIsQ0FBQTtlQVFBLEtBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxJQUFsQixDQUF1QixTQUFDLElBQUQsRUFBTyxPQUFQLEdBQUE7aUJBQ3JCLEtBQUMsQ0FBQSxlQUFlLENBQUMsSUFBakIsQ0FBc0IsT0FBdEIsRUFEcUI7UUFBQSxDQUF2QixFQVRlO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FOakIsQ0FEVztFQUFBLENBQWI7O0FBQUEsMEJBb0JBLElBQUEsR0FBTSxTQUFDLElBQUQsR0FBQTtBQUNKLFFBQUEsc0JBQUE7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QUFBQSxPQURGO0FBQUEsS0FBQTtXQUlBLElBQUMsQ0FBQSxjQUFELEdBQWtCLEdBTFY7RUFBQSxDQTlFVixDQUFBOzt1QkFBQTs7SUFMRixDQUFBOztBQTJGQSxJQUFHLGdEQUFIO0FBQ0UsRUFBQSxJQUFPLHNDQUFQO0FBQ0UsVUFBVSxJQUFBLEtBQUEsQ0FBTywwQkFBUCxDQUFWLENBREY7R0FBQSxNQUFBO0FBR0UsSUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQVQsR0FBeUIsYUFBekIsQ0FIRjtHQURGO0NBM0ZBOztBQWlHQSxJQUFHLGdEQUFIO0FBQ0UsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQUFqQixDQURGO0NBakdBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuI1xuIyBBIHRyaXZpYWwgQ29ubmVjdG9yIHRoYXQgc2ltdWxhdGVzIG5ldHdvcmsgZGVsYXkuXG4jXG5jbGFzcyBUZXN0Q29ubmVjdG9yXG5cbiAgI1xuICAjIEBwYXJhbSBpZCB7U3RyaW5nfSBTb21lIHVuaXF1ZSBpZFxuICAjXG4gIGNvbnN0cnVjdG9yOiAoQGlkKS0+XG4gICAgb3B0aW9ucyA9XG4gICAgICBzeW5jTWV0aG9kOiBcInN5bmNBbGxcIlxuICAgICAgcm9sZTogXCJzbGF2ZVwiXG4gICAgICB1c2VyX2lkOiBAaWQgIyBUT0RPOiBmb3Igbm93LCB3ZSBzYXZlIHRoZSB1c2VyX2lkIHVuZGVyIEBpZCBBTkQgQHVzZXJfaWQsIGJ1dCBjaGFuZ2UgdGhpcyBsYXRlci4uXG4gICAgICBwZXJmb3JtX3NlbmRfYWdhaW46IGZhbHNlXG5cbiAgICBAb25fYm91bmRfdG9feSA9ICgpPT5cbiAgICAgIEBpbml0IG9wdGlvbnNcblxuICAgICAgIyBJZiB5b3UgdGhpbmsgb2Ygb3BlcmF0aW9ucywgdGhpcyB3aWxsIG1pcnJvciB0aGVcbiAgICAgICMgZXhlY2l0b24gb3JkZXIgb2Ygb3BlcmF0aW9ucyAod2hlbiBhIG1lc3NhZ2UgaXMgc2VuZCwgb3IgcmVjZWl2ZWQgaXQgaXMgcHV0IGludG8gdGhpcylcbiAgICAgIEBleGVjdXRpb25fb3JkZXIgPSBbXVxuICAgICAgIyBUaGUgbWVzc2FnZXMgYXJlIGJ1ZmZlcmVkIHVuZGVyIHRoZSBuYW1lIG9mIHRlaCBzZW5kaW5nIHVzZXIuXG4gICAgICBAcmVjZWl2ZV9idWZmZXIgPSB7fVxuXG4gICAgICBAcmVjZWl2ZV9oYW5kbGVycy5wdXNoICh1c2VyLCBtZXNzYWdlKT0+XG4gICAgICAgIEBleGVjdXRpb25fb3JkZXIucHVzaCBtZXNzYWdlXG5cbiAgIyBqb2luIGFub3RoZXIgdXNlciBjb25uZWN0b3JcbiAgam9pbjogKGNvbm4pLT5cbiAgICBpZiBub3QgQGNvbm5lY3Rpb25zW2Nvbm4uaWRdP1xuICAgICAgQGNvbm5lY3Rpb25zW2Nvbm4uaWRdID0ge2Nvbm4gOiBjb25ufVxuICAgICAgQHVzZXJKb2luZWQgY29ubi5pZCwgXCJzbGF2ZVwiXG4gICAgICBjb25uLmpvaW4gQFxuICAgICAgQGZsdXNoQWxsKClcbiAgICAgIGNvbm4uZmx1c2hBbGwoKVxuICAgICAgQGZsdXNoQWxsKClcbiAgICAgIGNvbm4uZmx1c2hBbGwoKVxuICAgICAgZm9yIGNpZCxjIG9mIGNvbm4uY29ubmVjdGlvbnNcbiAgICAgICAgaWYgbm90IEBjb25uZWN0aW9uc1tjaWRdP1xuICAgICAgICAgIEBqb2luIGMuY29ublxuXG5cblxuICAjXG4gICMgR2V0IHRoZSBvcHMgaW4gdGhlIGV4ZWN1dGlvbiBvcmRlci5cbiAgI1xuICBnZXRPcHNJbkV4ZWN1dGlvbk9yZGVyOiAoKS0+XG4gICAgQGV4ZWN1dGlvbl9vcmRlclxuXG4gICNcbiAgIyBTZW5kIGEgbWVzc2FnZSB0byBhbm90aGVyIHBlZXJcbiAgIyBAcGFyYW0ge09wZXJhdGlvbn0gbyBUaGUgb3BlcmF0aW9uIHRoYXQgd2FzIGV4ZWN1dGVkLlxuICAjXG4gIHNlbmQ6ICh1aWQsIG1lc3NhZ2UpLT5cbiAgICBpZiBtZXNzYWdlLnN5bmNfc3RlcD8gYW5kIGZhbHNlICMgVE9ETzogZmFsc2VcbiAgICAgIEByZWNlaXZlTWVzc2FnZSB1aWQsIG1lc3NhZ2VcbiAgICBlbHNlXG4gICAgICByYiA9IEBjb25uZWN0aW9uc1t1aWRdLmNvbm4ucmVjZWl2ZV9idWZmZXJcbiAgICAgIHJiW0BpZF0gPz0gW11cbiAgICAgIHJiW0BpZF0ucHVzaCBtZXNzYWdlXG5cbiAgYnJvYWRjYXN0OiAobWVzc2FnZSktPlxuICAgIGZvciBuYW1lLCBjIG9mIEBjb25uZWN0aW9uc1xuICAgICAgQHNlbmQgbmFtZSwgbWVzc2FnZVxuXG4gICNcbiAgIyBGbHVzaCBvbmUgb3BlcmF0aW9uIGZyb20gdGhlIGxpbmUgb2YgYSBzcGVjaWZpYyB1c2VyLlxuICAjXG4gIGZsdXNoT25lOiAodWlkKS0+XG4gICAgaWYgQHJlY2VpdmVfYnVmZmVyW3VpZF0/Lmxlbmd0aCA+IDBcbiAgICAgIG1lc3NhZ2UgPSBAcmVjZWl2ZV9idWZmZXJbdWlkXS5zaGlmdCgpXG4gICAgICBAcmVjZWl2ZU1lc3NhZ2UodWlkLCBtZXNzYWdlKVxuXG5cbiAgI1xuICAjIEZsdXNoIG9uZSBvcGVyYXRpb24gb24gYSByYW5kb20gbGluZS5cbiAgI1xuICBmbHVzaE9uZVJhbmRvbTogKCktPlxuICAgIGNvbm5saXN0ID0gZm9yIGNpZCxjIG9mIEByZWNlaXZlX2J1ZmZlclxuICAgICAgY2lkXG4gICAgaSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpKmNvbm5saXN0Lmxlbmd0aC0wLjUpXG4gICAgQGZsdXNoT25lIGNvbm5saXN0W2ldXG5cbiAgI1xuICAjIEZsdXNoIGFsbCBvcGVyYXRpb25zIG9uIGV2ZXJ5IGxpbmUuXG4gICNcbiAgZmx1c2hBbGw6ICgpLT5cbiAgICBmb3IgbixtZXNzYWdlcyBvZiBAcmVjZWl2ZV9idWZmZXJcbiAgICAgIGZvciBtZXNzYWdlIGluIG1lc3NhZ2VzXG4gICAgICAgIEByZWNlaXZlTWVzc2FnZShuLCBtZXNzYWdlKVxuXG4gICAgQHJlY2VpdmVfYnVmZmVyID0ge31cblxuXG5pZiB3aW5kb3c/XG4gIGlmIG5vdCBZP1xuICAgIHRocm93IG5ldyBFcnJvciBcIllvdSBtdXN0IGltcG9ydCBZIGZpcnN0IVwiXG4gIGVsc2VcbiAgICB3aW5kb3cuWS5UZXN0Q29ubmVjdG9yID0gVGVzdENvbm5lY3RvclxuXG5pZiBtb2R1bGU/XG4gIG1vZHVsZS5leHBvcnRzID0gVGVzdENvbm5lY3RvclxuIl19
