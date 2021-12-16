# Cartographer
_An experimental mobile web browser_

> Note: Cartographer is a very early work in progress, so approach with caution.



Cartographer is an experimental web browser, technology demo and user interface/experience playground.  
It's focus will be on supporting distributed, decentralised and peer to peer technologies such as Ethereum, IPFS and Hypercore.  

It's mostly being built because: building things is fun.

<a href="https://youtu.be/6MmmjcFzU44" target="_blank" rel="noopener noreferrer">
	<img src="./docs/.assets/cartographer-preview-17.07.2021.gif" width="320" alt="Illustrative screen capture of Cartographer running on iOS, browsing between webs sites, tabs and the settings screen, which displays an Ethereum wallet balance" />
</a>

<small>[Video - Duration: 54 seconds (YouTube)](https://youtu.be/6MmmjcFzU44)</small>

&nbsp;


If you're looking for more mature, feature rich web browsers that support distributed and decentralised web technologies, please see our [P2P Web Browsers](./docs/p2p-web-browsers.md) document. 




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
- [ ] `ipfs`
- [ ] `hyper`
- [ ] `dat`

#### Settings

- [ ] Persistence
- [ ] Search engines
- [ ] Clear history
- [ ] Clear website data
- [ ] Ad blocker

#### UI/UX

- [x] App Icon <small>_Temporary_</small>
- [x] Dark/light mode
- [x] Pull to refresh
- [x] Landscape mode
- [ ] Animations


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

