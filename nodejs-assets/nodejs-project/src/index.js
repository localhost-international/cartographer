const rn_bridge = __non_webpack_require__('rn-bridge')

import _ from 'lodash'


rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg)
})

rn_bridge.channel.send(
  `Node.js initialized. ${_.join(['Hello', 'humans'], ' ')}`
)


