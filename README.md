# Cartographer
_An experimental mobile web browser_

> Note: Cartographer is a very early work in progress, so approach with caution.



Cartographer is an experimental web browser, technology demo and user interface/experience playground.  
It's focus will be on supporting decentralised and peer to peer technologies such as DAT/Hypercore and web3, but is mainly being built because: it's a fun R&D project.

If you're looking for a mature/feature rich web browsers that support these technologies:

**DAT/Hypercore**

* [Beaker Browser](https://beakerbrowser.com/) - A peer-to-peer browser for Web hackers (desktop)
* [Gateway Browser](https://twitter.com/GatewayBrowser) - An experimental mobile browser that aims to help build a sustainable community-owned P2P web (mobile)

**Ethereum**

- [MetaMask](https://metamask.io/) - A crypto wallet & gateway to blockchain apps



## Download

Interested in testing Cartographer on iOS but not comfortable with compiling from source/don't have the tools?  

Then [leave a comment on this issue](https://github.com/localhost-international/cartographer/issues/2) and I'll contact you to get you added to TestFlight.  


## Development

### Building

### iOS and iPadOS

Building Cartographer requires Xcode 11+, cocoapds and Node 14+.

* `yarn install`
* `npx pod-install ios`
* `open ios/Cartographer.xcworkspace/`

### Android 

Cartographer is currently in development and is being optimised for iOS/iPadOS.  

[Leave a comment on the Android Support issue](https://github.com/localhost-international/cartographer/issues/1) so I know you're interested in an Android compatibility/release.


### Tests 

TODO - Not exactly TDD. Soon come.

&nbsp;


### Contributors

[Non-violent Communication](https://www.cnvc.org/learn-nvc/what-is-nvc) is key.  
Cartography is a [Benevolent Dictatorship](https://en.wikipedia.org/wiki/Benevolent_dictator_for_life) (or [Enlightened absolutism](https://en.wikipedia.org/wiki/Enlightened_absolutism), depending on your world views). 

&nbsp;



## Features

Currently, the browser is very **very** (*very*?) rudimentary, but will support the following features:

#### Browser  

- [x] Navigation
- [ ] Tabs
- [ ] Native sharing
- [ ] Private browsing
- [ ] Default browser (iOS 14)
- [x] Search from address bar

#### Protocols

- [x] `http`
- [x] `https`
- [ ] `dat`
- [ ] `hyper`
- [ ] `ipfs`
- [ ] `web3`
- [ ] `safe`

#### Settings

- [ ] Persistence
- [ ] Search engine


#### UI/UX

- [x] Dark/light mode
- [x] Pull to refresh
- [ ] Landscape mode

#### Project

- [ ] Unit Tests and CI
- [ ] Decentralised source control (e.g. Radicle)
- [ ] Project roadmap 🙃


&nbsp;


## License

MIT License

Copyright (c) 2018 localhost

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

127.0.0.1 LTD trading as localhost %