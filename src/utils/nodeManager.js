'use strict';
import defaultNodes from '../nodes.json';
import $ from '../utils/element';

const state = {
	nodes: JSON.parse(JSON.stringify(defaultNodes))
};

function get() { return state.nodes };

function search(text)
{
	const result = [];
	for (const node of state.nodes)
	{
		if (node.name.toLowerCase().startsWith(text))
		{
			result.push(node);
		}
	}

	return result;
}

function create(node) 
{
	const nodeDiv = $.create("<div class='node'></div>");

	const header = $.create("<div id='header'>Function</div>");

	
	return nodeDiv;
}

export default { get, create, search };