
const express = require('express')

const html = require('./html-template')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const docs = documentationPage()
    res.send(docs.text)
})

function documentationPage() {
    const headerText = "html`<h1>${headerText}</h1>`"
    const headerTextExample2 = "html`${headerText}`"
    const headerTextExample3 = "html`${html(headerText)}`"
    const listExample = "`<li>${i}</li>`"
    return html`
<h1>HTML Tempate POC</h1>
<p>
<b>Disclaimer</b>: This project has <b>not</b> been thouroughly testing for security or performance.
It has been mainly been inented to see how working with this might look like. 
Use at your own risk.
</p>
<p>
I just wanted to see how it looks like to
use my own html template instead of pulling
in a bunch of libraries. The idea is to have
a templating system that is just javascript.
This page is completely written using its 
own template library.

The readme of the repo is just a copy of the output from 
the index page.
</p>

<h2>Usage</h2>
<pre><code>
const html = require('html-template');
const headerText = "Hello World!";
const text = ${headerText};
</code></pre>

This text shows up as ${html("<h1>Hello World!</h1>")}

<h2>Escaping HTML</h2>
When mixing code and html we need to be very careful not to accidently
allow user injected html tags. This means that all nested tags passed into
a template get escaped.

<pre><code>
const html = require('html-template');
const headerText = "${"<h1>Hello World!</h1>"}";
const text = ${headerTextExample2};

</pre></code>

The above code displays
<br>
${"<h1>Hello World!</h1>"}
<br>
<br>
Some cases may want to add html tags defined through code.
This can be very useful when building dynamic pages. 
Call html directly to force tags not to be displayed.

<pre><code>
const html = require('html-template');
const headerText = "${"<h1>Hello World!</h1>"}";
const text = ${headerTextExample3};
</code></pre>

This shows up as
<h1>Hello World!</h1>
<h2>Array Support</h2>
Each item in an array will be processed independently. 
This can help us build out lists
<code><pre>
html\`
\${[1, 2, 3].map(i => html(${listExample}))};
\'
</code></pre>

This gets outputted as:
${[1, 2, 3].map(i => html(`<li>${i}</li>`))};
`
}


app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
