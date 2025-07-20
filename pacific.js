// Modernized Hamburger Menu & Nav Toggle (with accessibility)
document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger/menu logic as before ---
    handleScrollEffect();
    handlePackageClick();

    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    if (hamburger && mobileNav && navOverlay) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        });

        // Close menu on mobile nav link click
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                navOverlay.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside (optional: can remove if overlay covers all)
        window.addEventListener('click', function(e) {
            if (
                mobileNav.classList.contains('active') &&
                !mobileNav.contains(e.target) &&
                !hamburger.contains(e.target) &&
                !navOverlay.contains(e.target)
            ) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                navOverlay.classList.remove('active');
                hamburger.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            }
        });
    }

    // --- ACTIVE LINK LOGIC (BOTH MENUS) ---
    let path = window.location.pathname.split("/").pop() || "index.html";
    path = path.toLowerCase();

    // For each nav link in both navbars
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
        let href = link.getAttribute('href').toLowerCase();
        if (
            href === path ||
            // Special case for homepage links
            ((path === 'index.html' || path === '') && (href === 'index.html' || href === './' || href === ''))
        ) {
            link.classList.add('active');
        }
    });
});

// --- OTHER FUNCTIONS ---

function handleScrollEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector("header");
        if (window.pageYOffset > 100) {
            header.classList.add('is-scrolling');
        } else {
            header.classList.remove('is-scrolling');
        }
    });
}

function handlePackageClick() {
    const figures = document.querySelectorAll('.packageChoice');
    const tableRows = document.querySelectorAll("table tbody tr");

    figures.forEach(figure => {
        figure.addEventListener('click', () => {
            const packageName = figure.querySelector('figcaption').textContent.trim();

            tableRows.forEach(row => {
                row.classList.remove('selected-package');
                const firstCell = row.querySelector('td');
                if (firstCell && firstCell.textContent.trim() === packageName) {
                    row.classList.add('selected-package');
                }
            });
        });
    });
}

function scrollToPackage(rowId) {
    const targetRow = document.getElementById(rowId);
    if (targetRow) {
        targetRow.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Keep the selection highlight permanently
        document.querySelectorAll('table tbody tr').forEach(row => {
            row.classList.remove('selected-package');
        });
        targetRow.classList.add('selected-package');
    }
}

// Geolocation and Trail Button Functions
function getLocalTrails(position) {
    const {
        latitude,
        longitude
    } = position.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    showButton();
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocalTrails);
    }
    // If not supported or denied, nothing happens.
}

function showButton() {
    const buttonContainer = document.getElementById('localTrails');
    const existingButton = document.getElementById('viewTrailsButton');

    if (!existingButton) {
        const button = document.createElement('button');
        button.textContent = 'EXPLORE OUR NEAREST TRAILS';
        button.id = 'viewTrailsButton';
        button.onclick = () => {
            showMap();
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $("#googleMap").offset().top
                }, 800);
            }, 0);
        };
        button.style.display = 'block';
        button.style.marginTop = '20px';
        button.style.fontFamily = 'Arial, sans-serif';

        buttonContainer.appendChild(button);
    }
}

function showMap() {
    const googleMapIframe = document.getElementById('googleMap');
    if (googleMapIframe) {
        googleMapIframe.style.display = 'block';
    }
}

function hideMap() {
    const googleMapIframe = document.getElementById('googleMap');
    googleMapIframe.style.display = 'none';
}

// Start geolocation on page load
getUserLocation();
