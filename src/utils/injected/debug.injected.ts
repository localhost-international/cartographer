// import { injectedConsole } from 'src/utils/injected/console.injected';

export const injectedJS = /* javascript */ ` 


	window.onload = () => {
		const style = document.createElement("style");
		style.appendChild(document.createTextNode(""));
		sheet.insertRule("* { border: 1px solid red; }", 1);
		document.head.appendChild(style);
	};


	// window.ReactNativeWebView.postMessage("window.ReactNativeWebView Test");

	// Let's "mock" an Ethereum provider
	const providerConfig = {
		isMetaMask: true, // Spoof MetaMask?
		chainId: "0x4",
		networkVersion: "4",
		enable: () => {
			alert("window.ethereum.enable");
		},
		request: (data) => {
			console.log('window.ethereum.request data', data);
			return '*** TODO - Response ***';
		},
		isConnected: () => {
			return true;
		}
	};
	// ...and let's let it live everywhere
	window.ethereum = providerConfig;
	window.web3 = providerConfig;


	// Injecting JavaScript
	console.log("injectedJavaScript");

	// Injected JS overlay
	const injectedJSDebugElement = document.createElement("div");
	injectedJSDebugElement.innerHTML = "Code Injected";
	injectedJSDebugElement.style.position = "fixed";
	injectedJSDebugElement.style.zIndex = 999;
	injectedJSDebugElement.style.fontWeight = 400;
	injectedJSDebugElement.style.fontSize = "12px";
	injectedJSDebugElement.style.color = "white";
	injectedJSDebugElement.style.bottom = "10px";
	injectedJSDebugElement.style.right = "10px";
	injectedJSDebugElement.style.background = "rgba(205,0,0,1)";
	injectedJSDebugElement.style.display = "inline-block";
	injectedJSDebugElement.style.padding = "5px 7.5px";
	document.body.appendChild(injectedJSDebugElement);


	// Let's prevent silent failures
	true;

`;
