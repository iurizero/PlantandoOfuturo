// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu (guarded)
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            // Garantir que o header permaneça visível quando o menu estiver aberto
            if (typeof header !== 'undefined' && header) {
                if (isOpen) header.classList.remove('hidden');
            }
            
            // Animate hamburger menu via class; remove any inline styles
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((s) => {
                s.style.transform = '';
                s.style.opacity = '';
            });
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                // Garantir header visível ao fechar/usar links
                if (typeof header !== 'undefined' && header) {
                    header.classList.remove('hidden');
                }
            });
        });

        // Smooth scrolling for navigation links (respeita scroll-padding-top via CSS)
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Header scroll effect (guarded)
    const header = document.querySelector('.header');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    let ticking = false;

    function updateHeader() {
        if (!header) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Não esconder o header quando o menu móvel estiver aberto
        if (navMenu && navMenu.classList.contains('active')) {
            header.classList.remove('hidden');
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
            return;
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            header.classList.add('hidden');
        } else if (scrollTop < lastScrollTop) {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    if (header) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (!navMenu || !navToggle) return;
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    console.log('🌱 Plantando o Futuro - Site carregado com sucesso!');
});

// Notificações básicas
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <strong>${type === 'success' ? 'Sucesso!' : 'Info'}</strong><br>
        ${message}
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset && img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}