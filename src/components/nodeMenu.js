'use strict';
import $ from '../utils/element';
import Nodes from '../compiler/nodeManager';
import Events from '../utils/events';

let menu = null;
let callback = null;

function render(clb) 
{
	callback = clb;
	menu = $.create("<div class='node-menu'></div>");

	const search = $.create(`<div class="search"></div>`);
	const searchInput = $.create(`<input type="text" placeholder="Search"/>`);

	searchInput.oninput = (e) => 
	{
		const result = Nodes.search(e.target.value.toLowerCase());
		renderNodeList(ul, result);
	}

	const ul = $.create(`<ul></ul>`);
	renderNodeList(ul, Nodes.get());

	menu.show = show.bind(menu);
	menu.hide = hide.bind(menu);

	search.appendChild(searchInput);
	menu.appendChild(search);
	menu.appendChild(ul);

	return menu;
}

function renderNodeList(ul, nodes)
{
	ul.innerHTML = "";
	for (const node of nodes)
	{
		if (node.name === "Start") continue;
		
		const li = $.create(`<li>${node.name}</li>`);
		li.onclick = () => 
		{
			callback(node, Events.getGraphMousePosition().x, Events.getGraphMousePosition().y);
			menu.hide();
		} 

		ul.appendChild(li);
	}
}

function reset()
{
	const input = menu.querySelector("input");
	input.value = "";
	const ul = menu.querySelector("ul");
	renderNodeList(ul, Nodes.get());
}

function show(mx, my)
{
	reset();
	this.style.display = "block";

	let x = mx, y = my;
	const box = this.getBoundingClientRect();
	const parentBox = this.parentElement.getBoundingClientRect();

	if (x + box.width > parentBox.width) x = mx - box.width;
	if (y + box.height > parentBox.height) y = my - box.height;

	this.style.left = `${x}px`; 
	this.style.top = `${y}px`; 
}

function hide()
{
	this.style.display = "none";
}

export default { render };