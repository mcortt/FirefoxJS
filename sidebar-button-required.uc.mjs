window.addEventListener('load', () => {
    const sidebarButton = document.getElementById('sidebar-button');
    const sidebarMain = document.getElementById('sidebar-main');
    
    // Return if elements are not found
    if (!sidebarButton || !sidebarMain) return;

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
            }, 200); // 200 ms delay before expanding
        }
    };

    // Collapse sidebar after delay if hover ends, and cancel expand timeout
    const onMouseOut = () => {
        clearTimeout(expandTimeout);
        collapseTimeout = setTimeout(() => {
            if (sidebarButton.checked) toggleSidebar();
        }, 400); // 400 ms delay before collapsing
    };

    sidebarMain.addEventListener('mouseenter', onHover);
    sidebarMain.addEventListener('mouseleave', onMouseOut);
});
