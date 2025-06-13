// Function for hamburger menu effects
// Also handles package click selection instead of drag and drop
document.addEventListener("DOMContentLoaded", () => {
    handleScrollEffect();
    handleHamburgerToggle();
    handleNavLinkClicks();
    handlePackageClick();
});

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

function handleHamburgerToggle() {
    const menuBtn = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-nav');
    const body = document.body;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
    });
}

function handleNavLinkClicks() {
    const navLinks = document.querySelectorAll('.mobile-nav a');
    const body = document.body;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.hamburger').classList.remove('is-active');
            document.querySelector('.mobile-nav').classList.remove('is-active');
            body.style.overflow = '';
        });
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
        navigator.geolocation.getCurrentPosition(getLocalTrails, showError);
    } else {
        document.getElementById('localTrails').textContent = "Geolocation is not supported by this browser.";
        showButton();
    }
}

function showError(error) {
    let message = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "<strong><em>You have not authorized geolocation tracking, but you can still explore our nearest trails!</em></strong>";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "<strong><em>Location information is unavailable.</em></strong>";
            break;
        case error.TIMEOUT:
            message = "<strong><em>The request to get user location timed out.</em></strong>";
            break;
        case error.UNKNOWN_ERROR:
            message = "<strong><em>An unknown error occurred.</em></strong>";
            break;
    }
    document.getElementById('localTrails').innerHTML = message;
    showButton();
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

getUserLocation();
