'use strict';
import defaultNodes from '../nodes.json';
import $ from './element';
import space from '../components/space';
import Svg from './svgs';
import Events from '../utils/events';

const state = {
	nodes: JSON.parse(JSON.stringify(defaultNodes)),
	divs: [],

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

function remove(node)
{
	const inPins = node.querySelectorAll(".pin:not(.out)");
    for (const inPin of inPins)
    {
    	if (!inPin.line) continue;
    	const line = inPin.line;
    	line.from.line = null;
    	line.remove();
    }

    const outPins = node.querySelectorAll(".pin.out");
    for (const outPin of outPins)
    {
    	if (!outPin.line) continue;
    	const line = outPin.line;
    	line.to.line = null;
    	line.remove();
    }

	node.remove();
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

		case "If":
		{
			createIf(nodeDiv);
		} break;

		case "Print":
		{
			createPrint(nodeDiv);
		} break;

		case "Add":
		{
			createAdd(nodeDiv);
		} break;

		case "Subtract":
		{
			createSubtract(nodeDiv);
		} break;

		case "Multiply":
		{
			createMultiply(nodeDiv);
		} break;

		case "Divide":
		{
			createDivide(nodeDiv);
		} break;

		case "Modulo":
		{
			createModulo(nodeDiv);
		} break;

		case "For":
		{
			createFor(nodeDiv);
		} break;

		case "While":
		{
			createWhile(nodeDiv);
		} break;
	}
	
	nodeDiv.style.left = `${x}px`;
    nodeDiv.style.top = `${y}px`;

	const header = nodeDiv.querySelector("#header");
	header.addEventListener("mousedown", (e) => 
	{
		if (e.which === 1)
		{
			header.style.cursor = "grabbing";
			nodeDiv.movable = {
				status: true,
				x: Events.getGraphMousePosition().x - nodeDiv.offsetLeft,
				y: Events.getGraphMousePosition().y - nodeDiv.offsetTop
			};
		}
	});

	header.addEventListener("mouseup", (e) => 
	{
		if (e.keyCode === 3 || e.which === 3 && node.name !== "Start")
		{
			e.stopImmediatePropagation();
			remove(nodeDiv);
		}
		else
		{
			header.style.cursor = "grab";
			nodeDiv.movable = {
				status: false
			};
		}
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

	const valueSection = $.create("<section></section>");
	const valuePin = createPin(false);
	const input = $.create("<input type='text' placeholder='Hello World'/>");
	valueSection.appendChild(valuePin);
	valueSection.appendChild($.create("<span>Val: </span>"));
	valueSection.appendChild(input);

	body.appendChild(executeSection);
	body.appendChild(valueSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createIf(nodeDiv)
{
	const header = $.create("<div id='header'><h1>If</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const conditionSection = $.create("<section></section>");
	const conditionPin = createPin(false);
	const conditionInput = $.create("<input type='text'/>");
	conditionSection.appendChild(conditionPin);
	conditionSection.appendChild($.create("<span>Condition</span>"));
	conditionSection.appendChild(conditionInput);

	const trueSection = $.create("<section></section>");
	const truePin = createPin(true);
	trueSection.appendChild(space());
	trueSection.appendChild($.create("<span>true</span>"));
	trueSection.appendChild(truePin);

	const falseSection = $.create("<section></section>");
	const falsePin = createPin(true);
	falseSection.appendChild(space());
	falseSection.appendChild($.create("<span>false</span>"));
	falseSection.appendChild(falsePin);

	body.appendChild(executeSection);
	body.appendChild(conditionSection);
	body.appendChild(trueSection);
	body.appendChild(falseSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createAdd(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Add</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const firstSection = $.create("<section></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>num1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>num2</span>"));
	secondSection.appendChild(secondInput);

	body.appendChild(executeSection);
	body.appendChild(firstSection);
	body.appendChild(secondSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createSubtract(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Subtact</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const firstSection = $.create("<section></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>num1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>num2</span>"));
	secondSection.appendChild(secondInput);

	body.appendChild(executeSection);
	body.appendChild(firstSection);
	body.appendChild(secondSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createMultiply(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Multiply</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const firstSection = $.create("<section></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>num1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>num2</span>"));
	secondSection.appendChild(secondInput);

	body.appendChild(executeSection);
	body.appendChild(firstSection);
	body.appendChild(secondSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createDivide(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Divide</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const firstSection = $.create("<section></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>num1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>num2</span>"));
	secondSection.appendChild(secondInput);

	body.appendChild(executeSection);
	body.appendChild(firstSection);
	body.appendChild(secondSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createModulo(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Modulo</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const firstSection = $.create("<section></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>num1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>num2</span>"));
	secondSection.appendChild(secondInput);

	body.appendChild(executeSection);
	body.appendChild(firstSection);
	body.appendChild(secondSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createFor(nodeDiv)
{
	const header = $.create("<div id='header'><h1>For</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const firstSection = $.create("<section></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text' value='0'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>First</span>"));
	firstSection.appendChild(firstInput);

	const lastSection = $.create("<section></section>");
	const lastPin = createPin(false);
	const lastInput = $.create("<input type='text' value='9'/>");
	lastSection.appendChild(lastPin);
	lastSection.appendChild($.create("<span>Last</span>"));
	lastSection.appendChild(lastInput);

	const loopSection = $.create("<section></section>");
	const loopPin = createPin(true);
	loopSection.appendChild(space());
	loopSection.appendChild($.create("<span>loop</span>"));
	loopSection.appendChild(loopPin);

	body.appendChild(executeSection);
	body.appendChild(firstSection);
	body.appendChild(lastSection);
	body.appendChild(loopSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createWhile(nodeDiv)
{
	const header = $.create("<div id='header'><h1>While</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const conditionSection = $.create("<section></section>");
	const conditionPin = createPin(false);
	const conditionInput = $.create("<input type='text'/>");
	conditionSection.appendChild(conditionPin);
	conditionSection.appendChild($.create("<span>Condition</span>"));
	conditionSection.appendChild(conditionInput);

	const loopSection = $.create("<section></section>");
	const loopPin = createPin(true);
	loopSection.appendChild(space());
	loopSection.appendChild($.create("<span>loop</span>"));
	loopSection.appendChild(loopPin);

	body.appendChild(executeSection);
	body.appendChild(conditionSection);
	body.appendChild(loopSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

export default { get, create, search, getDivs };