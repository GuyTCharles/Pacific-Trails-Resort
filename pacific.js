// Function for hamburger menu effects
document.addEventListener("DOMContentLoaded", () => {
    handleScrollEffect();
    handleHamburgerToggle();
    handleNavLinkClicks();
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
    const body = document.body;  // Reference to the body element

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');

        // Toggle overflow on the body to prevent/allow scrolling
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
            body.style.overflow = ''; // Re-enable scrolling when mobile nav is closed
        });
    });
}

// Function to handle the retrieval of user's geolocation and display nearest trails
async function getLocalTrails(position) {
    // Extracting latitude and longitude from the position object.
    const {
        latitude,
        longitude
    } = position.coords;

    // Placeholder for a server call to fetch trails based on the user's location.
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Since geolocation succeeded, show the button to allow user to view the map.
    showButton();
}

// Function to get the user's current location.
async function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocalTrails, showError);
    } else {
        document.getElementById('localTrails').textContent = "Geolocation is not supported by this browser.";
        showButton(); // Even if geolocation is not supported, show the button.
    }
}

// Error handling function.
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
    showButton(); // Show the button to allow users to view the map even if there was an error.
}

// Function to display the map when users click the button and control the smooth scrolling effect.
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

// Function to show the Google Map iframe.
function showMap() {
    const googleMapIframe = document.getElementById('googleMap');
    if (googleMapIframe) {
        googleMapIframe.style.display = 'block';
    }
}

// Function to initially hide the Google Map iframe.
function hideMap() {
    const googleMapIframe = document.getElementById('googleMap');
    googleMapIframe.style.display = 'none';
}

// Call getUserLocation on page load or based on a specific event
getUserLocation();


// Function to allow dropping items in the drop zone
function allowDrop(event) {
    event.preventDefault(); // Prevents the default behavior of the element
}

// Function to handle the drag event
function drag(event) {
    const dataTransfer = event.dataTransfer;
    const target = event.target;
    const tagName = target.tagName.toLowerCase();

    if (tagName === 'img' || tagName === 'figcaption') {
        dataTransfer.setData("text", target.parentElement.id);
    } else {
        dataTransfer.setData("text", target.id);
    }
}

// Function to handle the drop event
function drop(event) {
    event.preventDefault(); // Prevents the default behavior of the element

    const data = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(data);

    const dropZone = document.getElementById('dropZone');
    const packageName = draggableElement.querySelector('figcaption').innerText; // Get the package name from the figcaption
    dropZone.textContent = `${packageName} - Package Selected`;

    dropZone.style.backgroundColor = '#7FFFD4';
}
