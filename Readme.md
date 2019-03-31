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

* Keep `"name": "Carta"` in packgae.json until further notice. 