# GMU purity test

A 100-question George Mason University purity test in one static page, in the style of a college purity test. Check the items, calculate a score, and share it. The share text is `I got a {score} on GMU PT. Take the test: gmupuritytest.com`.

It is HTML, CSS, and JavaScript. Nothing is stored on a server. It is not a progressive web app, and it does not use local storage.

## Take the test

Open `index.html` in a browser, or serve this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. The public copy is [gmupuritytest.com](https://gmupuritytest.com). `netlify.toml` is the Netlify config.

Questions live in the `questions` array in `script.js`. Result blurbs live in `getScoreMessage()`.

This is an unofficial page. It is not affiliated with George Mason University.

## License

[MIT](LICENSE)
