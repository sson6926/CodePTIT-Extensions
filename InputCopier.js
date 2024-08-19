// ==UserScript==
// @name         Copy Input CodePTIT
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  CopyInput
// @author       Your Name
// @match        *://code.ptit.edu.vn/*
// @grant        none
// ==/UserScript==

(function() {
    function removeBlankLines(input) {
    return input
        .replace(/[\u00A0\u0020]/g, ' ')
        .replace(/\t/g, '')
        .split('\n')
        .filter(line => line !== '')
        .join('\n');
}

    const cells = document.querySelectorAll('div.submit__des > table > tbody > tr:nth-child(2) > td:nth-child(1)');
    cells.forEach(cell => {
        const button = document.createElement('button');

        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M10 1.5H6v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1z"/>
                <path d="M4 2v-.5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 12 1.5V2h1.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-10A1.5 1.5 0 0 1 2.5 2H4zm1 0h6v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V2zm-1 1a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5h-9z"/>
            </svg>
        `;

        button.style.position = 'absolute';
        button.style.top = '5px';
        button.style.right = '5px';
        button.style.padding = '5px';
        button.style.backgroundColor = '#bb2019';
        button.style.border = '0.5';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';

        cell.style.position = 'relative';

        button.addEventListener('click', function() {
            const cellClone = cell.cloneNode(true);
            const buttonInClone = cellClone.querySelector('button');
            if (buttonInClone) {
                cellClone.removeChild(buttonInClone);
            }
            const textToCopy = removeBlankLines(cellClone.innerText);
            navigator.clipboard.writeText(textToCopy);
        });

        cell.appendChild(button);
    });

})();
