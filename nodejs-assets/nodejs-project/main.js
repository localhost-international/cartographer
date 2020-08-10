const rn_bridge = require('rn-bridge')

rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg)
})

rn_bridge.channel.send('Node.js was initialized.')