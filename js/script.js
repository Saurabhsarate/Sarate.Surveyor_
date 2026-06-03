// Intersection Observer for fade-in animations
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        fadeElements.forEach(el => observer.observe(el));

        // Stats Counter Animation
        const counters = document.querySelectorAll('.counter-value');
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = +entry.target.getAttribute('data-target');
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            entry.target.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.innerText = target + '+';
                        }
                    };
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(c => counterObserver.observe(c));

        // Mobile Menu
        const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.getElementById('navLinks');
        const mobileCloseBtns = document.querySelectorAll('.mobile-close');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerText = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        mobileCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerText = '☰';
            });
        });

        // Sticky Navbar
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Portfolio Filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Re-trigger fade in
                        item.classList.remove('visible');
                        setTimeout(() => item.classList.add('visible'), 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Portfolio Lightbox
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        const closeLightbox = document.querySelector('.lightbox-close');
        
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });
        
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-q');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Form Validation
        const contactForm = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit form to Netlify via AJAX
                const formData = new FormData(contactForm);
                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                })
                .then(() => {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'flex';
                })
                .catch(error => alert('Submission failed. Please try again.'));
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('error');
                }
            });
        });