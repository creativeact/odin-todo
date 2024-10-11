function renderAddIcon() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.classList.add('first-task-icon');
    iconSVG.setAttribute('fill', '#4B648C');

    iconPath.setAttribute('d', 'M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
}

function renderDeleteIcon(fillColor) {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.classList.add('delete-icon');
    iconSVG.setAttribute('fill', fillColor);

    iconPath.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
}

function renderEditIcon(fillColor) {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.setAttribute('fill', fillColor);
    iconSVG.classList.add('edit-icon');
    iconPath.setAttribute('d', 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
}

function renderProjectSettingsIcon() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.setAttribute('fill', '#4B648C');
    iconSVG.classList.add('project-settings-icon');

    iconPath.setAttribute('d', 'M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z');

    iconSVG.appendChild(iconPath);
    return iconSVG;
};

function renderSidebarToggle() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.setAttribute('fill', 'none');

    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const svgPathData = "M11 5V19M6 8H8M6 11H8M6 14H8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z";
    pathElement.setAttribute('d', svgPathData);
    pathElement.setAttribute('stroke', '#ffffff');
    pathElement.setAttribute('stroke-width', '2');
    pathElement.setAttribute('stroke-linecap', 'round');
    pathElement.setAttribute('stroke-linejoin', 'round');
    
    iconSVG.appendChild(pathElement);
    return iconSVG;
}

function renderDropDown() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    iconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    iconSVG.setAttribute('viewBox', '0 -960 960 960');
    iconSVG.setAttribute('fill', '#4B648C');

    iconPath.setAttribute('d', "M480-360 280-560h400z");

    iconSVG.appendChild(iconPath);
    return iconSVG;
}

function renderCloseDropDown() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.setAttribute('fill', '#4B648C');
    iconPath.setAttribute('d', "M7,15L12,10L17,15H7Z");
    iconSVG.appendChild(iconPath);
    return iconSVG;
}

function renderHeartIcon() {
    const iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');

    iconSVG.setAttribute('viewBox', '0 0 24 24');
    iconSVG.classList.add('heart-icon');
    iconSVG.setAttribute('fill', 'red');

    iconPath.setAttribute('d', "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z");
    iconSVG.appendChild(iconPath);
    return iconSVG;
}

export { renderAddIcon, renderDeleteIcon, renderEditIcon, renderProjectSettingsIcon, renderSidebarToggle, renderDropDown, renderCloseDropDown, renderHeartIcon }