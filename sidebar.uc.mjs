window.addEventListener('load', () => {
    const sidebarButton = document.getElementById('sidebar-button');
    const sidebar = document.getElementById('sidebar-main');
    if (!sidebarButton || !sidebar) return;

    const sidebarWidth = window.getComputedStyle(sidebar).getPropertyValue('width');
    const style = document.createElement('style');
    style.innerHTML = `
        #sidebar-main {
            position: absolute;
            z-index: 1000;
            height: 100%;
        }
        #browser {
            position: relative;
        }
        #tabbrowser-tabbox {
            position: relative;
            z-index: 1;
            margin-left: ${sidebarWidth};
        }
    `;
    document.head.appendChild(style);

    let sidebarTimeout;

    const toggleSidebar = () => window.SidebarController.handleToolbarButtonClick();

    const handleMouseEvent = (event) => {
        clearTimeout(sidebarTimeout);
        const isMouseEnter = event.type === 'mouseenter';
        const shouldToggle = isMouseEnter && !sidebarButton.checked || !isMouseEnter && sidebarButton.checked;
        if (shouldToggle) {
            sidebarTimeout = setTimeout(toggleSidebar, 100);
        }
    };

    sidebar.addEventListener('mouseenter', handleMouseEvent);
    sidebar.addEventListener('mouseleave', handleMouseEvent);
});
