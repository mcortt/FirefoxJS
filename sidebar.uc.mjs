UC_API.Runtime.startupFinished().then(() => {
    const sidebarButton = document.getElementById('sidebar-button');
    const sidebar = document.getElementById('sidebar-main');
    if (!sidebarButton || !sidebar) return;

    // Get the computed sidebar width
    const sidebarWidth = window.getComputedStyle(sidebar).width;

    // Create and inject styles for floating sidebar and custom div
    const style = document.createElement('style');
    style.innerHTML = `
        #sidebar-main {
            position: absolute;
            z-index: 1000;
            height: 100%;
        }
        #browser{
            position: relative;
        }
        #tabbrowser-tabbox, #navigator-toolbox, #sidebar {
            outline: none !important;
            box-shadow: none !important;
        }
        #custom-injected-div {
            width: ${sidebarWidth};
        }
    `;
    document.head.appendChild(style);

    // Create and insert the custom div before the sidebar
    const customDiv = document.createElement('div');
    customDiv.id = 'custom-injected-div';
    document.getElementById('browser').insertBefore(customDiv, sidebar);

    let sidebarTimeout;

    // Toggle the sidebar using the built-in controller
    const toggleSidebar = () => window.SidebarController.handleToolbarButtonClick();

    // Handle mouse events to show/hide sidebar with a delay
    const handleMouseEvent = (event) => {
        clearTimeout(sidebarTimeout);
        const shouldToggle = (event.type === 'mouseenter' && !sidebarButton.checked) ||
                             (event.type === 'mouseleave' && sidebarButton.checked);
        if (shouldToggle) {
            sidebarTimeout = setTimeout(toggleSidebar, 100);
        }
    };

    // Attach mouse events to sidebar
    sidebar.addEventListener('mouseenter', handleMouseEvent);
    sidebar.addEventListener('mouseleave', handleMouseEvent);

    // Listen for fullscreen change events
    const handleFullscreenChange = () => {
        customDiv.style.display = document.fullscreenElement ? 'none' : 'block';
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
});
