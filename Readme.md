# Carta
_A decentralised web browser_

## Create
* `react-native init Carta --template='typescript' --package='com.works.Carta'`


## Deploy

* `react-native run-ios --device 'Carta'`
* [`react-native init MyAwesomeProject --template typescript`](https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native)


## Notes

**How to re-cover when things don't run**

1. `rm -Rfv ios/* && rm -Rfv android/*`
2. `react-native eject`
3. Re-add packages, re-link and run :-)

* Keep `"name": "Carta"` in package.json until further notice. 



## Development

### Debugging and Logging

**`log-*`**  
Haven't yet had much luck with `react-native log-ios` and ``react-native log-android`. 

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



## Other

* [Etheruem Foundation - Apply for a Grant](https://ethunicorns.typeform.com/to/XhZlnp)