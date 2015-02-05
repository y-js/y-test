
_ = require "underscore"

#
# A trivial Connector that simulates network delay.
#
class TestConnector

  #
  # @param id {String} Some unique id
  #
  constructor: (@id)->
    options =
      syncMode: "syncAll"
      role: "slave"
      user_id: @id # TODO: for now, we save the user_id under @id AND @user_id, but change this later..
      perform_send_again: false

    @on_bound_to_y = ()=>
      @init options

      # If you think of operations, this will mirror the
      # execiton order of operations (when a message is send, or received it is put into this)
      @execution_order = []
      # The messages are buffered under the name of teh sending user.
      @receive_buffer = {}

      @receive_handlers.push (user, message)=>
        @execution_order.push message

  # join another user connector
  join: (conn)->
    if not @connections[conn.id]?
      @connections[conn.id] = {conn : conn}
      @userJoined conn.id, "slave"
      conn.join @
      @flushAll()
      conn.flushAll()
      @flushAll()
      conn.flushAll()
      for cid,c of conn.connections
        if not @connections[cid]?
          @join c.conn



  #
  # Get the ops in the execution order.
  #
  getOpsInExecutionOrder: ()->
    @execution_order

  #
  # Send a message to another peer
  # @param {Operation} o The operation that was executed.
  #
  send: (uid, message)->
    if message.sync_step? and false # TODO: false
      @receiveMessage uid, message
    else
      rb = @connections[uid].conn.receive_buffer
      rb[@id] ?= []
      rb[@id].push message

  broadcast: (message)->
    for name, c of @connections
      @send name, message

  #
  # Flush one operation from the line of a specific user.
  #
  flushOne: (uid)->
    if @receive_buffer[uid]?.length > 0
      message = @receive_buffer[uid].shift()
      @receiveMessage(uid, message)


  #
  # Flush one operation on a random line.
  #
  flushOneRandom: ()->
    connlist = for cid,c of @receive_buffer
      cid
    @flushOne connlist[(_.random 0, (connlist.length-1))]

  #
  # Flush all operations on every line.
  #
  flushAll: ()->
    for n,messages of @receive_buffer
      for message in messages
        @receiveMessage(n, message)

    @receive_buffer = {}


if window?
  if not Y?
    throw new Error "You must import Y first!"
  else
    window.Y.TestConnector = TestConnector

if module?
  module.exports = TestConnector
