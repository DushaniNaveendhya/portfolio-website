// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // For anchor links, add a slight delay to allow scroll before closing menu
            if (link.getAttribute('href').startsWith('#')) {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 500);
            } else {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && email && message) {
            // Prepare form data for Formspree
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            
            // Submit to Formspree
            fetch('https://formspree.io/f/mjgkpeon', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you, ' + name + '! Your message has been sent successfully. I will get back to you soon.');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (data.errors) {
                            alert('There was an error with your submission: ' + data.errors.map(error => error.message).join(', '));
                        } else {
                            alert('There was an error sending your message. Please try again or contact me directly at gunasekarapushpa022@gmail.com');
                        }
                    }).catch(() => {
                        alert('There was an error sending your message. Please try again or contact me directly at gunasekarapushpa022@gmail.com');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or contact me directly at gunasekarapushpa022@gmail.com');
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Current year for footer
const footer = document.querySelector('footer p');
if (footer) {
    footer.innerHTML = `&copy; ${new Date().getFullYear()} Dushani Naveendhya. All rights reserved.`;
}

// Fullscreen Image Viewer for Certifications
const modal = document.getElementById('fullscreenModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close-btn');

// Get all certification images
const certImages = document.querySelectorAll('.certification-img');

// Add click event to each certification image
certImages.forEach(img => {
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        
        // Set caption text based on the certification card title
        const certCard = this.closest('.certification-card');
        if (certCard) {
            const certTitle = certCard.querySelector('h3');
            const certSubtitle = certCard.querySelector('p');
            if (certTitle && certSubtitle) {
                modalCaption.textContent = `${certTitle.textContent} - ${certSubtitle.textContent}`;
            }
        }
    });
});

// Close modal when close button is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
}

// Close modal when clicking outside the image
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    modalImg.src = '';
    modalCaption.textContent = '';
}

// Resume Modal Functions
function openResumeModal(event) {
    event.preventDefault();
    
    // Show the modal
    document.getElementById('resumeModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    
    // Set the resume file path - you'll need to update this with your actual resume file
    const resumePath = 'resume.pdf'; // Change this to your actual resume file path
    document.getElementById('resumeFrame').src = resumePath;
    document.getElementById('downloadResumeBtn').href = resumePath;
}

// Function to handle direct download
function downloadResumeDirectly() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'resume.pdf'; // Update this with your actual resume file path
    link.download = 'Dushani_Naveendhya_Resume.pdf'; // You can customize the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Close resume modal when close button is clicked
const resumeCloseBtn = document.querySelector('.resume-close-btn');
if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', function() {
        closeResumeModal();
    });
}

// Close resume modal when clicking outside the content
document.getElementById('resumeModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeResumeModal();
    }
});

// Close resume modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('resumeModal').style.display === 'flex') {
        closeResumeModal();
    }
});

// Function to close the resume modal
function closeResumeModal() {
    document.getElementById('resumeModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    document.getElementById('resumeFrame').src = '';
}