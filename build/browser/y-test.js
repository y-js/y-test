(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestConnector;

TestConnector = (function() {
  function TestConnector(id) {
    var options;
    this.id = id;
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
    var c, cid, ref, results;
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
      ref = conn.connections;
      results = [];
      for (cid in ref) {
        c = ref[cid];
        if (this.connections[cid] == null) {
          results.push(this.join(c.conn));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  TestConnector.prototype.getOpsInExecutionOrder = function() {
    return this.execution_order;
  };

  TestConnector.prototype.send = function(uid, message) {
    var name1, rb;
    if ((message.sync_step != null) && false) {
      return this.receiveMessage(uid, message);
    } else {
      rb = this.connections[uid].conn.receive_buffer;
      if (rb[name1 = this.id] == null) {
        rb[name1] = [];
      }
      return rb[this.id].push(message);
    }
  };

  TestConnector.prototype.broadcast = function(message) {
    var c, name, ref, results;
    ref = this.connections;
    results = [];
    for (name in ref) {
      c = ref[name];
      results.push(this.send(name, message));
    }
    return results;
  };

  TestConnector.prototype.flushOne = function(uid) {
    var message, ref;
    if (((ref = this.receive_buffer[uid]) != null ? ref.length : void 0) > 0) {
      message = this.receive_buffer[uid].shift();
      return this.receiveMessage(uid, message);
    }
  };

  TestConnector.prototype.flushOneRandom = function() {
    var c, cid, connlist, i;
    connlist = (function() {
      var ref, results;
      ref = this.receive_buffer;
      results = [];
      for (cid in ref) {
        c = ref[cid];
        results.push(cid);
      }
      return results;
    }).call(this);
    i = Math.ceil(Math.random() * connlist.length - 0.5);
    return this.flushOne(connlist[i]);
  };

  TestConnector.prototype.flushAll = function() {
    var j, len, message, messages, n, ref;
    ref = this.receive_buffer;
    for (n in ref) {
      messages = ref[n];
      for (j = 0, len = messages.length; j < len; j++) {
        message = messages[j];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2Rtb25hZC9naXQveS10ZXN0L25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL2Rtb25hZC9naXQveS10ZXN0L2xpYi95LXRlc3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDSUEsSUFBQSxhQUFBOztBQUFBO0FBS2UsRUFBQSx1QkFBQyxFQUFELEdBQUE7QUFDWCxRQUFBLE9BQUE7QUFBQSxJQURZLElBQUMsQ0FBQSxLQUFELEVBQ1osQ0FBQTtBQUFBLElBQUEsT0FBQSxHQUNFO0FBQUEsTUFBQSxVQUFBLEVBQVksU0FBWjtBQUFBLE1BQ0EsSUFBQSxFQUFNLE9BRE47QUFBQSxNQUVBLE9BQUEsRUFBUyxJQUFDLENBQUEsRUFGVjtBQUFBLE1BR0Esa0JBQUEsRUFBb0IsS0FIcEI7S0FERixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsYUFBRCxHQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO0FBQ2YsUUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNLE9BQU4sQ0FBQSxDQUFBO0FBQUEsUUFJQSxLQUFDLENBQUEsZUFBRCxHQUFtQixFQUpuQixDQUFBO0FBQUEsUUFNQSxLQUFDLENBQUEsY0FBRCxHQUFrQixFQU5sQixDQUFBO2VBUUEsS0FBQyxDQUFBLGdCQUFnQixDQUFDLElBQWxCLENBQXVCLFNBQUMsSUFBRCxFQUFPLE9BQVAsR0FBQTtpQkFDckIsS0FBQyxDQUFBLGVBQWUsQ0FBQyxJQUFqQixDQUFzQixPQUF0QixFQURxQjtRQUFBLENBQXZCLEVBVGU7TUFBQSxFQUFBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQU5qQixDQURXO0VBQUEsQ0FBYjs7QUFBQSwwQkFvQkEsSUFBQSxHQUFNLFNBQUMsSUFBRCxHQUFBO0FBQ0osUUFBQSxvQkFBQTtBQUFBLElBQUEs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QUFBQSxLQUFBO1dBSUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsR0FMVjtFQUFBLENBOUVWLENBQUE7O3VCQUFBOztJQUxGLENBQUE7O0FBMkZBLElBQUcsZ0RBQUg7QUFDRSxFQUFBLElBQU8sc0NBQVA7QUFDRSxVQUFVLElBQUEsS0FBQSxDQUFNLDBCQUFOLENBQVYsQ0FERjtHQUFBLE1BQUE7QUFHRSxJQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBVCxHQUF5QixhQUF6QixDQUhGO0dBREY7Q0EzRkE7O0FBaUdBLElBQUcsZ0RBQUg7QUFDRSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGFBQWpCLENBREY7Q0FqR0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4jXG4jIEEgdHJpdmlhbCBDb25uZWN0b3IgdGhhdCBzaW11bGF0ZXMgbmV0d29yayBkZWxheS5cbiNcbmNsYXNzIFRlc3RDb25uZWN0b3JcblxuICAjXG4gICMgQHBhcmFtIGlkIHtTdHJpbmd9IFNvbWUgdW5pcXVlIGlkXG4gICNcbiAgY29uc3RydWN0b3I6IChAaWQpLT5cbiAgICBvcHRpb25zID1cbiAgICAgIHN5bmNNZXRob2Q6IFwic3luY0FsbFwiXG4gICAgICByb2xlOiBcInNsYXZlXCJcbiAgICAgIHVzZXJfaWQ6IEBpZCAjIFRPRE86IGZvciBub3csIHdlIHNhdmUgdGhlIHVzZXJfaWQgdW5kZXIgQGlkIEFORCBAdXNlcl9pZCwgYnV0IGNoYW5nZSB0aGlzIGxhdGVyLi5cbiAgICAgIHBlcmZvcm1fc2VuZF9hZ2FpbjogZmFsc2VcblxuICAgIEBvbl9ib3VuZF90b195ID0gKCk9PlxuICAgICAgQGluaXQgb3B0aW9uc1xuXG4gICAgICAjIElmIHlvdSB0aGluayBvZiBvcGVyYXRpb25zLCB0aGlzIHdpbGwgbWlycm9yIHRoZVxuICAgICAgIyBleGVjaXRvbiBvcmRlciBvZiBvcGVyYXRpb25zICh3aGVuIGEgbWVzc2FnZSBpcyBzZW5kLCBvciByZWNlaXZlZCBpdCBpcyBwdXQgaW50byB0aGlzKVxuICAgICAgQGV4ZWN1dGlvbl9vcmRlciA9IFtdXG4gICAgICAjIFRoZSBtZXNzYWdlcyBhcmUgYnVmZmVyZWQgdW5kZXIgdGhlIG5hbWUgb2YgdGVoIHNlbmRpbmcgdXNlci5cbiAgICAgIEByZWNlaXZlX2J1ZmZlciA9IHt9XG5cbiAgICAgIEByZWNlaXZlX2hhbmRsZXJzLnB1c2ggKHVzZXIsIG1lc3NhZ2UpPT5cbiAgICAgICAgQGV4ZWN1dGlvbl9vcmRlci5wdXNoIG1lc3NhZ2VcblxuICAjIGpvaW4gYW5vdGhlciB1c2VyIGNvbm5lY3RvclxuICBqb2luOiAoY29ubiktPlxuICAgIGlmIG5vdCBAY29ubmVjdGlvbnNbY29ubi5pZF0/XG4gICAgICBAY29ubmVjdGlvbnNbY29ubi5pZF0gPSB7Y29ubiA6IGNvbm59XG4gICAgICBAdXNlckpvaW5lZCBjb25uLmlkLCBcInNsYXZlXCJcbiAgICAgIGNvbm4uam9pbiBAXG4gICAgICBAZmx1c2hBbGwoKVxuICAgICAgY29ubi5mbHVzaEFsbCgpXG4gICAgICBAZmx1c2hBbGwoKVxuICAgICAgY29ubi5mbHVzaEFsbCgpXG4gICAgICBmb3IgY2lkLGMgb2YgY29ubi5jb25uZWN0aW9uc1xuICAgICAgICBpZiBub3QgQGNvbm5lY3Rpb25zW2NpZF0/XG4gICAgICAgICAgQGpvaW4gYy5jb25uXG5cblxuXG4gICNcbiAgIyBHZXQgdGhlIG9wcyBpbiB0aGUgZXhlY3V0aW9uIG9yZGVyLlxuICAjXG4gIGdldE9wc0luRXhlY3V0aW9uT3JkZXI6ICgpLT5cbiAgICBAZXhlY3V0aW9uX29yZGVyXG5cbiAgI1xuICAjIFNlbmQgYSBtZXNzYWdlIHRvIGFub3RoZXIgcGVlclxuICAjIEBwYXJhbSB7T3BlcmF0aW9ufSBvIFRoZSBvcGVyYXRpb24gdGhhdCB3YXMgZXhlY3V0ZWQuXG4gICNcbiAgc2VuZDogKHVpZCwgbWVzc2FnZSktPlxuICAgIGlmIG1lc3NhZ2Uuc3luY19zdGVwPyBhbmQgZmFsc2UgIyBUT0RPOiBmYWxzZVxuICAgICAgQHJlY2VpdmVNZXNzYWdlIHVpZCwgbWVzc2FnZVxuICAgIGVsc2VcbiAgICAgIHJiID0gQGNvbm5lY3Rpb25zW3VpZF0uY29ubi5yZWNlaXZlX2J1ZmZlclxuICAgICAgcmJbQGlkXSA/PSBbXVxuICAgICAgcmJbQGlkXS5wdXNoIG1lc3NhZ2VcblxuICBicm9hZGNhc3Q6IChtZXNzYWdlKS0+XG4gICAgZm9yIG5hbWUsIGMgb2YgQGNvbm5lY3Rpb25zXG4gICAgICBAc2VuZCBuYW1lLCBtZXNzYWdlXG5cbiAgI1xuICAjIEZsdXNoIG9uZSBvcGVyYXRpb24gZnJvbSB0aGUgbGluZSBvZiBhIHNwZWNpZmljIHVzZXIuXG4gICNcbiAgZmx1c2hPbmU6ICh1aWQpLT5cbiAgICBpZiBAcmVjZWl2ZV9idWZmZXJbdWlkXT8ubGVuZ3RoID4gMFxuICAgICAgbWVzc2FnZSA9IEByZWNlaXZlX2J1ZmZlclt1aWRdLnNoaWZ0KClcbiAgICAgIEByZWNlaXZlTWVzc2FnZSh1aWQsIG1lc3NhZ2UpXG5cblxuICAjXG4gICMgRmx1c2ggb25lIG9wZXJhdGlvbiBvbiBhIHJhbmRvbSBsaW5lLlxuICAjXG4gIGZsdXNoT25lUmFuZG9tOiAoKS0+XG4gICAgY29ubmxpc3QgPSBmb3IgY2lkLGMgb2YgQHJlY2VpdmVfYnVmZmVyXG4gICAgICBjaWRcbiAgICBpID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqY29ubmxpc3QubGVuZ3RoLTAuNSlcbiAgICBAZmx1c2hPbmUgY29ubmxpc3RbaV1cblxuICAjXG4gICMgRmx1c2ggYWxsIG9wZXJhdGlvbnMgb24gZXZlcnkgbGluZS5cbiAgI1xuICBmbHVzaEFsbDogKCktPlxuICAgIGZvciBuLG1lc3NhZ2VzIG9mIEByZWNlaXZlX2J1ZmZlclxuICAgICAgZm9yIG1lc3NhZ2UgaW4gbWVzc2FnZXNcbiAgICAgICAgQHJlY2VpdmVNZXNzYWdlKG4sIG1lc3NhZ2UpXG5cbiAgICBAcmVjZWl2ZV9idWZmZXIgPSB7fVxuXG5cbmlmIHdpbmRvdz9cbiAgaWYgbm90IFk/XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiWW91IG11c3QgaW1wb3J0IFkgZmlyc3QhXCJcbiAgZWxzZVxuICAgIHdpbmRvdy5ZLlRlc3RDb25uZWN0b3IgPSBUZXN0Q29ubmVjdG9yXG5cbmlmIG1vZHVsZT9cbiAgbW9kdWxlLmV4cG9ydHMgPSBUZXN0Q29ubmVjdG9yXG4iXX0=
