const previews = document.querySelectorAll('.preview');
const mainImage = document.querySelector('.main-image');
let currentIndex = 0;

// Function to change the main image
function changeImage(offset) {
    mainImage.style.transition = '300ms';
    if (offset == 1) {
        mainImage.style.transform = 'translateX(-150%)';
    } else if (offset == -1) {
        mainImage.style.transform = 'translateX(150%)';
    }
    mainImage.style.opacity = '0%';

    currentIndex += offset;

    // Wrap around to the first image if needed
    if (currentIndex < 0) {
        currentIndex = previews.length - 1;
    } else if (currentIndex >= previews.length) {
        currentIndex = 0;
    }

    // Update the main image source
    // mainImage.src = previews[currentIndex].src;
    setTimeout(() => {
        mainImage.style.transition = '0ms';
        mainImage.style.opacity = '100%';
        if (offset == 1) {
            mainImage.style.transform = 'translateX(150%)';
        } else if (offset == -1) {
            mainImage.style.transform = 'translateX(-150%)';
        }
        mainImage.src = previews[currentIndex].src;
        requestAnimationFrame(() => {
            mainImage.style.transform = 'translateX(0)';
        })
        // mainImage.style.transform = 'translateX(0)';
    }, 300);
    removeAllClass('selected-image');
    previews[currentIndex].classList.add('selected-image');
    previews[currentIndex].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

function removeAllClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
        element.classList.remove(className);
    });
}

// Add click event listeners to the preview images
previews.forEach((preview, index) => {
    preview.addEventListener('click', () => {
        removeAllClass('selected-image');
        currentIndex = index;
        mainImage.src = preview.src;
        preview.classList.add('selected-image');
    });
});

// Initialize the main image source
mainImage.src = previews[currentIndex].src;

function closeAlert() {
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.style.display = "none";
    const html = document.getElementById("html");
    html.style.overflow = "auto";
}

function openGallery() {
    const galleryContainer = document.getElementById("gallery-container");
    const html = document.getElementById("html");
    html.style.overflow = "hidden"
    galleryContainer.style.display = "flex";
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        changeImage(1);
    } else if (event.key === 'Escape') {
        closeAlert();
    }
});

//Touch swipe

// Variables to track touch start and end positions
let touchStartX = 0;
let touchEndX = 0;

// Minimum distance required for a swipe to be registered
const swipeThreshold = 50;

// Add a touchstart event listener to track the start position
document.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
});

// Add a touchend event listener to track the end position and detect the swipe direction
document.addEventListener('touchend', function (event) {
    //If gallery not open, do nothing
    if (!document.getElementById('gallery-container')) { return; }
    touchEndX = event.changedTouches[0].clientX;
    // Calculate the horizontal distance of the swipe
    const swipeDistance = touchEndX - touchStartX;

    // Check if the swipe distance exceeds the threshold for left or right swipe
    if (swipeDistance > swipeThreshold) {
        // Right swipe detected
        changeImage(-1);
    } else if (swipeDistance < -swipeThreshold) {
        // Left swipe detected
        changeImage(1);
    }
});