'use strict';
import defaultNodes from '../nodes.json';
import $ from '../utils/element';
import space from '../components/space';
import Svg from '../utils/svgs';
import Events from '../utils/events';
import { capitalize } from '../utils/utitlity'; 

const state = {
	nodes: JSON.parse(JSON.stringify(defaultNodes)),
	divs: [],
	variables: {}
};

function get() 
{
	const nodes = [...state.nodes];
	for (const variable of Object.keys(state.variables))
	{
		if (state.variables[variable].length)
		{
			nodes.push({
				name: `set${capitalize(variable)}`,
				variable,
				type: "set"
			});

			nodes.push({
				name: `get${capitalize(variable)}`,
				variable,
				type: "get"
			});
		}
	}

	return nodes; 
}

function search(text)
{
	const result = [];
	for (const node of get())
	{
		if (node.name.toLowerCase().startsWith(text) && node.name !== "Start")
		{
			result.push(node);
		}
	}

	return result;
}

function getDivs() { return state.divs }

function createPin(isOut, type)
{
	const pin = $.create(`<div class="pin" type="${type}"></div>`);
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

function remove(nodeDiv)
{
	if (nodeDiv.node.type === "variable")
	{
		let index = -1;
		for (let i = 0; i < state.variables[nodeDiv.node.variable_name].length; i++)
		{
			const div = state.variables[nodeDiv.node.variable_name][i];
			if (div === nodeDiv)
			{
				index = i; 
				break;
			}
		}

		if (index !== -1) 
		{
			state.variables[nodeDiv.node.variable_name].splice(index, 1);
			if (!state.variables[nodeDiv.node.variable_name].length) delete state.variables[nodeDiv.node.variable_name];
		}
	}

	const inPins = nodeDiv.querySelectorAll(".pin:not(.out)");
    for (const inPin of inPins)
    {
    	if (!inPin.line) continue;
    	const line = inPin.line;
    	line.from.line = null;
    	line.remove();
    }

    const outPins = nodeDiv.querySelectorAll(".pin.out");
    for (const outPin of outPins)
    {
    	if (!outPin.line) continue;
    	const line = outPin.line;
    	line.to.line = null;
    	line.remove();
    }

    let index = -1;
    for (let i = 0; i < state.divs.length; i++)
    {
    	if (nodeDiv === state.divs[i])
    	{
    		index = i;
    		break;
    	}
    }
    if (index !== -1) state.divs.splice(index, 1);
	nodeDiv.remove();
}

function create(node, x, y) 
{
	const nodeDiv = $.create("<div class='node'></div>");
	nodeDiv.node = {...node};
	nodeDiv.movable = { status: false };

	if (node.type === "start") createStart(nodeDiv);
	else if (node.type === "if") createIf(nodeDiv);
	else if (node.type === "print") createPrint(nodeDiv);
	else if (node.type === "variable") createVariable(nodeDiv);
	else if (node.type === "set") createSet(nodeDiv, node);
	else if (node.type === "get") createGet(nodeDiv, node);
	else if (node.type === "add" 
		|| node.type === "subtract" 
		|| node.type === "multiply" 
		|| node.type === "divide" 
		|| node.type === "modulo") createOperation(nodeDiv);
	else if (node.type === "for") createFor(nodeDiv);
	else if (node.type === "while") createWhile(nodeDiv);
	else if (node.type === "while") createWhile(nodeDiv);
	else if (node.type.startsWith("gt") || 
		node.type.startsWith("lt") || 
		node.type === "et" || 
		node.type === "ut" || 
		node.type === "and" || 
		node.type === "or") createLogical(nodeDiv, node);

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

	const executeSection = $.create("<section name='execution'></section>");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(outPin);

	nodeDiv.boilerplate = "";

	body.appendChild(executeSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);	
}

function createPrint(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Print</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section name='execution'></section>");
	const inPin = createPin(false, "execution");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const valueSection = $.create("<section name='value'></section>");
	const valuePin = createPin(false);
	const input = $.create("<input type='text' placeholder='Hello World'/>");
	valueSection.appendChild(valuePin);
	valueSection.appendChild($.create("<span>Val: </span>"));
	valueSection.appendChild(input);

	nodeDiv.boilerplate = `console.log(%value%);`;

	body.appendChild(executeSection);
	body.appendChild(valueSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createLogical(nodeDiv, node)
{
	const header = $.create(`<div id='header'><h1>${node.name}</h1></div>`);
	const body = $.create("<div id='body'></div>");

	const firstSection = $.create("<section name='execution'></section>");
	const firstPin = createPin(false, "");
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>Val1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section name='value1'></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>Val2</span>"));
	secondSection.appendChild(secondInput);

	const booleanSection = $.create("<section name='value2'></section>");
	const booleanPin = createPin(true);
	booleanSection.appendChild(space());
	booleanSection.appendChild($.create("<span>boolean</span>"));
	booleanSection.appendChild(booleanPin);

	nodeDiv.boilerplate = `%value1% ${nodeDiv.node.operation} %value2%`;

	body.appendChild(firstSection);
	body.appendChild(secondSection);
	body.appendChild(booleanSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createSet(nodeDiv, node)
{
	const header = $.create(`<div id='header'><h1>${node.name}</h1></div>`);
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section name='execution'></section>");
	const inPin = createPin(false, "execution");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const valueSection = $.create("<section name='value'></section>");
	const valuePin = createPin(false);
	const valueInput = $.create("<input type='text'/>");
	valueSection.appendChild(valuePin);
	valueSection.appendChild($.create("<span>Value</span>"));
	valueSection.appendChild(valueInput);

	nodeDiv.boilerplate = `${node.variable} = %value%;`;

	body.appendChild(executeSection);
	body.appendChild(valueSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createGet(nodeDiv, node)
{
	const header = $.create(`<div id='header'><h1>${node.name}</h1></div>`);
	const body = $.create("<div id='body'></div>");

	const resultSection = $.create("<section></section>");
	const resultPin = createPin(true, "result");
	resultSection.appendChild(space());
	resultSection.appendChild($.create("<span>result</span>"));
	resultSection.appendChild(resultPin);

	nodeDiv.boilerplate = node.variable;

	body.appendChild(resultSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createVariable(nodeDiv)
{
	const header = $.create("<div id='header'><h1>Variable</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section name='execution'></section>");
	const inPin = createPin(false, "execution");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const nameSection = $.create("<section name='name'></section>");
	const nameInput = $.create("<input type='text'/>");
	nameSection.appendChild($.create("<span>Name</span>"));
	nameSection.appendChild(nameInput);

	const valueSection = $.create("<section name='value'></section>");
	const valuePin = createPin(false);
	const valueInput = $.create("<input type='text'/>");
	valueSection.appendChild(valuePin);
	valueSection.appendChild($.create("<span>Value</span>"));
	valueSection.appendChild(valueInput);

	let prev = "";
	nameInput.oninput = (e) => 
	{
		const name = e.target.value;
		if (name)
		{
			if (state.variables[name])
			{
				state.variables[name].push(nodeDiv);
			}	
			else
			{
				state.variables[name] = [nodeDiv];
			}
		}

		if (prev)
		{
			let index = -1;
			for (let i = 0; i < state.variables[prev].length; i++)
			{
				if (nodeDiv === state.variables[prev][i]) 
				{
					index = i;
					break;
				}
			} 	
			if (index !== -1) state.variables[prev].splice(index);
		}

		prev = name; 
		nodeDiv.node.variable_name = name;
	}

	nodeDiv.boilerplate = "let %name% = %value%;";

	body.appendChild(executeSection);
	body.appendChild(nameSection);
	body.appendChild(valueSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createIf(nodeDiv)
{
	const header = $.create("<div id='header'><h1>If</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section name='execution'></section>");
	const inPin = createPin(false, "execution");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const conditionSection = $.create("<section name='condition'></section>");
	const conditionPin = createPin(false);
	const conditionInput = $.create("<input type='text'/>");
	conditionSection.appendChild(conditionPin);
	conditionSection.appendChild($.create("<span>Condition</span>"));
	conditionSection.appendChild(conditionInput);

	const trueSection = $.create('<section name="true"></section>');
	const truePin = createPin(true);
	trueSection.appendChild(space());
	trueSection.appendChild($.create("<span>true</span>"));
	trueSection.appendChild(truePin);

	const falseSection = $.create('<section name="false"></section>');
	const falsePin = createPin(true);
	falseSection.appendChild(space());
	falseSection.appendChild($.create("<span>false</span>"));
	falseSection.appendChild(falsePin);

	nodeDiv.boilerplate = `if (%condition%){%true%}else{%false%}`;

	body.appendChild(executeSection);
	body.appendChild(conditionSection);
	body.appendChild(trueSection);
	body.appendChild(falseSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createOperation(nodeDiv)
{
	const header = $.create(`<div id='header'><h1>${nodeDiv.node.name}</h1></div>`);
	const body = $.create("<div id='body'></div>");

	const firstSection = $.create("<section name='value1'></section>");
	const firstPin = createPin(false);
	const firstInput = $.create("<input type='text'/>");
	firstSection.appendChild(firstPin);
	firstSection.appendChild($.create("<span>Val1</span>"));
	firstSection.appendChild(firstInput);

	const secondSection = $.create("<section name='value2'></section>");
	const secondPin = createPin(false);
	const secondInput = $.create("<input type='text'/>");
	secondSection.appendChild(secondPin);
	secondSection.appendChild($.create("<span>Val2</span>"));
	secondSection.appendChild(secondInput);

	const resultSection = $.create("<section></section>");
	const resultPin = createPin(true);
	resultSection.appendChild(space());
	resultSection.appendChild($.create("<span>result</span>"));
	resultSection.appendChild(resultPin);

	nodeDiv.boilerplate = `%value1% ${nodeDiv.node.operation} %value2%`;

	body.appendChild(firstSection);
	body.appendChild(secondSection);
	body.appendChild(resultSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createFor(nodeDiv)
{
	const header = $.create("<div id='header'><h1>For</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section name='execution'></section>");
	const inPin = createPin(false, "execution");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const varSection = $.create("<section name='variable'></section>");
	const varInput = $.create("<input type='text' value='i'/>");
	varSection.appendChild($.create("<span>Var</span>"));
	varSection.appendChild(varInput);

	const startSection = $.create("<section name='start'></section>");
	const startPin = createPin(false);
	const startInput = $.create("<input type='text' value='0'/>");
	startSection.appendChild(startPin);
	startSection.appendChild($.create("<span>Start</span>"));
	startSection.appendChild(startInput);

	const endSection = $.create("<section name='end'></section>");
	const endPin = createPin(false);
	const endInput = $.create("<input type='text' value='9'/>");
	endSection.appendChild(endPin);
	endSection.appendChild($.create("<span>End</span>"));
	endSection.appendChild(endInput);

	const loopSection = $.create("<section name='loop'></section>");
	const loopPin = createPin(true);
	loopSection.appendChild(space());
	loopSection.appendChild($.create("<span>loop</span>"));
	loopSection.appendChild(loopPin);

	nodeDiv.boilerplate = "for(let %variable% = %start%; %variable% <= %end%; i++){%loop%}";

	body.appendChild(executeSection);
	body.appendChild(varSection);
	body.appendChild(startSection);
	body.appendChild(endSection);
	body.appendChild(loopSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

function createWhile(nodeDiv)
{
	const header = $.create("<div id='header'><h1>While</h1></div>");
	const body = $.create("<div id='body'></div>");

	const executeSection = $.create("<section name='execution'></section>");
	const inPin = createPin(false, "execution");
	const outPin = createPin(true, "execution");
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	const conditionSection = $.create("<section name='condition'></section>");
	const conditionPin = createPin(false);
	const conditionInput = $.create("<input type='text'/>");
	conditionSection.appendChild(conditionPin);
	conditionSection.appendChild($.create("<span>Condition</span>"));
	conditionSection.appendChild(conditionInput);

	const loopSection = $.create("<section name='loop'></section>");
	const loopPin = createPin(true);
	loopSection.appendChild(space());
	loopSection.appendChild($.create("<span>loop</span>"));
	loopSection.appendChild(loopPin);

	nodeDiv.boilerplate = "while(%condition%){%loop%}";

	body.appendChild(executeSection);
	body.appendChild(conditionSection);
	body.appendChild(loopSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

export default { get, create, search, getDivs };