# Building Cartographer
_HIC SUNT DRACONES_  

> Note: Cartographer is a very early work in progress, so approach with caution.
> For the moment, development on Windows 10 and 11 is not supported.




## Requirements

If you haven't already, [install React Native and it's dependencies](https://reactnative.dev/docs/environment-setup).  


## Building for iOS and iPadOS

Building React Native on iOS requires: 

* macOS
* CocoaPods: `gem install cocoapods`
* Ruby FFI (Foreign Function Interface): `gem install ffi`

1. `git clone git@github.com:localhost-international/cartographer.git`
2. `cd cartographer`
3. `yarn`
4. `npx pod-install ios`
5. `npx react-native run-ios`

To build and run on a connected device: 

* `yarn global add ios-deploy`
* `npx react-native run-ios --device "Your Device Name"`



### Building for Apple Silicon

When building on an M1 processor, some 

Install CocoaPods with:  
```sudo arch -x86_64 gem install cocoapods```

Install ffi with:  
```sudo arch -x86_64 gem install ffi```

(Re-)install project dependencies:  
```arch -x86_64 pod install```


&nbsp;



## Building for Android

Cartographer is currently in development and is being optimised for iOS/iPadOS.  

[Leave a comment on the Android Support issue](https://github.com/localhost-international/cartographer/issues/1) so I know you're interested in an Android compatibility/release.

Building Cartographer for Android requires: 

* macOS or Linux
* Android Studio 4.0+
* OpenJDK 8.

1. `yarn install`
2. `npx react-native run-android`

&nbsp;



## Building for macOS and Catalyst
> TODO 

&nbsp;



## Building for Windows 11

> TODO 

&nbsp;
