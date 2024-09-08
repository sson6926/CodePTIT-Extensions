// ==UserScript==
// @name         Copy Input CodePTIT
// @namespace    http://tampermonkey.net/
// @version      0.3
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

    const cells = document.querySelectorAll('div.submit__des > table > tbody > tr > td');
    cells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.style.position = 'relative';

        cell.addEventListener('click', function() {
            const cellClone = cell.cloneNode(true);
            const buttonInClone = cellClone.querySelector('button');
            if (buttonInClone) {
                cellClone.removeChild(buttonInClone);
            }
            const textToCopy = removeBlankLines(cellClone.innerText);
            navigator.clipboard.writeText(textToCopy);

            const toastNotification = document.createElement('div');
            toastNotification.innerHTML = `<strong>Copied:</strong><br>${textToCopy}`;
            toastNotification.style.position = 'fixed';
            toastNotification.style.bottom = '20px';
            toastNotification.style.left = '20px';
            toastNotification.style.padding = '15px 20px';
            toastNotification.style.backgroundColor = '#323232';
            toastNotification.style.color = 'white';
            toastNotification.style.borderRadius = '8px';
            toastNotification.style.zIndex = '1000';
            toastNotification.style.fontSize = '14px';
            toastNotification.style.opacity = '0.95';
            toastNotification.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.15)';
            toastNotification.style.maxWidth = '250px';
            toastNotification.style.lineHeight = '1.5';
            toastNotification.style.wordWrap = 'break-word';
            toastNotification.style.fontFamily = 'Arial, sans-serif';

            document.body.appendChild(toastNotification);

            setTimeout(() => {
                document.body.removeChild(toastNotification);
            }, 4000);
        });
    });
})();
