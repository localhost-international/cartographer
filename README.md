# Cartographer
_An experimental mobile web browser_

> Note: Cartographer is a very early work in progress, so approach with caution.



Cartographer is an experimental web browser, technology demo and user interface/experience playground.  
It's focus will be on supporting decentralised and peer to peer technologies (such as DAT/Hypercore and web3), but is mainly being built because: it's fun!

<img src="./docs/.assets/cartographer-preview.optimized.gif" width="320" alt="Illustrative screen capture of Cartographer alpha running on iOS browsing between sites" />


If you're looking for mature, feature rich browsers that support such technologies, please consider:

**DAT/Hypercore**

* [Beaker Browser](https://beakerbrowser.com/) - A peer-to-peer browser for Web hackers (desktop)
* [Gateway Browser](https://twitter.com/GatewayBrowser) - An experimental mobile browser that aims to help build a sustainable community-owned P2P web (mobile)
* [Agregore](https://github.com/RangerMauve/agregore-browser) - A minimal web browser for the distributed web

**Ethereum**

- [MetaMask](https://metamask.io/) - A crypto wallet & gateway to blockchain apps
- [Status](https://status.im/) - Status is a secure messaging app, crypto wallet, and Web3 browser built with state of the art technology


## Download

Interested in testing Cartographer on iOS but not comfortable with compiling from source and/or don't have the tools?  

Then [leave a comment on this issue](https://github.com/localhost-international/cartographer/issues/2) and we'll get you added to TestFlight.  

Interested in running on Android? [See this issue](https://github.com/localhost-international/cartographer/issues/1).  

## Development

### Building

For instructions on building Cartographer, please see [BUILDING.md](./BUILDING.md).

### Testing and Linting

> TODO - Build out snapshot tests for components

* `yarn lint`
* `yarn test`

&nbsp;

### Contributors

We're polite and inclusive, and it'd be great if you are also.  
[Non-violent Communication](https://www.cnvc.org/learn-nvc/what-is-nvc) is key.  

&nbsp;



## Features

Currently, the browser is very **very** (*very*?) rudimentary, but will support the following features:

#### Browser  

- [x] Navigation
- [x] Tabs
- [x] Native sharing
- [ ] Home screen
- [ ] Private browsing
- [ ] Default browser (iOS 14)
- [x] Search from address bar
- [ ] History

#### Protocols

- [x] `http`
- [x] `https`
- [x] `web3` <small>_Pre-alpha_</small>
- [ ] `dat`
- [ ] `hyper`
- [ ] `ipfs`

#### Settings

- [ ] Persistence
- [ ] Search engine
- [ ] Clear history
- [ ] Clear website data
- [ ] Ad blocker

#### UI/UX

- [x] App Icon <small>_Temporary_</small>
- [x] Dark/light mode
- [x] Pull to refresh
- [x] Landscape mode


#### Platforms

- [x] Android
- [x] iOS
- [ ] iPadOS


#### Project

- [ ] Branding
- [x] Unit Tests <small>_Partial_</small>
- [ ] CI
- [ ] Decentralised source control (e.g. Radicle)
- [ ] Project roadmap 🙃


&nbsp;


## License

[GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html).

