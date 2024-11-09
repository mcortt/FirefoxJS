window.addEventListener('load', () => {
    const sidebarMain = document.getElementById('sidebar-main');

    // Return if the sidebar element is not found
    if (!sidebarMain) return;

    let collapseTimeout;
    let expandTimeout;

    const toggleSidebar = () => {
        // Directly call the function for the sidebar revamp
        const { SidebarController } = window;
        if (SidebarController) {
            SidebarController.handleToolbarButtonClick();
        }
    };

    // Expand sidebar with a delay if hovered, and cancel collapse timeout
    const onHover = () => {
        clearTimeout(collapseTimeout);
        expandTimeout = setTimeout(() => {
            toggleSidebar();
        }, 200); // 200 ms delay before expanding
    };

    // Collapse sidebar after delay if hover ends, and cancel expand timeout
    const onMouseOut = () => {
        clearTimeout(expandTimeout);
        collapseTimeout = setTimeout(() => {
            toggleSidebar();
        }, 400); // 400 ms delay before collapsing
    };

    // Add event listeners directly to the sidebar element
    sidebarMain.addEventListener('mouseenter', onHover);
    sidebarMain.addEventListener('mouseleave', onMouseOut);
});
