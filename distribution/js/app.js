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






const app = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div class='app'></div>");

let editor = null;
let separator = null;
let toolbar = null;

function render()
{
	editor = _components_editor__WEBPACK_IMPORTED_MODULE_2__["default"].render();
	separator = _components_separator__WEBPACK_IMPORTED_MODULE_3__["default"].render();
	toolbar = _components_toolbar__WEBPACK_IMPORTED_MODULE_4__["default"].render();

	app.appendChild(editor);
	app.appendChild(separator);
	app.appendChild(toolbar);

	editor.style.width = `${window.innerWidth / 2}px`;
	toolbar.style.width = `${ (window.innerWidth / 2) - 1 }px`;
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






const state = {
	mx: 0,
	my: 0
};

let editor = null;
let graph = null;
let menu = null;

function render()
{
	editor = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div id='editor'></div>");
	graph = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create("<div id='graph'></div>");

	const grid = _grid__WEBPACK_IMPORTED_MODULE_1__["default"].render(2000, 2000);

	menu = _nodeMenu__WEBPACK_IMPORTED_MODULE_2__["default"].render(onClickNode);

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
	const nodeDiv = _utils_nodeManager__WEBPACK_IMPORTED_MODULE_3__["default"].create(node);



	graph.appendChild(nodeDiv);
}

/* harmony default export */ __webpack_exports__["default"] = ({ render });

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
		const li = _utils_element__WEBPACK_IMPORTED_MODULE_0__["default"].create(`<li>${node.name}</li>`);
		li.onclick = () => 
		{
			callback(node);
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

function create(text)
{
	const wrapper = document.createElement("div");
	wrapper.innerHTML = text;
	return wrapper.firstElementChild;
}

/* harmony default export */ __webpack_exports__["default"] = ({ create });

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
	mx: 0,
	my: 0,
	is_movable: false
};

function setMousePosition(x, y)
{
	state.mx = x;
	state.my = y;
}

function getMousePosition()
{
	return { x: state.mx, y: state.my };
}

function setMovable(status) { state.is_movable = status; }
function getMovable() { return state.is_movable; }

/* harmony default export */ __webpack_exports__["default"] = ({ setMousePosition, getMousePosition, getMovable, setMovable });

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
/* harmony import */ var _utils_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/element */ "./src/utils/element.js");




const state = {
	nodes: JSON.parse(JSON.stringify(_nodes_json__WEBPACK_IMPORTED_MODULE_0__))
};

function get() { return state.nodes };

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

function create(node) 
{
	const nodeDiv = _utils_element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div class='node'></div>");

	const header = _utils_element__WEBPACK_IMPORTED_MODULE_1__["default"].create("<div id='header'>Function</div>");

	
	return nodeDiv;
}

/* harmony default export */ __webpack_exports__["default"] = ({ get, create, search });

/***/ })

/******/ });
//# sourceMappingURL=app.js.map