document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking link
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Scrollspy - Highlight Active Link in Navigation
    const sections = document.querySelectorAll('section');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    // 4. Smooth Scroll to Services from Hero Scroll Indicator
    const scrollIndicator = document.getElementById('scroll-to-services');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 5. Booking Form Handling
    const bookingForm = document.getElementById('booking-form');
    const formStatus = document.getElementById('form-status');

    if (bookingForm && formStatus) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple client-side validation
            const nameInput = document.getElementById('name');
            const contactInput = document.getElementById('contact');
            const datetimeInput = document.getElementById('datetime');

            if (!nameInput.value.trim() || !contactInput.value.trim() || !datetimeInput.value) {
                showStatus('Lūdzu, aizpildiet visus laukus!', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Apstrādā...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showStatus('Pieteikums saņemts! Mēs drīz ar Jums sazināsimies, lai apstiprinātu laiku.', 'success');
                bookingForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status'; // Reset classes
        formStatus.classList.add(type);
        formStatus.style.display = 'block';

        // Auto hide after 5 seconds if success
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 6000);
        }
    }
});
