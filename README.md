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
const text = html`&lt;h1&gt;${headerText}&lt;/h1&gt;`;
</code></pre>

This text shows up as <h1>Hello World!</h1>

<h2>Escaping HTML</h2>
When mixing code and html we need to be very careful not to accidently
allow user injected html tags. This means that all nested tags passed into
a template get escaped.

<pre><code>
const html = require('html-template');
const headerText = "&lt;h1&gt;Hello World!&lt;/h1&gt;";
const text = html`${headerText}`;

</pre></code>

The above code displays
<br>
&lt;h1&gt;Hello World!&lt;/h1&gt;
<br>
<br>
Some cases may want to add html tags defined through code.
This can be very useful when building dynamic pages. 
Call html directly to force tags not to be displayed.

<pre><code>
const html = require('html-template');
const headerText = "&lt;h1&gt;Hello World!&lt;/h1&gt;";
const text = html`${html(headerText)}`;
</code></pre>

This shows up as
<h1>Hello World!</h1>
<h2>Array Support</h2>
Each item in an array will be processed independently. 
This can help us build out lists
<code><pre>
html`
${[1, 2, 3].map(i => html(`&lt;li&gt;${i}&lt;/li&gt;`))};
'
</code></pre>

This gets outputted as:
<li>1</li><li>2</li><li>3</li>;
