'use strict';
import defaultNodes from '../nodes.json';
import $ from './element';
import space from '../components/space';
import Svg from './svgs';
import Events from '../utils/events';

const state = {
	nodes: JSON.parse(JSON.stringify(defaultNodes)),
	divs: []
};

function get() { return state.nodes };

function search(text)
{
	const result = [];
	for (const node of state.nodes)
	{
		if (node.name.toLowerCase().startsWith(text) && node.name !== "Start")
		{
			result.push(node);
		}
	}

	return result;
}

function getDivs() { return state.divs }

function createPin(isOut)
{
	const pin = $.create(`<div class="pin"></div>`);
	let svg = null;
	if (isOut)
	{
		svg = $.create(Svg.play);
		pin.classList.add("out");
	}
	else
	{
		svg = $.create(Svg.circle);
	}
	pin.appendChild(svg);

	return pin;
}

function create(node, x, y) 
{
	const nodeDiv = $.create("<div class='node'></div>");
	nodeDiv.node = {...node};
	nodeDiv.movable = { status: false };
	switch (node.name)
	{
		case "Start": 
		{
			createStart(nodeDiv);
		} break;

		case "Print":
		{
			createPrint(nodeDiv);
		} break;
	}
	
	nodeDiv.style.left = `${x}px`;
    nodeDiv.style.top = `${y}px`;

	const header = nodeDiv.querySelector("#header");
	header.addEventListener("mousedown", () => 
	{
		header.style.cursor = "grabbing";
		const box = nodeDiv.getBoundingClientRect();
		nodeDiv.movable = {
			status: true,
			x: Events.getGraphMousePosition().x - box.left,
			y: Events.getGraphMousePosition().y - box.top
		};
	});

	header.addEventListener("mouseup", () => 
	{
		header.style.cursor = "grab";
		nodeDiv.movable = {
			status: false
		};
	});

	state.divs.push(nodeDiv);
	return nodeDiv;
}

function createStart(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Start</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const outPin = createPin(true);
	executeSection.appendChild(outPin);

	body.appendChild(executeSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);	
}

function createPrint(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Print</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	body.appendChild(executeSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

export default { get, create, search, getDivs };