// SkyTel Solutions - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initResumeUpload();
    initIntersectionObserver();
    initStatCounters();
});

// Test Supabase connection on load
async function testSupabaseConnection() {
    try {
        const { data, error } = await sb.from('contact_submissions').select('*').limit(1);
        if (error) {
            console.warn('Supabase connection test:', error.message);
        } else {
            console.log('Supabase connection successful');
        }
    } catch (err) {
        console.warn('Supabase connection failed:', err.message);
    }
}
testSupabaseConnection();

// Navigation
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

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
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                window.scrollTo(0, startPosition + distance * ease(progress));
                if (progress < 1) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

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
                    if (link.getAttribute('href') === '#' + sectionId) link.classList.add('active');
                });
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { updateActiveNav(); ticking = false; });
            ticking = true;
        }
    });
}

// Supabase configuration
const SUPABASE_URL = 'https://aiakayokjdmtioyxpdla.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Li2yZjM4nvqyGhstQyi6Qw_-KeDByBG'; // Replace with your actual key
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('resumeInput');
    const formSuccess = document.getElementById('formSuccess');
    if (!contactForm) return;

    // Real-time validation
    const fields = ['name', 'email', 'phone', 'message'];
    fields.forEach(function(fid) {
        const el = document.getElementById(fid);
        if (!el) return;
        el.addEventListener('blur', function() {
            var err = document.getElementById(fid + '-error');
            if (!el.checkValidity()) {
                el.classList.add('invalid'); el.classList.remove('valid');
                if (err) err.classList.add('visible');
            } else {
                el.classList.remove('invalid'); el.classList.add('valid');
                if (err) err.classList.remove('visible');
            }
        });
        el.addEventListener('input', function() {
            if (el.classList.contains('invalid')) {
                var err = document.getElementById(fid + '-error');
                if (el.checkValidity()) {
                    el.classList.remove('invalid'); el.classList.add('valid');
                    if (err) err.classList.remove('visible');
                }
            }
        });
    });

    function allValid() {
        var ok = true;
        fields.forEach(function(fid) {
            var el = document.getElementById(fid);
            if (el && !el.checkValidity()) { ok = false; el.classList.add('invalid'); }
        });
        ['contact-method','service','budget'].forEach(function(sid) {
            var s = document.getElementById(sid);
            if (s && !s.value) { ok = false; s.classList.add('invalid'); }
        });
        return ok;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!allValid()) { alert('Please fix the highlighted fields.'); return; }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            let resumeUrl = null;

            const file = fileInput.files[0];
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const { data, error: uploadError } = await sb.storage.from('resumes').upload(fileName, file);
                if (uploadError) throw uploadError;
                resumeUrl = data.path;
            }

            const { error: dbError } = await sb.from('contact_submissions').insert([{
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                contact_method: formData.get('contact-method'),
                service_interest: formData.get('service'),
                budget_range: formData.get('budget'),
                message: formData.get('message'),
                resume_url: resumeUrl
            }]);
            if (dbError) throw dbError;

            // Success: hide form, show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('visible');

        } catch (err) {
            console.error('Submission error:', err);
            alert('Failed to send: ' + err.message);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, i) => {
                    setTimeout(() => child.classList.add('visible'), i * 60);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('section').forEach(section => {
        const targets = section.querySelectorAll(
            '.about-block, .service-item, .timeline-item, .benefit-card, .contact-item, .contact-icon, .contact-text, .form-group, .resume-upload, .form-submit-row, .section-header, .projects-hero, .skill-tag'
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

    function handleFile(file) {
        if (!file) return;
        const isAccepted = file.name.toLowerCase().match(/\.(pdf|doc|docx|png|jpe?g|gif|webp|svg)$/);
        if (!isAccepted) { label.textContent = 'PDF or image only'; uploadZone.classList.remove('has-file'); return; }
        label.textContent = file.name;
        uploadZone.classList.add('has-file');
    }

    uploadZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', (e) => { e.preventDefault(); uploadZone.classList.remove('drag-over'); });
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault(); uploadZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; handleFile(e.dataTransfer.files[0]); }
    });
}

// Stat counter animation
function initStatCounters() {
    var counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    function runAnimation(el) {
        var target = parseFloat(el.getAttribute('data-target'));
        var suffix = el.getAttribute('data-suffix') || '';
        var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
        var duration = 2000;
        var startTime = null;

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function tick(now) {
            if (!startTime) startTime = now;
            var elapsed = now - startTime;
            var p = Math.min(elapsed / duration, 1);
            var eased = easeOut(p);
            el.textContent = (target * eased).toFixed(decimals) + suffix;
            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toFixed(decimals) + suffix;
            }
        }

        requestAnimationFrame(tick);
    }

    // Trigger after short delay to ensure DOM is ready
    setTimeout(function () {
        counters.forEach(function (counter) {
            runAnimation(counter);
        });
    }, 500);
}

console.log('%c SkyTel Solutions ', 'background: #1a1a1a; color: #f5f5f5; padding: 8px 12px; font-family: monospace;');
