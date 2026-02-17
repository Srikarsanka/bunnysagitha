document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Hero Mouse Parallax Effect
    // =========================================
    const heroSection = document.getElementById('hero');
    const heroVisual = document.getElementById('heroVisual');
    
    if (heroSection && heroVisual) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            // Move the main visual container slightly opposite to mouse
            heroVisual.style.transform = `translateX(${x}px) translateY(${y}px)`;

            // Move specific floating elements with different intensities
            const avatars = document.querySelectorAll('.avatar');
            avatars.forEach((avatar, index) => {
                const speed = (index + 1) * 2;
                avatar.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });

            const icons = document.querySelectorAll('.floating-ui-icon');
            icons.forEach((icon, index) => {
                const speed = (index + 2) * 1.5;
                icon.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });

            const glassCard = document.querySelector('.glass-card');
            if(glassCard) {
                glassCard.style.transform = `translateX(${x * 3}px) translateY(${y * 3}px)`;
            }
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
             heroVisual.style.transform = 'translateX(0) translateY(0)';
             const allFloating = document.querySelectorAll('.avatar, .floating-ui-icon, .glass-card');
             allFloating.forEach(el => {
                 el.style.transform = 'translate(0,0)';
             });
        });
    }

    // =========================================
    // Scroll Reveal for Sections
    // =========================================
    const playButtons = document.querySelectorAll('.feature-section .play-btn');
    const featureSection = document.querySelector('.feature-section');
    
    playButtons.forEach(btn => {
        // Random position within the container
        const randomX = Math.random() * 80 + 10; // 10% to 90%
        const randomY = Math.random() * 80 + 10; // 10% to 90%
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 3 + 4; // 4s to 7s

        btn.style.left = `${randomX}%`;
        btn.style.top = `${randomY}%`;
        btn.style.animation = `float ${randomDuration}s ease-in-out infinite`;
        btn.style.animationDelay = `${randomDelay}s`;

        // Add slight rotation
        const randomRotate = Math.random() * 30 - 15;
        btn.style.transform = `rotate(${randomRotate}deg)`;
    });

    // =========================================
    // Video Modal Logic
    // =========================================
    const modal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalViews = document.getElementById('modalViews');
    const videoPlaceholder = document.querySelector('.video-placeholder-modal');

    function openModal(title, views) {
        modal.classList.add('open');
        modalTitle.textContent = title || "Cinematic Edit";
        modalViews.textContent = views || "1.5M Views";
        // Here you would normally inject the video iframe or source
        videoPlaceholder.textContent = "Playing: " + (title || "Cinematic Edit");
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModalFunc() {
        modal.classList.remove('open');
        // Stop video logic would go here
        videoPlaceholder.textContent = "Video Stopped";
        document.body.style.overflow = '';
    }

    // Event Listeners for Play Buttons
    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
             // In a real app, you'd get data attributes for video ID
            openModal("Feature Presentation", "2.1M Views");
        });
    });

    // Event Listeners for Video Cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            const views = card.querySelector('p').textContent;
            openModal(title, views);
        });
    });

    closeModal.addEventListener('click', closeModalFunc);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModalFunc();
        }
    });

    // =========================================
    // Filter Logic
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoGrid = document.querySelector('.video-grid');

    // Dummy Data for more cards (injecting to show grid)
    const extraVideos = [
        { title: "Urban Drift", views: "850K Views", category: "reels" },
        { title: "Glitch Effect Tutorial", views: "2.3M Views", category: "transitions" },
        { title: "Nike Commercial Spec", views: "500K Views", category: "client" },
        { title: "Travel Vlog Intro", views: "1.1M Views", category: "reels" },
        { title: "3D Camera Tracking", views: "900K Views", category: "transitions" },
    ];

    // Function to create card HTML
    function createCard(video, index) {
        const div = document.createElement('div');
        div.className = `video-card mix ${video.category}`;
        div.style.animationDelay = `${index * 0.1}s`; // Stagger animation
        div.innerHTML = `
            <div class="thumbnail-wrapper">
                <div class="placeholder-thumb"></div>
                <div class="overlay">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
            <div class="card-info">
                <h4>${video.title}</h4>
                <p>${video.views}</p>
            </div>
        `;
        // Add random gradient to new cards
        const gradients = [
            'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 100%)',
            'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
            'linear-gradient(to top, #30cfd0 0%, #330867 100%)'
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        div.querySelector('.placeholder-thumb').style.background = randomGradient;

        // Re-attach listener
        div.addEventListener('click', () => openModal(video.title, video.views));
        
        return div;
    }

    // Populate extra cards
    extraVideos.forEach((video, index) => {
        videoGrid.appendChild(createCard(video, index));
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const allCards = document.querySelectorAll('.video-card');

            allCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // =========================================
    // Scroll Reveal Animation
    // =========================================
    const revealElements = document.querySelectorAll('.section-header, .contact-content, .trending-section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden'); // Add initial hidden class
        revealObserver.observe(el);
    });

    // =========================================
    // Parallax Effect for Video Background (Vertical Scroll)
    // =========================================
    const heroSectionScroll = document.querySelector('.hero');
    const videoBg = document.querySelector('.video-background');
    
    if (heroSectionScroll && videoBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < heroSectionScroll.offsetHeight) {
                videoBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            }
        });
    }

});
