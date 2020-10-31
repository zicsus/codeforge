/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/element */ "./src/utils/element.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
/* harmony import */ var _components_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/editor */ "./src/components/editor.js");
/* harmony import */ var _components_separator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/separator */ "./src/components/separator.js");
/* harmony import */ var _components_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/toolbar */ "./src/components/toolbar.js");
/* harmony import */ var _utils_nodeManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/nodeManager */ "./src/utils/nodeManager.js");







const app = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div class='app'></div>");

let editor = null;
let separator = null;
let toolbar = null;

function render()
{
	editor = _components_editor__WEBPACK_IMPORTED_MODULE_2__["default"].render(_utils_nodeManager__WEBPACK_IMPORTED_MODULE_5__["default"].get()[0]);
	separator = _components_separator__WEBPACK_IMPORTED_MODULE_3__["default"].render();
	toolbar = _components_toolbar__WEBPACK_IMPORTED_MODULE_4__["default"].render();

	app.appendChild(editor);
	app.appendChild(separator);
	app.appendChild(toolbar);

	editor.style.width = `${window.innerWidth / 2}px`;
	toolbar.style.width = `${ (window.innerWidth / 2) - 1 }px`;

	_components_editor__WEBPACK_IMPORTED_MODULE_2__["default"].loop();
}

render();
document.body.appendChild(app);

document.body.onmousemove = (e) => 
{
	_utils_events__WEBPACK_IMPORTED_MODULE_1__["default"].setMousePosition(e.pageX, e.pageY);
	if (_utils_events__WEBPACK_IMPORTED_MODULE_1__["default"].getMovable())
	{
		const x = e.pageX;
		const y = e.pageY;

		if (x < 500) 
		{
			_utils_events__WEBPACK_IMPORTED_MODULE_1__["default"].setMovable(false);
		}
		else
		{
			editor.style.width = `${x}px`;
			toolbar.style.width = `${window.innerWidth - x - 1}px`;
		}

	}
}

document.body.onmousedown = (e) => 
{
	if (e.target.id === "window_separate")
	{
		_utils_events__WEBPACK_IMPORTED_MODULE_1__["default"].setMovable(true);
	}
}

document.body.onmouseup = (e) => 
{
	_utils_events__WEBPACK_IMPORTED_MODULE_1__["default"].setMovable(false);
}



/***/ }),

/***/ "./src/components/editor.js":
/*!**********************************!*\
  !*** ./src/components/editor.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/components/grid.js");
/* harmony import */ var _nodeMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodeMenu */ "./src/components/nodeMenu.js");
/* harmony import */ var _utils_nodeManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/nodeManager */ "./src/utils/nodeManager.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");







