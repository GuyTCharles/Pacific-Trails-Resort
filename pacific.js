// Hamburger Menu & Nav Toggle (with accessibility)
document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger/menu logic as before ---
    handleScrollEffect();
    handlePackageClick();
    setupActivityImageModal();
    setupReservationDateValidation();

    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    if (hamburger && mobileNav && navOverlay) {
        const desktopBreakpoint = 851;

        const closeMobileMenu = () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });

        // Close menu on mobile nav link click
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
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
                closeMobileMenu();
            }
        });

        // If the viewport grows to desktop width, always reset mobile menu/overlay state.
        window.addEventListener('resize', function() {
            if (window.innerWidth >= desktopBreakpoint) {
                closeMobileMenu();
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

function setupActivityImageModal() {
    const modal = document.getElementById('activityImageModal');
    const modalImage = document.getElementById('activityModalImage');
    const modalCaption = document.getElementById('activityModalCaption');
    const closeButton = document.getElementById('closeActivityImageModal');
    const activityImages = document.querySelectorAll('.activity-card .activity-img');

    if (!modal || !modalImage || !modalCaption || !closeButton || activityImages.length === 0) {
        return;
    }

    const openModal = (image) => {
        const activityCard = image.closest('.activity-card');
        const heading = activityCard ? activityCard.querySelector('h3') : null;
        const customCaption = image.dataset.caption ? image.dataset.caption.trim() : '';
        const fallbackCaption = heading ? heading.textContent.trim() : image.alt.trim();
        const captionText = customCaption || fallbackCaption;

        modalImage.src = image.currentSrc || image.src;
        modalImage.alt = image.alt || captionText;
        modalCaption.textContent = captionText;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    };

    const closeModal = () => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalImage.removeAttribute('src');
        modalImage.alt = '';
        modalCaption.textContent = '';
    };

    activityImages.forEach((image) => {
        image.setAttribute('tabindex', '0');
        image.setAttribute('role', 'button');
        image.setAttribute('aria-haspopup', 'dialog');

        image.addEventListener('click', () => openModal(image));
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(image);
            }
        });
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
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
    void position;
    showButton();
}

function getUserLocation() {
    const hasMap = document.getElementById('googleMap');
    if (hasMap && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocalTrails);
    }
    // If not supported or denied, nothing happens.
}

function showButton() {
    const buttonContainer = document.getElementById('localTrails');
    const existingButton = document.getElementById('viewTrailsButton');

    if (!buttonContainer || existingButton) {
        return;
    }

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

function showMap() {
    const googleMapIframe = document.getElementById('googleMap');
    if (googleMapIframe) {
        googleMapIframe.style.display = 'block';
    }
}

function hideMap() {
    const googleMapIframe = document.getElementById('googleMap');
    if (googleMapIframe) {
        googleMapIframe.style.display = 'none';
    }
}

function setupReservationDateValidation() {
    const reservationForm = document.querySelector('.reservation-form');
    const arrivalDateInput = document.getElementById('Date');
    if (!reservationForm || !arrivalDateInput) {
        return;
    }

    const getTodayLocal = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    };

    const toIsoDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const parseInputDate = (value) => {
        if (!value) {
            return null;
        }

        const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (isoMatch) {
            const year = Number(isoMatch[1]);
            const month = Number(isoMatch[2]) - 1;
            const day = Number(isoMatch[3]);
            return new Date(year, month, day);
        }

        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return null;
        }

        parsed.setHours(0, 0, 0, 0);
        return parsed;
    };

    const today = getTodayLocal();
    arrivalDateInput.setAttribute('min', toIsoDate(today));

    const validateArrivalDate = () => {
        const selectedDate = parseInputDate(arrivalDateInput.value);
        const isPastDate = selectedDate && selectedDate < getTodayLocal();
        arrivalDateInput.setCustomValidity(isPastDate ? 'Please choose today or a future arrival date.' : '');
    };

    arrivalDateInput.addEventListener('input', validateArrivalDate);
    arrivalDateInput.addEventListener('change', validateArrivalDate);
    arrivalDateInput.addEventListener('blur', validateArrivalDate);

    reservationForm.addEventListener('submit', function(event) {
        validateArrivalDate();
        if (!reservationForm.checkValidity()) {
            event.preventDefault();
            reservationForm.reportValidity();
        }
    });
}

if (document.getElementById('googleMap')) {
    getUserLocation();
}
