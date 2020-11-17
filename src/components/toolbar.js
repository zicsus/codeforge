'use strict';
import hljs from 'highlight.js';
import $ from '../utils/element';
import Compiler from '../compiler/compile';
import NodeManager from '../compiler/nodeManager';
import Svg from '../utils/svgs';
import space from './space';

let toolbar = null;
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

function render()
{
	toolbar = $.create(`<div id="toolbar"></div>`);

	const header = $.create('<div class="header"></div>');
	const compileBtn = $.create(`<button>${Svg.cpu} Compile</button>`);
	const saveBtn = $.create(`<button class="green">${Svg.save} Save As</button>`);
	const resetBtn = $.create(`<button class="red">${Svg.rotate} Reset</button>`);

	const codeDiv = $.create("<div class='code'><pre></pre></div>");
	const code = $.create('<code></code>');

	const terminalDiv = $.create("<div class='terminal'><pre></pre></div>");
	const result = $.create("<code></code>");

	let compiledCode = "";
	compileBtn.onclick = () => 
	{
		result.innerHTML = "";

		compiledCode = Compiler.compile(NodeManager.getDivs()[0]);
		code.innerHTML = hljs.highlight('javascript', compiledCode).value;

		const log = console.log.bind(console);
		console.log = (output) => 
		{
			result.innerHTML = `${result.innerHTML}> ${output}\n`;
		}

		eval(compiledCode);
		console.log = log;
	}

	saveBtn.onclick = () => 
	{
		const a = $.create(`<a href='data:text/plain;charset=utf-8,${encodeURIComponent(compiledCode)}' download='code.js'></a>`);
		a.click();
	}

	resetBtn.onclick = () => 
	{
		NodeManager.clear();
		code.innerHTML = "";
		result.innerHTML = "";
	}

	codeDiv.querySelector("pre").appendChild(code);
	terminalDiv.querySelector("pre").appendChild(result);
	header.appendChild(compileBtn);
	header.appendChild(space());
	header.appendChild(saveBtn);
	header.appendChild(resetBtn);
	toolbar.appendChild(header);
	toolbar.appendChild(codeDiv);
	toolbar.appendChild(terminalDiv);

	return toolbar;
}

export default { render };