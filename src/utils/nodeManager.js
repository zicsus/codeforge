'use strict';
import defaultNodes from '../nodes.json';

const state = {
	nodes: JSON.parse(JSON.stringify(defaultNodes))
};

function get() { return state.nodes };

function add() 
{

}

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

export default { get, add, search };