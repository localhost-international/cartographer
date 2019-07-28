# Cartographer
_A decentralised web browser_

### Create
* `react-native init Cartographer'`


### Deploy

* `react-native run-ios --device 'Cartographer'`
* [`react-native init MyAwesomeProject --template typescript`](https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native)


### Notes

**How to re-cover when things don't run**

1. `rm -Rfv ios/ && rm -Rfv android/`
2. `react-native upgrade --legacy` (previously `react-native eject`)
3. 
	a. `xed -b ios` 
	b. `pod install`
	c. ...(previously "Re-add packages, re-link and run")

* Keep `"name": "Cartographer"` in package.json until further notice. 



## Development

### Debugging and Logging

**`log-*`**  
Haven't yet had much luck with `react-native log-ios` and `react-native log-android`. 

**Launch + Deploy**
Updated `deploy:ios`  with `react-native run-ios --configuration=release --device="Waypoint"`


**Remote Debugger**  
`Command+D` allows enabling "Remote JS Debugging" which is great.  

Visit [the debugger](http://localhost:8081/debugger-ui/) in a new window so it has prominance (and doesn't run slowly).

### Keyboard

Still having issues here. Will eventually look into it. 
Minimal UI for now (padding/margin issues).  

```javascript
keyboardVerticalOffset={
  Platform.select({
    ios: () => 0,
    android: () => 12
  })()
}
```

### Folders and Paths

##### Absolute Paths

Metro Bundler simplifies a lot of this by allowing the creation of small `package.json` files in folders you'd like to alias. I've only aliased `src` as so:

* In the `/src` folder of the project, create a file named `package.json` with the contents of:

```json
{
	"name": "src"
}
```




## Other

* [Etheruem Foundation - Apply for a Grant](https://ethunicorns.typeform.com/to/XhZlnp)


