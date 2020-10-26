'use strict';
import $ from '../utils/element';
import Grid from './grid';
import NodeMenu from './nodeMenu';
import NodeManager from '../utils/nodeManager';
import Events from '../utils/events';

const state = {
	mx: 0,
	my: 0,
	draw_line: {
		status: true,
		line: null,
		x: 0,
		y: 0
	}
};

let editor = null;
let graph = null;
let menu = null;

function render(node)
{
	editor = $.create("<div id='editor'></div>");
	graph = $.create("<div id='graph'></div>");

	const grid = Grid.render(2000, 2000);

	menu = NodeMenu.render(onClickNode);

	graph.onmousedown = (e) => { menu.hide(); }
	graph.onmouseup = (e) => 
	{
		if (state.draw_line.status)
		{
			state.draw_line.line.remove();
			state.draw_line = { status: false }; 
		} 
	}
	graph.onmousemove = (e) => 
	{
		Events.setGraphMousePosition(e.clientX, e.clientY);
	}

	editor.onmouseup = (e) => { if (e.which === 3) menu.show(state.mx, state.my); }
	editor.onmousemove = (e) => 
	{
		state.mx = e.clientX;
		state.my = e.clientY;
	}
		
	graph.appendChild(grid);
	editor.appendChild(graph);
	editor.appendChild(menu);

	onClickNode(node, 100, 100);

	return editor;
}	

function onClickNode(node, x, y)
{
	const nodeDiv = NodeManager.create(node, x, y);

	const outPins = nodeDiv.querySelectorAll(".pin.out");
	if (outPins)
	{
		for (const outPin of outPins)
		{
			outPin.onmousedown = (e) => 
			{
				const offset = $.getOffset(outPin, "#graph", 5);
				const x = offset.x + 11;
				const y = offset.y - 27;

				const line = $.create(`<div class="line"></div>`);
				line.style.top = `${y}px`;
				line.style.left = `${x}px`;
				
				state.draw_line = {
					line,
					status: true,
					x: x,
					y: y
				};
				
				graph.appendChild(line);
			}
		}
	}

	graph.appendChild(nodeDiv);
}

function loop()
{
	for (const div of NodeManager.getDivs())
	{
		if (div.movable.status)
		{
			const x = Events.getGraphMousePosition().x - div.movable.x;
	        const y = Events.getGraphMousePosition().y - div.movable.y;
	        div.style.left = `${x}px`;
	        div.style.top = `${y}px`;
		}
	}

	if (state.draw_line.status && state.draw_line.line)
	{
		const line = state.draw_line.line;

		const width = Math.sqrt( 
			Math.pow(Events.getGraphMousePosition().x - state.draw_line.x, 2) 
			+
			Math.pow(Events.getGraphMousePosition().y - state.draw_line.y, 2)
		);
		
		const angle = Math.atan2(
			Events.getGraphMousePosition().x - state.draw_line.x, 
			- (Events.getGraphMousePosition().y - state.draw_line.y + 1)) * (180/Math.PI);
		
		line.style.width = `${width}px`;
		line.style.transform = `rotate(${angle - 90}deg)`;
	}

	requestAnimationFrame(loop);
}

export default { render, loop };