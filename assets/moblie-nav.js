document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger-icon');
    const menu = document.getElementById('mobile-menu');
    function toggleMenu() {
        if (menu) { menu.classList.toggle('open'); }
    }
    if (hamburger) { hamburger.addEventListener('click', toggleMenu); }
    document.addEventListener('click', function (event) {
        if (menu && menu.classList.contains('open') &&
            hamburger && !hamburger.contains(event.target) &&
            !menu.contains(event.target)) { toggleMenu(); }
    });
});