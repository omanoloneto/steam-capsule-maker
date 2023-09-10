function enableConsoleOptions(activatedConsole) {
    consolesInfo.forEach(console => {
        if (console.indicator == activatedConsole.indicator) {
            document.querySelectorAll('.' + console.indicator + '-item').forEach(item => item.style.display = 'block');
        } else {
            document.querySelectorAll('.' + console.indicator + '-item').forEach(item => item.style.display = 'none');
        }
    });
}

function disableOtherOptions(activatedConsole) {
    consolesInfo.forEach(console => {
        if (console.indicator != activatedConsole.indicator) {
            let toggleElement = document.getElementById('labelToggle-' + console.indicator + '-options');
            if (toggleElement) {
                toggleElement.checked = false;
            }
        }
    });
}

function disableOtherLabels(activatedLabel) {
    labelsInfo.forEach(label => {
        if (label.class != activatedLabel.class) {
            let toggleElement = document.getElementById('labelToggle-' + label.class);
            if (toggleElement) {
                toggleElement.checked = false;
                displayLabel(label, false);
            }
        }
    });
}

function displayLabel(label, checked) {
    const topBar = document.getElementById('topBar');
    const inputContainer = document.querySelector('.input-container');
    const linef = document.querySelector('.top-bar #linef');
    const lines = document.querySelector('.top-bar #lines');
    const customTextLabel = document.getElementById('customTextLabel');

    const wasChecked = checked;

    labelsInfo.forEach(otherLabel => {
        if (otherLabel.class != label.class) {
            topBar.classList.remove(label.class);
            linef.classList.remove(label.class + '-linef');
            lines.classList.remove(label.class + '-lines');
        }
    });

    if (!wasChecked) {
        topBar.style.visibility = "hidden";
        customTextLabel.disabled = true;
        topBar.style.visibility = "hidden";
        linef.textContent = '';
        lines.textContent = '';
    } else {
        topBar.classList.add(label.class);
        linef.classList.add(label.class + '-linef');
        lines.classList.add(label.class + '-lines');
        topBar.style.visibility = "visible";
        inputContainer.style.display = 'flex';
        customTextLabel.disabled = false;
        customTextLabel.value = label.text;

        let labelLines = label.text.split('///');
        linef.textContent = labelLines[0] || '';
        lines.textContent = labelLines[1] || '';
    }
}

document.getElementById('customTextLabel').addEventListener('input', function () {
    let lines = this.value.split('///');

    let linef = document.querySelector('.top-bar #linef');
    let linesElem = document.querySelector('.top-bar #lines');

    linef.textContent = lines[0] || '';
    linesElem.textContent = lines[1] || '';

    if (lines[0] && !lines[1] || !lines[0] && lines[1]) {
        linef.classList.add('single-line');
        linesElem.classList.add('single-line');
    } else {
        linef.classList.remove('single-line');
        linesElem.classList.remove('single-line');
    }
});

function generateOptions() {
    const consoleOptions = document.getElementById('consoleOptions');
    const sidebarRight = document.getElementById('sidebarRight');

    consolesInfo.forEach(console => {
        let toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggle-container', 'menu-item');

        let labelElement = document.createElement('label');
        labelElement.setAttribute('for', `labelToggle-${console.indicator}-options`);
        labelElement.innerHTML = `${console.indicator.toUpperCase()} Styles
                                  <div class="switch">
                                      <input type="checkbox" id="labelToggle-${console.indicator}-options">
                                      <span class="slider"></span>
                                  </div>`;

        toggleContainer.appendChild(labelElement);
        consoleOptions.appendChild(toggleContainer);
    });

    labelsInfo.forEach(label => {
        let toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggle-container', 'menu-item', `${label.indicator}-item`);

        let labelElement = document.createElement('label');
        labelElement.setAttribute('for', `labelToggle-${label.class}`);
        labelElement.innerHTML = `<div class="switch">
                                      <input type="checkbox" id="labelToggle-${label.class}">
                                      <span class="slider"></span>
                                  </div><span class="text">${label.menu}</span>`;

        toggleContainer.appendChild(labelElement);
        sidebarRight.appendChild(toggleContainer);
    });


    addListeners();
}

function addListeners() {
    consolesInfo.forEach(console => {
        document.getElementById('labelToggle-' + console.indicator + '-options').addEventListener('change', function () {
            disableOtherOptions(console);
            enableConsoleOptions(console);
        });
    });

    labelsInfo.forEach(label => {
        document.getElementById('labelToggle-' + label.class).addEventListener('change', function () {
            disableOtherLabels(label);
            displayLabel(label, this.checked);
        });
    });
}

generateOptions();

