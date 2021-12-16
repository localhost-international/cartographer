export const homepageTemplate = () => {
	return /* html */ `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>Cartographer</title>
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
					<span></span>
					<span></span>
				</h1>
				<h3 class="sub-heading" data-id-subtitle>
				</h3>
			</section>
			<div data-id-search>
				<!-- https://duckduckgo.com/?q=test -->
				<form method="GET" action="https://duckduckgo.com/">
					<fieldset>
						<input type="text" id="search" placeholder="Search DuckDuckGo" />
					</fieldset>
				</form>
			</div>
		</main>
		<script>
			const body = document.body;


			const title1st = body.querySelector("[data-id-title] span:first-child");
			const title2nd = body.querySelector("[data-id-title] span:last-child");
			const titles = [
				['Where do you ', 'want to go today?'],
				['What do you ', 'want to do today?']
			];
			const selectedTitle = titles[Math.floor(Math.random() * titles.length)];		
			title1st.innerHTML = selectedTitle[0];
			title2nd.innerHTML = selectedTitle[1];


			const subTitleElem = body.querySelector("[data-id-subtitle]");
			const subTitles = [
				'Maybe learn something new?',
				'Create and new self-hosted website?',
				'Support an artist?',
				'You have 5 <a href="about:tabs/unread">un-read tabs</a>.',
				'You have a <a href="about:history/transactions">new wallet transaction</a>.'
			];
			const selectedSubTitle = subTitles[Math.floor(Math.random() * subTitles.length)];
			subTitleElem.innerHTML = selectedSubTitle;



			const form = body.querySelector("[data-id-search] form");
			const formInput = body.querySelector("[data-id-search] form #search");

			form.addEventListener('submit', (evt) => {
				evt.preventDefault();
        console.log('Search submitted ' + formInput.value);
				document.location = 'https://duckduckgo.com/?q=' + formInput.value;
      });
		</script>
	</body>
	</html>
	`;
};