const state = {
	mx: 0,
	my: 0,
	draw_line: {
		from: null,
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
	editor = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div id='editor'></div>");
	graph = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div id='graph'></div>");

	const grid = _grid__WEBPACK_IMPORTED_MODULE_1__["default"].render(2000, 2000);

	menu = _nodeMenu__WEBPACK_IMPORTED_MODULE_2__["default"].render(onClickNode);

	graph.onmousedown = (e) => { menu.hide(); }
	graph.onmouseup = (e) => 
	{
		if (state.draw_line.status && state.draw_line.line)
		{
			const cls = e.target.getAttribute("class");
			if (cls && cls.includes("pin") 
				&& _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].getParent(".node", state.draw_line.from, 5) !== _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].getParent(".node", e.target, 5))
			{
				createConnection(e.target);
			}	

			state.draw_line.line.remove();
			state.draw_line = { status: false }; 
		} 
	}
	graph.onmousemove = (e) => 
	{
		_utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].setGraphMousePosition(e.clientX, e.clientY);
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
	const nodeDiv = _utils_nodeManager__WEBPACK_IMPORTED_MODULE_3__["default"].create(node, x, y);

	const outPins = nodeDiv.querySelectorAll(".pin.out");
	if (outPins)
	{
		for (const outPin of outPins)
		{
			outPin.onmousedown = (e) => 
			{
				const offset = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].getOffset(outPin, "#graph", 5);
				const x = offset.x + 11;
				const y = offset.y - 27;

				const line = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<div class="line"></div>`);
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
	const outOffset = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].getOffset(outPin, "#graph", 5);
	const oX = outOffset.x + 11;
	const oY = outOffset.y - 27;

	const inOffset = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].getOffset(inPin, "#graph", 5);
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

	//console.log(Events.getGraphMousePosition().x, Events.getGraphMousePosition().y);
	for (const div of _utils_nodeManager__WEBPACK_IMPORTED_MODULE_3__["default"].getDivs())
	{
		if (div.movable.status)
		{
			let x = _utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().x - div.movable.x;
	        let y = _utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().y - div.movable.y;
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
			Math.pow(_utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().x - state.draw_line.x, 2) 
			+
			Math.pow(_utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().y - state.draw_line.y, 2)
		);
		
		const angle = Math.atan2(
			_utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().x - state.draw_line.x, 
			- (_utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().y - state.draw_line.y + 1)) * (180/Math.PI);
		
		line.style.width = `${width}px`;
		line.style.transform = `rotate(${angle - 90}deg)`;
	}

	requestAnimationFrame(loop);
}

/* harmony default export */ __webpack_exports__["default"] = ({ render, loop });

/***/ }),

/***/ "./src/components/grid.js":
/*!********************************!*\
  !*** ./src/components/grid.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");



const separation = 30;
let canvas = null;

function render(width, height)
{
	canvas = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<canvas></canvas");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d");
	const xLines = Math.ceil(height / separation);
	const yLines = Math.ceil(width / separation);

	for (let i=0; i < xLines; i++)
	{
		ctx.beginPath();
		ctx.lineWidth = 1 + ((i % 10) == 0);
		ctx.moveTo(0, i * separation);
		ctx.lineTo(width, i * separation);
		ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
		ctx.stroke();
		ctx.closePath();
	}

	for (let j=0; j < yLines; j++)
	{
		ctx.beginPath();
		ctx.lineWidth = 1 + ((j % 10) == 0);
		ctx.moveTo(j * separation, 0);
		ctx.lineTo(j * separation, height);
		ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
		ctx.stroke();
		ctx.closePath();
	}

	return canvas;
}

/* harmony default export */ __webpack_exports__["default"] = ({ render });

/***/ }),

/***/ "./src/components/nodeMenu.js":
/*!************************************!*\
  !*** ./src/components/nodeMenu.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");
/* harmony import */ var _utils_nodeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/nodeManager */ "./src/utils/nodeManager.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");





let menu = null;
let callback = null;

function render(clb) 
{
	callback = clb;
	menu = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div class='node-menu'></div>");

	const search = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<div class="search"></div>`);
	const searchInput = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<input type="text" placeholder="Search"/>`);

	searchInput.oninput = (e) => 
	{
		const result = _utils_nodeManager__WEBPACK_IMPORTED_MODULE_1__["default"].search(e.target.value.toLowerCase());
		renderNodeList(ul, result);
	}

	const ul = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<ul></ul>`);
	renderNodeList(ul, _utils_nodeManager__WEBPACK_IMPORTED_MODULE_1__["default"].get());

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
		
		const li = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<li>${node.name}</li>`);
		li.onclick = () => 
		{
			callback(node, _utils_events__WEBPACK_IMPORTED_MODULE_2__["default"].getGraphMousePosition().x, _utils_events__WEBPACK_IMPORTED_MODULE_2__["default"].getGraphMousePosition().y);
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
	renderNodeList(ul, _utils_nodeManager__WEBPACK_IMPORTED_MODULE_1__["default"].get());
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

/* harmony default export */ __webpack_exports__["default"] = ({ render });

/***/ }),

/***/ "./src/components/separator.js":
/*!*************************************!*\
  !*** ./src/components/separator.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");




function render()
{
	const separator = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div class='separator'></div>");
	const hover = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div class='hover' id='window_separate'></div>");

	separator.appendChild(hover);
	return separator;
}

/* harmony default export */ __webpack_exports__["default"] = ({ render });

/***/ }),

/***/ "./src/components/space.js":
/*!*********************************!*\
  !*** ./src/components/space.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");



function space()
{
	return _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div class='space'></div>");
}

/* harmony default export */ __webpack_exports__["default"] = (space);

/***/ }),

/***/ "./src/components/toolbar.js":
/*!***********************************!*\
  !*** ./src/components/toolbar.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");



let toolbar = null;

function render()
{
	toolbar = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<div id="toolbar"></div>`);
	return toolbar;
}

/* harmony default export */ __webpack_exports__["default"] = ({ render });

/***/ }),

/***/ "./src/nodes.json":
/*!************************!*\
  !*** ./src/nodes.json ***!
  \************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"Start\",\"strict\":true},{\"name\":\"Function\",\"display_name\":true,\"executable\":true,\"arguments\":true},{\"name\":\"If\",\"executable\":true,\"parameters\":[\"condition\"],\"conditions\":{\"true\":{\"parameter\":\"condition\",\"value\":true},\"false\":{\"parameter\":\"condition\",\"value\":false}}},{\"name\":\"Print\",\"executable\":true,\"parameters\":[\"value\"]},{\"name\":\"Variable\",\"executable\":true,\"parameter\":[\"value\"]},{\"name\":\"Get\"},{\"name\":\"Set\",\"executable\":true},{\"name\":\"Add\",\"operation\":\"+\",\"executable\":true,\"parameters\":[\"value1\",\"value2\"]},{\"name\":\"Subtract\",\"operation\":\"-\",\"executable\":true,\"parameters\":[\"value1\",\"value2\"]},{\"name\":\"Multiply\",\"operation\":\"*\",\"executable\":true,\"parameters\":[\"value1\",\"value2\"]},{\"name\":\"Divide\",\"operation\":\"/\",\"executable\":true,\"parameters\":[\"value1\",\"value2\"]},{\"name\":\"Modulas\",\"operation\":\"%\",\"executable\":true,\"parameters\":[\"value1\",\"value2\"]},{\"name\":\"For\",\"executable\":true,\"parameters\":[\"start\",\"end\",\"step\"],\"conditions\":{\"execute\":{}}},{\"name\":\"While\",\"executable\":true,\"parameters\":[\"condition\"],\"conditions\":{\"execute\":{}}}]");

/***/ }),

