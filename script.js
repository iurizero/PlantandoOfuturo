// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll - corrigido para evitar bugs
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scrolling down & past threshold
            header.style.transform = 'translateY(-100%)';
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // TODAS AS ANIMAÇÕES DE ROLAGEM DESABILITADAS
    // Intersection Observer COMPLETAMENTE REMOVIDO
    // Não há mais animações baseadas em scroll

    // Código do Intersection Observer removido:
    // - observerOptions
    // - observer
    // - animateElements
    // - observer.observe()
    
    // SITE AGORA É COMPLETAMENTE ESTÁTICO

    // Counter animation removido - números agora são estáticos
    // Seção "Sobre o projeto" não terá mais animações de contador

    // Observe stat numbers - removido pois não há mais animação
    // const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    // statNumbers.forEach(stat => {
    //     statsObserver.observe(stat);
    // });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
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
            }, 2000);
        });
    }

    // ANIMAÇÃO DE LOADING NO FORMULÁRIO
    const contactFormWithLoading = document.getElementById('contact-form');
    const submitBtnWithLoading = contactFormWithLoading?.querySelector('button[type="submit"]');
    
    if (contactFormWithLoading && submitBtnWithLoading) {
        // Adicionar span para o texto do botão
        const btnText = submitBtnWithLoading.textContent;
        submitBtnWithLoading.innerHTML = `<span class="btn-text">${btnText}</span>`;
        
        contactFormWithLoading.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ativar loading
            submitBtnWithLoading.classList.add('btn-loading');
            
            // Simular envio (remover em produção)
            setTimeout(() => {
                submitBtnWithLoading.classList.remove('btn-loading');
                
                // Feedback visual de sucesso
                const originalText = submitBtnWithLoading.querySelector('.btn-text').textContent;
                submitBtnWithLoading.querySelector('.btn-text').textContent = 'Enviado!';
                submitBtnWithLoading.style.background = '#22c55e';
                
                setTimeout(() => {
                    submitBtnWithLoading.querySelector('.btn-text').textContent = originalText;
                    submitBtnWithLoading.style.background = '';
                }, 2000);
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.innerHTML = `
            <strong>${type === 'success' ? 'Sucesso!' : 'Info'}</strong><br>
            ${message}
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            /* Removido: transform e transition - notificação aparece instantaneamente */
        `;

        // Add to DOM - sem animação
        document.body.appendChild(notification);

        // BOTÃO DE FECHAR REMOVIDO - NOTIFICAÇÃO SIMPLES
        // Removido: close button functionality
        // Removido: animações de saída

        // Auto remove after 5 seconds - sem animação
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove(); // Remove instantaneamente
            }
        }, 5000);
    }

    // EFEITO PARALLAX REMOVIDO - HERO ESTÁTICO
    // Removido: parallax effect para hero section
    // Hero agora permanece fixo, sem movimento baseado em scroll

    // ANIMAÇÕES DE REVEAL REMOVIDAS
    // Removido: addRevealAnimations function
    // Removido: slideInUp keyframes
    // Site agora é completamente estático

    // ESTILOS DE NOTIFICAÇÃO REMOVIDOS - NOTIFICAÇÕES SIMPLES
    // Removido: addNotificationStyles function
    // Notificações agora usam apenas estilos inline básicos

    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Add loading animation for page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded styles
        const loadedStyle = document.createElement('style');
        loadedStyle.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(loadedStyle);
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Any additional scroll handling can go here
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Add focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Apply focus trapping to mobile menu when active
    navToggle.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            trapFocus(navMenu);
        }
    });

    console.log('🌱 Plantando o Futuro - Site carregado com sucesso!');
});

// EFEITOS DE SHAKE/BOUNCE EM ELEMENTOS INTERATIVOS
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar bounce aos cards dos pilares quando clicados
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.remove('animate-bounce');
            setTimeout(() => {
                this.classList.add('animate-bounce');
            }, 10);
        });
    });
    
    // Adicionar wobble aos botões quando clicados
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('btn-loading')) {
                this.classList.remove('animate-wobble');
                setTimeout(() => {
                    this.classList.add('animate-wobble');
                }, 10);
            }
        });
    });
    
    // Adicionar shake aos campos de formulário com erro
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.classList.remove('animate-shake');
            setTimeout(() => {
                this.classList.add('animate-shake');
            }, 10);
        });
    });
    
    // Adicionar bounce aos ícones sociais quando clicados
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.classList.remove('animate-bounce');
            setTimeout(() => {
                this.classList.add('animate-bounce');
            }, 10);
        });
    });
});

// ANIMAÇÕES DE ENTRADA NA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos do hero
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroTitle) heroTitle.classList.add('animate-fade-in-up');
    if (heroSubtitle) heroSubtitle.classList.add('animate-fade-in-up', 'animate-delay-1');
    if (heroButtons) heroButtons.classList.add('animate-fade-in-up', 'animate-delay-2');
    if (heroVisual) heroVisual.classList.add('animate-fade-in-right', 'animate-delay-3');
    
    // Animar cards dos pilares
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-scale-in');
        }, 200 + (index * 100));
    });
    
    // Animar seções principais
    const aboutSection = document.querySelector('.about');
    const projectSection = document.querySelector('.project');
    const contactSection = document.querySelector('.contact');
    
    if (aboutSection) {
        setTimeout(() => aboutSection.classList.add('animate-fade-in-up'), 400);
    }
    if (projectSection) {
        setTimeout(() => projectSection.classList.add('animate-fade-in-left'), 600);
    }
    if (contactSection) {
        setTimeout(() => contactSection.classList.add('animate-fade-in-right'), 800);
    }
});