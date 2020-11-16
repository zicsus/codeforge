'use strict';
import NodeManger from './nodeManager';
import $ from '../utils/element';

const beautify = require('js-beautify').js;

function compile(nodeDiv)
{	
	const code = traverse(nodeDiv);
	const beautified = beautify(code, { indent_size: 4 });
	return beautified;
}

function traverse(nodeDiv)
{
	let code = generateCode(nodeDiv, false);
	const outPin = nodeDiv.querySelector('.pin.out[type="execution"]');
	if (outPin.line)
	{
		const nextNode = $.getParent(".node", outPin.line.to, 5);
		code += traverse(nextNode);
	}

	return code;
}

function reverseTraverse(nodeDiv)
{
	let code = generateCode(nodeDiv, true);
	return code;
}

function generateCode(nodeDiv, isReverse)
{
	let code = nodeDiv.boilerplate;

	const sections = nodeDiv.querySelectorAll('section:not([type="execution"])');
	for (const section of sections)
	{
		const inPin = section.querySelector(".pin:not(.out)");
		const input = section.querySelector("input");
		if (inPin && !input)
		{
			// reverse traversing
			if (inPin.line)
			{
				const parent = $.getParent(".node", inPin.line.from, 5);
				code = code.replaceAll(`%${section.getAttribute("name")}%`, reverseTraverse(parent));
			}
		}
		else if (inPin && input)
		{
			if (inPin.line)
			{
				// reverse traversing
				const parent = $.getParent(".node", inPin.line.from, 5);
				code = code.replaceAll(`%${section.getAttribute("name")}%`, reverseTraverse(parent));
			}
			else
			{
				code = code.replaceAll(`%${section.getAttribute("name")}%`, input.value);
			}
		}
		else if (!inPin && input)
		{
			let value = "";
			const input = section.querySelector("input");
			if (input) value = input.value;
			code = code.replaceAll(`%${section.getAttribute("name")}%`, value);
		}
		else
		{
			if (isReverse) continue;
			const outPin = section.querySelector(".pin.out");
			if (outPin.line)
			{
				const parent = $.getParent(".node", outPin.line.to, 5);
				code = code.replaceAll(`%${section.getAttribute("name")}%`, traverse(parent));
			}
		}

		code = code.replaceAll(`%${section.getAttribute("name")}%`, "");
	}

	return code;
}

export default { compile };