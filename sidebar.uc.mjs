window.addEventListener('load', () => {
    const sidebarButton = document.getElementById('sidebar-button');
    const sidebarMain = document.getElementById('sidebar-main');
    
    // Return if elements are not found
    if (!sidebarButton || !sidebarMain) return;

    let collapseTimeout;

    const toggleSidebar = () => sidebarButton.click();

    // Expand sidebar if hovered, and cancel collapse timeout
    const onHover = () => {
        if (!sidebarButton.checked) toggleSidebar();
        clearTimeout(collapseTimeout);
    };

    // Collapse sidebar after delay if hover ends
    const onMouseOut = () => {
        collapseTimeout = setTimeout(() => {
            if (sidebarButton.checked) toggleSidebar();
        }, 200); // 200 ms delay before collapsing
    };

    sidebarMain.addEventListener('mouseenter', onHover);
    sidebarMain.addEventListener('mouseleave', onMouseOut);
});
