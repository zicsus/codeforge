'use strict';
import $ from '../utils/element';

const separation = 30;
let canvas = null;

function render(width, height)
{
	canvas = $.create("<canvas></canvas");
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

export default { render };