window.addEventListener('load', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Sidebar styling */
        #sidebar-main.overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 250px;
            height: 100%;
            z-index: 1000;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
            transform: translateX(0);
        }

        /* Tab browser content */
        #tabbrowser-tabbox {
            position: relative;
            z-index: 1;
        }

        /* Apply a shift to the tab content when sidebar is expanded */
        #tabbrowser-tabbox.sidebar-expanded {
            transform: translateX(46.5px); /* Move content to the right by the sidebar width */
        }
    `;
    document.head.appendChild(style);

    const sidebarButton = document.getElementById('sidebar-button');
    const sidebarMain = document.getElementById('sidebar-main');
    const tabbrowserTabbox = document.getElementById('tabbrowser-tabbox'); // Ensure this element exists
    
    // Return if elements are not found
    if (!sidebarButton || !sidebarMain || !tabbrowserTabbox) return;

    let collapseTimeout;
    let expandTimeout;

    const toggleSidebar = () => {
        // Directly call the function for the sidebar revamp
        const { SidebarController } = window;
        SidebarController.handleToolbarButtonClick();
    };

    // Expand sidebar with a delay if hovered, and cancel collapse timeout
    const onHover = () => {
        clearTimeout(collapseTimeout);
        if (!sidebarButton.checked) {
            expandTimeout = setTimeout(() => {
                toggleSidebar();
                sidebarMain.classList.add('overlay'); // Add overlay effect
                tabbrowserTabbox.classList.add('sidebar-expanded'); // Move content smoothly
            }, 100); // Delay before expanding
        }
    };

    // Collapse sidebar after delay if hover ends, and cancel expand timeout
    const onMouseOut = () => {
        clearTimeout(expandTimeout);
        collapseTimeout = setTimeout(() => {
            if (sidebarButton.checked) {
                sidebarMain.classList.remove('overlay'); // Remove overlay effect
                tabbrowserTabbox.classList.remove('sidebar-expanded'); // Return content to normal
                toggleSidebar();
            }
        }, 100); // Delay before collapsing
    };

    sidebarMain.addEventListener('mouseenter', onHover);
    sidebarMain.addEventListener('mouseleave', onMouseOut);
});
