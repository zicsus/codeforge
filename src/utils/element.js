
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

        console.log(element.tagName, element.offsetLeft, element.offsetTop);

        x += element.offsetLeft;
        y += element.offsetTop;

        iterations += 1;
    } 
    while (element = element.parentNode);

    return { x, y };
}

export default { create, getOffset };