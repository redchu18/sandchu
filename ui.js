// ******************* Add Buttons *******************

const uiElementsDiv = document.getElementById('ui_elements');

for (let i = elementCount - 1; i >= 0; i--) {
  if (elementProps[i].hidden) {
    continue;
  }
    const button = document.createElement("button");
    switch(i) {
        case 2:
        case 3:
            button.style.color = 'white';
            break;
        case 4:
        case 6:
            button.style.color = 'lightgray';
            break;
        default:
            button.style.color = 'black';
            break;
    }
    color = elementProps[i].color;
    button.innerHTML = elementProps[i].name;
    button.id = i;
    button.className = 'elements';
    button.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`
    button.style.borderStyle = 'none';
    uiElementsDiv.appendChild(button);
}


// ******************* Global Variables *******************
const childrenUiButtons = uiElementsDiv.children;
const mouseSlider = document.getElementById("mouse_slider");

function resetButtonsToDefault() {
    for (let i = 0; i < childrenUiButtons.length; i++) {
        const child = childrenUiButtons[i];
        if (child.tagName == 'BUTTON') {
            child.style.borderStyle = 'none';
        }
    }
}

function highlightButton(id) {
    const button = document.getElementById(id);
    button.style.borderStyle = 'solid';
    button.style.borderColor = 'brown'; 
}

