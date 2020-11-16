'use strict';
import $ from '../utils/element';
import Grid from './grid';
import NodeMenu from './nodeMenu';
import NodeManager from '../compiler/nodeManager';
import Events from '../utils/events';

const state = {
	mx: 0,
	my: 0,
	draw_line: {
		from: null,
		status: true,
		line: null,
		x: 0,
		y: 0
	},
	graph: {
		pivot: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
		allow_move: false,
		moved: false
	}
};

let editor = null;
let graph = null;
let menu = null;

function render(node)
{
	editor = $.create("<div id='editor'></div>");
	graph = $.create("<div id='graph'></div>");

	const grid = Grid.render(5000, 5000);

	menu = NodeMenu.render(onClickNode);

	graph.onmousedown = (e) => 
	{ 
		menu.hide();
		if (e.which === 3 && e.target.tagName.toLowerCase() === "canvas")
		{
			state.graph.allow_move = true;
			state.graph.pivot = { x: state.mx, y: state.my };
			state.graph.offset = { x: graph.offsetLeft, y: graph.offsetTop };
		}  
	}
	graph.onmouseup = (e) => 
	{
		if (e.which === 3) 
		{
			state.graph.allow_move = false;
			if (state.graph.offset.x !== graph.offsetLeft || state.graph.offset.y !== graph.offsetTop) state.graph.moved = true;
		}
		if (state.draw_line.status && state.draw_line.line)
		{
			const cls = e.target.getAttribute("class");
			if (cls && e.target.matches(".pin:not(.out)")  
				&& $.getParent(".node", state.draw_line.from, 5) !== $.getParent(".node", e.target, 5))
			{
				createConnection(e.target);
			}	

			state.draw_line.line.remove();
			state.draw_line = { status: false }; 
		} 
	}
	graph.onmousemove = (e) => 
	{
		Events.setGraphMousePosition(e.pageX - graph.offsetLeft, e.pageY - graph.offsetTop);
		if (state.graph.allow_move)
		{
			const diffX = state.graph.pivot.x - state.mx;
			const diffY = state.graph.pivot.y - state.my;

			let left = state.graph.offset.x - diffX;
			let top = state.graph.offset.y - diffY

			if (left > 0) left = 0;
			if (top > 0) top = 0;

			graph.style.left = `${left}px`;
			graph.style.top = `${top}px`;
		}
	}

	graph.onmouseout = (e) => 
	{
		state.graph.allow_move = false;
	};

	editor.onmouseup = (e) => 
	{ 
		if (e.which === 3 && !state.graph.moved) menu.show(state.mx, state.my);
		state.graph.moved = false; 
	}
	editor.onmousemove = (e) => 
	{
		state.mx = e.clientX;
		state.my = e.clientY;
	}
		
	graph.appendChild(grid);
	editor.appendChild(graph);
	editor.appendChild(menu);

	onClickNode(node, 600, 600);

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
					from: outPin,
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

function createConnection(inPin)
{
	if(state.draw_line.from.line)
	{
		state.draw_line.from.line.to = null;
		state.draw_line.from.line.remove();
	}

	if(inPin.line)
	{
		inPin.line.from = null;
		inPin.line.remove();
	}

	const line = state.draw_line.line.cloneNode(true);
	line.from = state.draw_line.from;
	line.to = inPin;
	line.style.pointerEvents = "auto";

	state.draw_line.from.line = line;
	inPin.line = line;

	reDrawConnection(line, line.to, line.from);

	line.onclick = (e) =>
	{
		line.from.line = null;
		line.to.line = null;
		line.remove();
	}

	graph.appendChild(line);
}

function reDrawConnection(line, inPin, outPin)
{
	const outOffset = $.getOffset(outPin, "#graph", 5);
	const oX = outOffset.x + 11;
	const oY = outOffset.y - 27;

	const inOffset = $.getOffset(inPin, "#graph", 5);
	const iX = inOffset.x + 6;
	const iY = inOffset.y - 27;

	const width = Math.sqrt(Math.pow(iX - oX, 2) + Math.pow(iY - oY, 2));
	const angle = Math.atan2(iX - oX, - (iY - oY + 1)) * (180/Math.PI);
	
	line.style.top = `${oY}px`;
	line.style.left = `${oX}px`;
	line.style.width = `${width}px`;
	line.style.transform = `rotate(${angle - 90}deg)`;
}

function loop()
{
	for (const div of NodeManager.getDivs())
	{
		if (div.movable.status)
		{
			let x = Events.getGraphMousePosition().x - div.movable.x;
	        let y = Events.getGraphMousePosition().y - div.movable.y;

	        if (x < 0) x = 0;
	        if (y < 0) y = 0;

	        div.style.left = `${x}px`;
	        div.style.top = `${y}px`;

	        const inPins = div.querySelectorAll(".pin:not(.out)");
	        for (const inPin of inPins)
	        {
	        	if (!inPin.line) continue;

	        	const line = inPin.line;
	        	const outPin = line.from;
	        	reDrawConnection(line, inPin, outPin);
	        }

	        const outPins = div.querySelectorAll(".pin.out");
	        for (const outPin of outPins)
	        {
	        	if (!outPin.line) continue;

	        	const line = outPin.line;
	        	const inPin = line.to;
	        	reDrawConnection(line, inPin, outPin);
	        }
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