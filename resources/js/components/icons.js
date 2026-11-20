// Blade renders icons immediately. Enhance icons added or changed by browser code.
const icons = require('../../icons/lucide.json');
const aliases = require('../../icons/aliases.json');
const selector = 'i.app-icon';

function refreshIcon(element) {
    if (!element.matches?.(selector)) return;

    const token = Array.from(element.classList).find(className => {
        if (!className.startsWith('icon-')) return false;
        const name = className.slice(5);
        return Object.prototype.hasOwnProperty.call(icons, aliases[name] || name);
    });
    const key = token?.slice(5);
    const name = aliases[key] || key;
    const current = element.querySelector('svg');
    if (!name || current?.dataset.lucideName === name) return;

    const svg = element.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.entries({
        'data-lucide-name': name, width: '24', height: '24', viewBox: '0 0 24 24',
        fill: 'none', stroke: 'currentColor', 'stroke-width': '2',
        'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'aria-hidden': 'true', focusable: 'false'
    }).forEach(([key, value]) => svg.setAttribute(key, value));
    svg.innerHTML = icons[name];
    if (current) current.replaceWith(svg);
    else element.appendChild(svg);
    if (!element.hasAttribute('aria-label') && !element.hasAttribute('title')) element.setAttribute('aria-hidden', 'true');
}

function refresh(root) {
    refreshIcon(root);
    root.querySelectorAll?.(selector).forEach(refreshIcon);
}

function install(document) {
    refresh(document);
    const observer = new MutationObserver(records => {
        for (const record of records) {
            if (record.type === 'attributes') refreshIcon(record.target);
            else record.addedNodes.forEach(refresh);
        }
    });
    observer.observe(document.documentElement, {subtree: true, childList: true, attributes: true, attributeFilter: ['class']});
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => install(document));
else install(document);
