'use strict';
import $ from '../utils/element';
import Grid from './grid';
import NodeMenu from './nodeMenu';
import NodeManager from '../utils/nodeManager';

const state = {
	mx: 0,
	my: 0
};

let editor = null;
let graph = null;
let menu = null;

function render()
{
	editor = $.create("<div id='editor'></div>");
	graph = $.create("<div id='graph'></div>");

	const grid = Grid.render(2000, 2000);

	menu = NodeMenu.render(onClickNode);

	graph.onmousedown = (e) => { menu.hide(); }
	editor.onmouseup = (e) => { if (e.which === 3) menu.show(state.mx, state.my); }
	editor.onmousemove = (e) => 
	{
		state.mx = e.clientX;
		state.my = e.clientY;
	}
		
	graph.appendChild(grid);
	editor.appendChild(graph);
	editor.appendChild(menu);

	return editor;
}	

function onClickNode(node)
{
	const nodeDiv = NodeManager.create(node);



	graph.appendChild(nodeDiv);
}

export default { render };