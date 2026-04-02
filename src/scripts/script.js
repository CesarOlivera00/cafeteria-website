// ============================================
// JAVASCRIPT PARA CAFÉ VILLAZÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // INICIALIZAR AOS ANIMATIONS
    // ============================================
    
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // ============================================
    // NAVEGACIÓN MÓVIL (HAMBURGER MENU)
    // ============================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-active');
            navToggle.classList.toggle('nav-toggle-active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav-menu-active');
                navToggle.classList.remove('nav-toggle-active');
            });
        });
    }
    
    // ============================================
    // SCROLL SUAVE Y NAVEGACIÓN ACTIVA
    // ============================================
    
    // Scroll suave para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Resaltar sección activa en la navegación
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase activa de todos los enlaces
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('nav-link-active');
                });
                
                // Agregar clase activa al enlace correspondiente
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-link-active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ============================================
    // ANIMACIONES AL ENTRAR EN VISTA
    // ============================================
    
    // Función para verificar si un elemento está en vista
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animar elementos cuando entran en vista
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .product-card, .news-card, .gallery-item');
        
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated', 'fade-in-up');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
    
    // ============================================
    // HEADER TRANSPARENTE AL HACER SCROLL
    // ============================================
    
    function updateHeaderStyle() {
        const header = document.querySelector('.header');
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderStyle);
    
    // ============================================
    // GALERÍA LIGHTBOX (OPCIONAL)
    // ============================================
    
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-content"><span class="lightbox-close">&times;</span><img src="" alt=""></div>';
    
    // Estilos para el lightbox
    const lightboxStyles = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            cursor: pointer;
        }
        
        .lightbox.active {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            background: none;
            border: none;
        }
        
        .lightbox-close:hover {
            opacity: 0.7;
        }
    `;
    
    // Agregar estilos al head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);
    
    // Agregar lightbox al body
    document.body.appendChild(lightbox);
    
    // Event listeners para el lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.src;
            const imgAlt = this.alt;
            const lightboxImg = lightbox.querySelector('img');
            
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt;
            lightbox.classList.add('active');
        });
    });
    
    // Cerrar lightbox
    lightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });
    
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        lightbox.classList.remove('active');
    });
    
    // ============================================
    // FORMULARIO DE CONTACTO (SI SE AGREGA EN EL FUTURO)
    // ============================================
    
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se puede agregar la lógica para enviar el formulario
            alert('Gracias por tu mensaje. Te contactaremos pronto.');
            contactForm.reset();
        });
    }
    
    // ============================================
    // CARGA DIFERIDA DE IMÁGENES (LAZY LOADING)
    // ============================================
    
    // Simplificar el lazy loading para evitar problemas con opacity
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Forzar que la imagen sea visible
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img').forEach(img => {
            // Asegurar que las imágenes sean visibles desde el inicio
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
        });
    }
    
    // ============================================
    // UTILIDADES
    // ============================================
    
    // Prevenir el salto brusco al inicio de la página
    if (window.location.hash) {
        window.scrollTo(0, 0);
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    console.log('Café Villazón - Sitio web cargado exitosamente');
});
