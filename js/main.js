document.addEventListener('DOMContentLoaded', () => {
    console.log('BunnyS Portfolio Loaded - Cinematic Mode Active');

    /* =========================================
       HERO PARALLAX
       ========================================= */
    const heroSection = document.querySelector('.hero');
    const icons = document.querySelectorAll('.float-icon');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            icons.forEach(icon => {
                const speed = icon.getAttribute('data-speed') || 20; 
                const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
                const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
                
                // Subtle parallax using transform
                // Note: This overrides CSS animation transform, so we might want to wrap icons in a container
                // For now, let's keep it simple or maybe skip this if it conflicts too much with the float animation
                // icon.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }

    /* =========================================
       VIDEO MODAL LOGIC
       ========================================= */
    const playButtons = document.querySelectorAll('.play-btn');
    const videoModal = document.getElementById('videoModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Open Modal
    // Open Modal Logic
    const floatingPlayBtns = document.querySelectorAll('.floating-play-btn');
    const trendingCards = document.querySelectorAll('.video-card');
    const modalVideoContainer = document.getElementById('modalVideoContainer');

    const modalVideoTitle = document.getElementById('modalVideoTitle');

    function openModal(type, src, title) {
        videoModal.classList.add('active');
        modalVideoContainer.innerHTML = ''; // Clear previous content
        
        // Update Title
        if (modalVideoTitle) {
            modalVideoTitle.textContent = title || "Project Title";
        }

        if (type === 'video' || !type) {
            // Direct Video File (MP4, etc.) - Prioritized
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true; // Important for mobile
            // Remove width/height attributes to let CSS handle it
            video.classList.add('direct-video');
            modalVideoContainer.appendChild(video);
            modalVideoContainer.classList.remove('vertical-mode');
        } else if (type === 'youtube') {
            // YouTube Embed
            const iframe = document.createElement('iframe');
            const origin = window.location.origin === 'file://' ? '*' : window.location.origin;
            iframe.src = `https://www.youtube.com/embed/${src}?autoplay=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = "strict-origin-when-cross-origin";
            iframe.classList.add('youtube-iframe');
            modalVideoContainer.appendChild(iframe);
            modalVideoContainer.classList.remove('vertical-mode');
        } else if (type === 'instagram') {
            // Instagram Embed
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.instagram.com/reel/${src}/embed`;
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
            iframe.classList.add('instagram-iframe');
            modalVideoContainer.appendChild(iframe);
            modalVideoContainer.classList.add('vertical-mode');
        }
    }

    // Event Listeners for Floating Buttons
    floatingPlayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.dataset.videoType;
            const src = btn.dataset.videoSrc;
            openModal(type, src, "Featured Video"); // Default title for floating buttons
        });
    });

    // Event Listeners for Trending Cards
    trendingCards.forEach(card => {
        card.addEventListener('click', () => {
             const type = card.dataset.videoType || 'youtube';
             const src = card.dataset.videoSrc;
             const titleElement = card.querySelector('h3');
             const title = titleElement ? titleElement.textContent : "Cinematic Edit";
             
             if (src) {
                 openModal(type, src, title);
             }
        });
    });

    // Close Modal
    function closeModal() {
        videoModal.classList.remove('active');
        if (modalVideoContainer) {
            modalVideoContainer.innerHTML = ''; // Stop video
        }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    /* =========================================
       FILTERING LOGIC
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to click
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            videoCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });



    /* =========================================
       SCROLL REVEAL ANIMATION
       ========================================= */
    const revealElements = document.querySelectorAll('.section-title, .video-card, .skill-card, .iscl-header, .iscl-info, .iscl-card, .contact-content, .insta-grid, .big-text, .feature-subtitle');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    /* =========================================
       MOBILE MENU LOGIC
       ========================================= */
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.desktop-nav');
    const navLinks = document.querySelectorAll('.desktop-nav a');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle Icon
            if (navMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    /* =========================================
       COUNTER ANIMATION (ISCL)
       ========================================= */
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statsNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            const current = +num.innerText;
            const increment = target / 50; // Faster increment

            if (current < target) {
                num.innerText = Math.ceil(current + increment);
                setTimeout(animateCounters, 30);
            } else {
                num.innerText = target;
            }
        });
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsArea = document.querySelector('.iscl-stats');
    if (statsArea) counterObserver.observe(statsArea);
});
