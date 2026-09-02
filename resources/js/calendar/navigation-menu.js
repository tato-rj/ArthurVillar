export const bindCalendarNavigationMenu = function(previous, next, navigate) {
    const menu = document.createElement('div');
    menu.id = 'calendar-navigation-menu';
    menu.className = 'dropdown-menu calendar-calendar-nav-menu';
    menu.setAttribute('role', 'menu');
    document.body.appendChild(menu);

    let activeButton = null;
    let activeDirection = 0;
    let holdTimer = null;
    let pressedButton = null;
    let suppressedButton = null;

    const cancelHold = function() {
        window.clearTimeout(holdTimer);
        holdTimer = null;
        pressedButton = null;
    };

    const closeMenu = function(restoreFocus = false) {
        if (!activeButton) {
            return;
        }
        const button = activeButton;
        activeButton = null;
        menu.classList.remove('show');
        button.setAttribute('aria-expanded', 'false');
        if (restoreFocus) {
            button.focus();
        }
    };

    const options = ['day', 'week', 'month'].map(function(unit) {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'dropdown-item';
        option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
        option.setAttribute('role', 'menuitem');
        option.tabIndex = -1;
        option.addEventListener('click', function() {
            const direction = activeDirection;
            closeMenu(true);
            navigate(direction, unit);
        });
        menu.appendChild(option);
        return option;
    });

    const openMenu = function(button, direction) {
        cancelHold();
        closeMenu();
        activeButton = button;
        activeDirection = direction;
        button.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-label', direction < 0 ? 'Move backward' : 'Move forward');
        menu.classList.add('show');
        const rect = button.getBoundingClientRect();
        menu.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - menu.offsetWidth - 8))}px`;
        menu.style.top = `${Math.max(8, Math.min(rect.bottom + 6, window.innerHeight - menu.offsetHeight - 8))}px`;
        options[0].focus({ preventScroll: true });
    };

    [[previous, -1], [next, 1]].forEach(function([button, direction]) {
        if (!button) {
            return;
        }
        button.setAttribute('aria-haspopup', 'menu');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', menu.id);
        button.title = `${direction < 0 ? 'Previous' : 'Next'} (hold for day, week, or month)`;

        button.addEventListener('pointerdown', function(event) {
            if (event.button !== 0 || !event.isPrimary) {
                return;
            }
            cancelHold();
            closeMenu();
            suppressedButton = null;
            pressedButton = button;
            holdTimer = window.setTimeout(function() {
                suppressedButton = button;
                openMenu(button, direction);
            }, 450);
        });
        button.addEventListener('pointerleave', function() {
            if (pressedButton === button) {
                suppressedButton = button;
                cancelHold();
            }
        });
        button.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
        button.addEventListener('click', function(event) {
            cancelHold();
            if (suppressedButton === button) {
                suppressedButton = null;
                event.preventDefault();
                return;
            }
            closeMenu();
            navigate(direction);
        });
        button.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                openMenu(button, direction);
                if (event.key === 'ArrowUp') {
                    options[options.length - 1].focus();
                }
            } else if (event.key === 'Enter' || event.key === ' ') {
                suppressedButton = null;
            }
        });
    });

    menu.addEventListener('keydown', function(event) {
        const index = options.indexOf(document.activeElement);
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1
                : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
            options[nextIndex].focus();
        } else if (event.key === 'Tab') {
            closeMenu(true);
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (pressedButton) {
                suppressedButton = pressedButton;
            }
            cancelHold();
            closeMenu(true);
        }
    });
    document.addEventListener('pointerup', cancelHold);
    document.addEventListener('pointercancel', function() {
        suppressedButton = pressedButton || suppressedButton;
        cancelHold();
        closeMenu();
    });
    document.addEventListener('pointerdown', function(event) {
        if (activeButton && !menu.contains(event.target) && !activeButton.contains(event.target)) {
            closeMenu();
        }
    });
    document.addEventListener('focusin', function(event) {
        if (activeButton && !menu.contains(event.target) && event.target !== activeButton) {
            closeMenu();
        }
    });
    window.addEventListener('blur', function() {
        suppressedButton = pressedButton || suppressedButton;
        cancelHold();
        closeMenu();
    });
    window.addEventListener('resize', function() { closeMenu(); });
    document.addEventListener('scroll', function() { closeMenu(); }, true);
};
