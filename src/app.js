import $ from './utils/element';
import Events from './utils/events';
import Editor from './components/editor';
import Separator from './components/separator';
import Toolbar from './components/toolbar';
import NodeManager from './utils/nodeManager';

const app = $.create("<div class='app'></div>");

let editor = null;
let separator = null;
let toolbar = null;

function render()
{
	editor = Editor.render(NodeManager.get()[0]);
	separator = Separator.render();
	toolbar = Toolbar.render();

	app.appendChild(editor);
	app.appendChild(separator);
	app.appendChild(toolbar);

	editor.style.width = `${window.innerWidth / 2}px`;
	toolbar.style.width = `${ (window.innerWidth / 2) - 1 }px`;

	Editor.loop();
}

render();
document.body.appendChild(app);

document.body.onmousemove = (e) => 
{
	Events.setMousePosition(e.pageX, e.pageY);
	if (Events.getMovable())
	{
		const x = e.pageX;
		const y = e.pageY;

		if (x < 500) 
		{
			Events.setMovable(false);
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
		Events.setMovable(true);
	}
}

document.body.onmouseup = (e) => 
{
	Events.setMovable(false);
}

