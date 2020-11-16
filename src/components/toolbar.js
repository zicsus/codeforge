'use strict';
import hljs from 'highlight.js';
import $ from '../utils/element';
import Compiler from '../compiler/compile';
import NodeManager from '../compiler/nodeManager';
import Svg from '../utils/svgs';

let toolbar = null;
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

function render()
{
	toolbar = $.create(`<div id="toolbar"></div>`);

	const header = $.create('<div class="header"></div>');
	const compileBtn = $.create(`<button>${Svg.cpu} Compile</button>`);
	
	const pre = $.create('<pre></pre>');
	const code = $.create('<code></code>');
	compileBtn.onclick = () => 
	{
		const compiledCode = Compiler.compile(NodeManager.getDivs()[0]);
		code.innerHTML = hljs.highlight('javascript', compiledCode).value;
	}

	pre.appendChild(code);
	header.appendChild(compileBtn);
	toolbar.appendChild(header);
	toolbar.appendChild(pre);

	return toolbar;
}

export default { render };