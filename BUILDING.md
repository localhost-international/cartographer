# Building Cartographer
_HIC SUNT DRACONES_  

> Note: Cartographer is a very early work in progress, so approach with caution.
> For the moment, development on Windows 10 and 11 is not supported.




## Requirements

Building and running Cartographer requires:

* macOS (for iOS and Android) or Linux (Android only)
* An iPhone or iPad running iOS 10+
* An Android device running 8+

If you haven't already, [install React Native and it's dependencies](https://reactnative.dev/docs/environment-setup).  




## Install and Configure

1. `git clone git@github.com:localhost-international/cartographer.git`
2. `cd cartographer`
3. `yarn`

Now, make a copy of `./environments/.env.example.ts` to a new file named `./environments/.env.development.ts`.

1. Create a new [Etherscan API key](https://etherscan.io/apis)
2. Add the above as the key value of `ETHERSCAN_API_KEY` in the newly created `.env.development.ts`
3. Add a wallet address as a 42 character base16 string or [ENS name](https://github.com/ensdomains/docs) as the value of `ETH_WALLET_ADDRESS`

&nbsp;

## Building for iOS and iPadOS

Building React Native on iOS requires: 

* macOS
* CocoaPods: `gem install cocoapods`
* Ruby FFI (Foreign Function Interface): `gem install ffi`


#### Build

1. `npx pod-install ios`
2. `npx react-native run-ios`


#### Build on a connected device

* `yarn global add ios-deploy`
* `npx react-native run-ios --device "Your Device Name"`


### Building for Apple Silicon

When building with an M1 processor, use the following:

* Install CocoaPods with: `sudo arch -x86_64 gem install cocoapods`
* Install ffi with: `sudo arch -x86_64 gem install ffi`
* (Re-)install project dependencies: `arch -x86_64 pod install`


&nbsp;



## Building for Android

> Cartographer is currently in development and is being optimised for iOS/iPadOS.  

[Leave a comment on the Android Support issue](https://github.com/localhost-international/cartographer/issues/1) so I know you're interested in an Android compatibility/release.

Building Cartographer for Android requires: 

* macOS or Linux
* Android Studio 4.0+
* OpenJDK 8.

#### Build

1. `npx react-native run-android`

&nbsp;



## Building for other platforms 

> Cartographer is currently only officially supported on Android and iOS, 
but can be built and run on the following platforms:

* macOS (via Catalyst)
* Windows 10 (UWP)
* Windows 11 (UWP or Android)



&nbsp;
