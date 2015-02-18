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