/***/ "./src/utils/element.js":
/*!******************************!*\
  !*** ./src/utils/element.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

function create(text, options)
{
	const wrapper = document.createElement("div");
	wrapper.innerHTML = text;

	const element = wrapper.firstElementChild;
	if (options)
	{
		if (options.cls) {
			element.setAttribute("class", options.cls);
		}
	}

	return element;
}

function getOffset(child, parentSelector, maxIterations)
{
	let iterations = 0;
	let x = 0;
	let y = 0;

	let element = child;
	do 
    {
        if (iterations >= maxIterations || element.matches(parentSelector)) break;

        x += element.offsetLeft;
        y += element.offsetTop;

        iterations += 1;
    } 
    while (element = element.parentNode);

    return { x, y };
}

function getParent(parentSelector, child, maxIterations)
{
	let parent = null;

    let iterations = 0;
    let element = child;
    do 
    {
        if (iterations >= maxIterations) break;
        if (element.matches(parentSelector))
        { 
            parent = element;
            break;
        }

        iterations += 1;
    } 
    while (element = element.parentNode);

    return parent;
}

/* harmony default export */ __webpack_exports__["default"] = ({ create, getOffset, getParent });

/***/ }),

/***/ "./src/utils/events.js":
/*!*****************************!*\
  !*** ./src/utils/events.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const state = {
	app: {
		mx: 0,
		my: 0
	},
	graph: {
		mx: 0,
		my: 0
	},
	is_movable: false
};

function setMousePosition(x, y)
{
	state.app.mx = x;
	state.app.my = y;
}

function getMousePosition()
{
	return { x: state.app.mx, y: state.app.my };
}

function setMovable(status) { state.is_movable = status; }
function getMovable() { return state.is_movable; }

function setGraphMousePosition(x, y)
{
	state.graph.mx = x;
	state.graph.my = y;
}

function getGraphMousePosition()
{
	return { x: state.graph.mx, y: state.graph.my };
}

/* harmony default export */ __webpack_exports__["default"] = ({ setMousePosition, getMousePosition, getMovable, setMovable, setGraphMousePosition, getGraphMousePosition });

/***/ }),

/***/ "./src/utils/nodeManager.js":
/*!**********************************!*\
  !*** ./src/utils/nodeManager.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nodes_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nodes.json */ "./src/nodes.json");
var _nodes_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../nodes.json */ "./src/nodes.json", 1);
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./src/utils/element.js");
/* harmony import */ var _components_space__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/space */ "./src/components/space.js");
/* harmony import */ var _svgs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svgs */ "./src/utils/svgs.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");







const state = {
	nodes: JSON.parse(JSON.stringify(_nodes_json__WEBPACK_IMPORTED_MODULE_0__)),
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
	const pin = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create(`<div class="pin"></div>`);
	let svg = null;
	if (isOut)
	{
		svg = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create(_svgs__WEBPACK_IMPORTED_MODULE_3__["default"].play);
		pin.classList.add("out");
	}
	else
	{
		svg = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create(_svgs__WEBPACK_IMPORTED_MODULE_3__["default"].circle);
	}
	pin.appendChild(svg);

	return pin;
}

function create(node, x, y) 
{
	const nodeDiv = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div class='node'></div>");
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
			x: _utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().x - box.left,
			y: _utils_events__WEBPACK_IMPORTED_MODULE_4__["default"].getGraphMousePosition().y - box.top
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
	const header = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div id='header'><h1>Start</h1></div>");
	const body = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div id='body'></div>");

	const executeSection = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<section></section>");
	const outPin = createPin(true);
	executeSection.appendChild(outPin);

	body.appendChild(executeSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);	
}

function createPrint(nodeDiv)
{
	const header = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div id='header'><h1>Print</h1></div>");
	const body = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div id='body'></div>");

	const executeSection = _element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<section></section>");
	const inPin = createPin(false);
	const outPin = createPin(true);
	executeSection.appendChild(inPin);
	executeSection.appendChild(outPin);

	body.appendChild(executeSection);
	nodeDiv.appendChild(header);
	nodeDiv.appendChild(body);
}

/* harmony default export */ __webpack_exports__["default"] = ({ get, create, search, getDivs });

/***/ }),

/***/ "./src/utils/svgs.js":
/*!***************************!*\
  !*** ./src/utils/svgs.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const play = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;

const circle = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`

/* harmony default export */ __webpack_exports__["default"] = ({ play, circle });

/***/ })

/******/ });
//# sourceMappingURL=app.js.map