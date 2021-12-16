export const developerTemplate = () => {
	return /* html */ `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Developer - Cartographer</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style>
			* {
				outline: none;
				padding: 0;
				margin: 0;
			}
			body {
				font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
					Roboto;
			}
			main {
				margin: 4.5rem 1.5rem 2.5rem 1.5rem;
			}
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				padding-bottom: .75rem;
			}
			h1 {
				font-weight: 400;
				font-size: 220%;
			}
			h2 {
				font-weight: 400;
			}
			h3 {
				font-weight: 200;
				font-size: 160%;
			}
			[data-id-home] {
				margin-bottom: 30px;
			}
			[data-id-search] {
				margin-bottom: 30px;
			}
			form {
				border: none;
				width: 100%;
			}
			form fieldset {
				border: none;
				width: 100%;
			}
			form fieldset input {
				border: none;
				width: 100%;
				background: rgba(0, 0, 0, .15);
				color: rgb(105, 105, 105);
				border-radius: 5px;
				padding: 14px 14px 14px 14px;
				font-size: 18px;
				font-weight: 300;
				display: block;
				box-sizing: border-box;
			}
			pre {
				display: block;
				font-size: 80%;
				line-height: .9rem;
				padding: 5px;
				border-style: solid;
				border-width: 1px;
			}
			@media (prefers-color-scheme: dark) {
				body {
					background: rgb(24,25,26);
				}
				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					color: rgba(255, 255, 255, .75);
				}
				a {
					color: rgba(205, 205, 205, .95);
				}
				form fieldset input {
					background: rgba(0, 0, 0, 1);
					color: rgb(155, 155, 155);
				}
				form fieldset input::placeholder {
					color: rgba(225, 225, 225, .25);
				}
				pre {
					border-color: rgba(255,255,255,.15);
					color: rgba(255,255,255,.75);
					background: rgba(255,255,255,.05);
				}
			}
			@media (prefers-color-scheme: light) {
				body {
					background: rgb(228,229,230);
				}
				h1,
				h2,
				h3,
				h4,
				h5,
				h6 {
					color: rgba(0, 0, 0, .75);
				}
				a {
					color: rgba(105, 105, 105, .65);
				}
				form fieldset input {
					background: rgba(255, 255, 255, 1);
					color: rgb(155, 155, 155);
				}
				form fieldset input::placeholder {
					color: rgb(205, 205, 205);
				}
				pre {
					border-color: rgba(0,0,0,.15);
					color: rgba(0,0,0,.75);
					background: rgba(0,0,0,.05);
				}

			}
			@media (orientation: portrait) {
				h1 span:first-child {
					display: block;
				}
			}
			@media (orientation: landscape) {
				h1 span {
					display: inline;
				}
			}
		</style>
	</head>
	<body>
		<main>
			<section data-id-home>
				<h1 class="heading" data-id-title>
					<span>What do you</span>
					<span>want to test today?</span>
				</h1>
				<h3 class="sub-heading" data-id-subtitle>
					<a href="https://metamask.github.io/test-dapp/">MetaMask Test Dapp</a>
					<a href="https://foundation.app/">Foundation</a>
				</h3>
			</section>
			<pre data-id-debug></pre>
		</main>
		<script>
			const body = document.body;
			const debugContainer = body.querySelector("[data-id-debug]");

			window.onload = () => {
				const ethData = window.ethereum !== 'undefined' ? 
					window.ethereum : { error: "No Ethereum provider" }; 
				console.log("window.ethereum: " + ethData.chainId);
				debugContainer.innerHTML = JSON.stringify(ethData, null, 2);
			};
		</script>
	</body>
	</html>
	`;
};
