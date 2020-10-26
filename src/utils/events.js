'use strict';

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

export default { setMousePosition, getMousePosition, getMovable, setMovable, setGraphMousePosition, getGraphMousePosition };