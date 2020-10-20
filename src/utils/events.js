'use strict';

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

export default { setMousePosition, getMousePosition, getMovable, setMovable };