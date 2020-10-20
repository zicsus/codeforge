'use strict';
import $ from '../utils/element';
import Events from '../utils/events';

function render()
{
	const separator = $.create("<div class='separator'></div>");
	const hover = $.create("<div class='hover' id='window_separate'></div>");

	separator.appendChild(hover);
	return separator;
}

export default { render };