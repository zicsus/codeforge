
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

export default { create, getOffset, getParent };