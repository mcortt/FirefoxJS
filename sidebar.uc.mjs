UC_API.Runtime.startupFinished().then(() => {
    // Function to inject the custom div and styles
    function injectDivAndStyles() {
        const sidebarButton = document.getElementById('sidebar-button');
        const sidebar = document.getElementById('sidebar-main');
        if (!sidebarButton || !sidebar) return;

        // Get the sidebar width and check if the custom div exists
        const sidebarWidth = window.getComputedStyle(sidebar).width;
        let customDiv = document.getElementById('custom-injected-div');

        if (customDiv) {
            customDiv.style.width = sidebarWidth; // Update width if div exists
            return; // Exit early if div already exists
        }

        // Create and inject styles for floating sidebar and custom div
        const style = document.createElement('style');
        style.innerHTML = `
            #sidebar-main {
                position: absolute;
                z-index: 1000;
                height: 100%;
                background: var(--lwt-accent-color) !important;
            }
            #browser {
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
        customDiv = document.createElement('div');
        customDiv.id = 'custom-injected-div';
        customDiv.style.width = sidebarWidth; // Set the width
        document.getElementById('browser').insertBefore(customDiv, sidebar);
    }

    // Function to handle sidebar toggle logic
    function toggleSidebar() {
        window.SidebarController.handleToolbarButtonClick();
    }

    // Handle mouse events to show/hide sidebar with a delay
    let sidebarTimeout;
    const handleMouseEvent = (event) => {
        clearTimeout(sidebarTimeout);
        const sidebarButton = document.getElementById('sidebar-button');
        const sidebar = document.getElementById('sidebar-main');
        if (!sidebarButton || !sidebar) return;

        const shouldToggle = (event.type === 'mouseenter' && !sidebarButton.checked) ||
                             (event.type === 'mouseleave' && sidebarButton.checked);
        if (shouldToggle) {
            sidebarTimeout = setTimeout(toggleSidebar, 100);
        }
    };

    // Inject the div and styles for the initial window
    injectDivAndStyles();

    // Attach mouse event listeners for the sidebar
    const sidebar = document.getElementById('sidebar-main');
    if (sidebar) {
        sidebar.addEventListener('mouseenter', handleMouseEvent);
        sidebar.addEventListener('mouseleave', handleMouseEvent);
    }

    // Listen for new windows or tabs opening and reapply div injection
    window.addEventListener('load', () => {
        injectDivAndStyles(); // Reapply div and styles for new windows/tabs

        const sidebar = document.getElementById('sidebar-main');
        if (sidebar) {
            sidebar.addEventListener('mouseenter', handleMouseEvent);
            sidebar.addEventListener('mouseleave', handleMouseEvent);
        }
    });
});
