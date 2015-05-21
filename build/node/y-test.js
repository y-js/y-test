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
