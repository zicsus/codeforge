'use strict';
import $ from '../utils/element';
import NodeMenu from './nodeMenu';

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
	menu = NodeMenu.render();

	graph.onmousedown = (e) => { menu.hide(); }
	editor.onmouseup = (e) => { if (e.which === 3) menu.show(state.mx, state.my); }
	editor.onmousemove = (e) => 
	{
		state.mx = e.clientX;
		state.my = e.clientY;
	}
	
	editor.appendChild(graph);
	editor.appendChild(menu);

	return editor;
}	

export default { render };