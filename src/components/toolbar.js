'use strict';
import $ from '../utils/element';

let toolbar = null;

function render()
{
	toolbar = $.create(`<div id="toolbar"></div>`);
	return toolbar;
}

export default { render };