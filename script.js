// SkyTel Solutions - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initResumeUpload();
    initIntersectionObserver();
});

// Navigation
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Smooth scroll navigation with custom easing (750ms)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 750;
            let startTime = null;

            function ease(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = ease(progress);
                window.scrollTo(0, startPosition + distance * eased);
                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const isClickInside = navMenu.contains(e.target) || mobileToggle.contains(e.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            const resumeFile = document.getElementById('resumeInput').files[0];

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                let msg = 'Thank you for your message. We will get back to you soon.';
                if (resumeFile) {
                    msg += '\n\nAttachment: ' + resumeFile.name;
                }
                alert(msg);
                contactForm.reset();
                document.getElementById('resumeLabel').textContent = 'Add Resume';
                document.getElementById('resumeUpload').classList.remove('has-file');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        });
    }
}

// Intersection Observer for section animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, i) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, i * 60);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        const targets = section.querySelectorAll(
            '.about-block, .stat-item, .service-item, .project-item, .benefit-item, .contact-item, .contact-icon, .contact-text, .form-group, .resume-upload, .form-submit-row, .section-header, .projects-hero'
        );
        targets.forEach(el => el.classList.add('fade-in'));
        observer.observe(section);
    });
}

// Resume upload
function initResumeUpload() {
    const uploadZone = document.getElementById('resumeUpload');
    const fileInput = document.getElementById('resumeInput');
    const label = document.getElementById('resumeLabel');

    if (!uploadZone || !fileInput || !label) return;

    const ACCEPTED_TYPES = [
        'application/pdf',
        'image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'
    ];

    function handleFile(file) {
        if (!file) return;
        const isAccepted = ACCEPTED_TYPES.includes(file.type) ||
            file.name.toLowerCase().endsWith('.pdf') ||
            file.name.toLowerCase().match(/\.(png|jpe?g|gif|webp|svg)$/);
        if (!isAccepted) {
            label.textContent = 'PDF or image only';
            uploadZone.classList.remove('has-file');
            return;
        }
        label.textContent = file.name;
        uploadZone.classList.add('has-file');
    }

    uploadZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFile(e.dataTransfer.files[0]);
        }
    });
}

// Console signature
console.log(
    '%c SkyTel Solutions ',
    'background: #1a1a1a; color: #f5f5f5; padding: 8px 12px; font-family: monospace;'
);
