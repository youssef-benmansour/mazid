// Animation functions for the Mazid landing page
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            ctaButtons.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Stats counter animation with improved animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2500; // Animation duration in milliseconds
            const stepTime = 20; // Time between steps in milliseconds
            const initialValue = 0;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = initialValue;
            
            // Add easing effect to make the animation more natural
            const easeOutQuad = t => t * (2 - t);
            let progress = 0;
            
            const counter = setInterval(() => {
                progress += 1 / steps;
                if (progress >= 1) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    current = Math.floor(target * easeOutQuad(progress));
                    stat.textContent = current;
                }
            }, stepTime);
        });
    };

    // Intersection Observer for stats animation
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    
                    // Add a staggered entrance animation for stat cards
                    const statCards = document.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, 150 * index);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(statsContainer);
    }
    
    // Parallax effect for about section images
    const aboutSection = document.querySelector('.about');
    const mainImage = document.querySelector('.about-image-main');
    const accentImage = document.querySelector('.about-image-accent');
    const blobShape = document.querySelector('.blob-shape');
    
    if (aboutSection && mainImage && accentImage && blobShape) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const aboutTop = aboutSection.offsetTop;
            const aboutHeight = aboutSection.offsetHeight;
            
            // Only apply parallax when about section is in viewport
            if (scrollPosition > aboutTop - window.innerHeight && 
                scrollPosition < aboutTop + aboutHeight) {
                
                const relativeScroll = scrollPosition - (aboutTop - window.innerHeight);
                const percentage = relativeScroll / (aboutHeight + window.innerHeight);
                
                // Subtle parallax movement
                mainImage.style.transform = `translateY(${percentage * -30}px)`;
                accentImage.style.transform = `translateY(${percentage * -15}px) rotate(${percentage * 5}deg)`;
                blobShape.style.transform = `translate(-50%, -50%) scale(${1 + percentage * 0.1})`;
            }
        });
    }
    
    // Feature cards hover animation
    const aboutFeatureCards = document.querySelectorAll('.about-feature');
    if (aboutFeatureCards.length > 0) {
        aboutFeatureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.feature-icon i');
                icon.classList.add('fa-beat');
                setTimeout(() => {
                    icon.classList.remove('fa-beat');
                }, 1000);
            });
        });
    }
    
    // Features Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        // Function to activate a tab
        const activateTab = (tabId) => {
            // Deactivate all tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate the selected tab
            const selectedBtn = document.querySelector(`[data-tab="${tabId}"]`);
            const selectedContent = document.getElementById(tabId);
            
            if (selectedBtn && selectedContent) {
                selectedBtn.classList.add('active');
                selectedContent.classList.add('active');
                
                // Add entrance animation to the feature image
                const featureImage = selectedContent.querySelector('.feature-image-container');
                if (featureImage) {
                    featureImage.style.transform = 'translateY(20px)';
                    featureImage.style.opacity = '0';
                    
                    setTimeout(() => {
                        featureImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                        featureImage.style.transform = 'translateY(0)';
                        featureImage.style.opacity = '1';
                    }, 50);
                }
            }
        };
        
        // Add click event listeners to tab buttons
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                activateTab(tabId);
            });
        });
        
        // Add click event listeners to mobile feature card detail buttons
        const detailButtons = document.querySelectorAll('.feature-details-btn');
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get tab ID from the href attribute (removing the # symbol)
                const tabId = btn.getAttribute('href').substring(1);
                
                // Switch to desktop view if on mobile
                const featuresTabsEl = document.querySelector('.features-tabs');
                const featuresMobileEl = document.querySelector('.features-mobile');
                
                if (window.innerWidth <= 768) {
                    featuresTabsEl.style.display = 'flex';
                    featuresMobileEl.style.display = 'none';
                }
                
                // Activate the tab and scroll to it
                activateTab(tabId);
                
                // Scroll to the tab content
                const tabsSection = document.querySelector('.features-tabs');
                if (tabsSection) {
                    smoothScroll(tabsSection, 800);
                }
            });
        });
        
        // Initialize the first tab as active
        if (tabBtns.length > 0) {
            const firstTabId = tabBtns[0].getAttribute('data-tab');
            activateTab(firstTabId);
        }
        
        // Add feature list item animation
        const animateFeatureList = () => {
            const activeTab = document.querySelector('.tab-content.active');
            if (!activeTab) return;
            
            const featureItems = activeTab.querySelectorAll('.feature-list li');
            featureItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 100);
            });
        };
        
        // Animate feature list items on tab change
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(animateFeatureList, 100);
            });
        });
        
        // Initial animation for the first tab
        setTimeout(animateFeatureList, 500);
    }
    
    // Feature cards 3D tilt effect
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                // Don't apply the 3D effect if the card has already been flipped
                const cardInner = card.querySelector('.feature-card-inner');
                if (!cardInner.style.transform.includes('rotateY(180deg)')) {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
    
    // Auto-rotate through feature tabs every 8 seconds
    if (tabBtns.length > 0) {
        let currentTabIndex = 0;
        let tabRotationInterval;
        
        const rotateFeatureTabs = () => {
            tabRotationInterval = setInterval(() => {
                currentTabIndex = (currentTabIndex + 1) % tabBtns.length;
                const tabId = tabBtns[currentTabIndex].getAttribute('data-tab');
                activateTab(tabId);
                setTimeout(animateFeatureList, 100);
            }, 8000);
        };
        
        // Start auto-rotation
        rotateFeatureTabs();
        
        // Pause auto-rotation on tab click
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(tabRotationInterval);
                
                // Update current index based on clicked button
                currentTabIndex = Array.from(tabBtns).indexOf(btn);
                
                // Restart auto-rotation after a delay
                setTimeout(rotateFeatureTabs, 15000);
            });
        });
        
        // Pause auto-rotation on hover
        const featuresSection = document.querySelector('.features-tabs');
        if (featuresSection) {
            featuresSection.addEventListener('mouseenter', () => {
                clearInterval(tabRotationInterval);
            });
            
            featuresSection.addEventListener('mouseleave', () => {
                clearInterval(tabRotationInterval);
                rotateFeatureTabs();
            });
        }
    }
    
    // How It Works animations
    const initHowItWorksAnimations = () => {
        // Timeline progress bar animation
        const progressBar = document.querySelector('.progress-bar');
        const timelineSteps = document.querySelectorAll('.timeline-step');
        
        if (progressBar && timelineSteps.length > 0) {
            const animateProgressBar = () => {
                let totalHeight = 0;
                const visibleSteps = [];
                
                // Calculate which steps are in viewport
                timelineSteps.forEach((step, index) => {
                    const rect = step.getBoundingClientRect();
                    const isVisible = (
                        rect.top <= window.innerHeight * 0.8 &&
                        rect.bottom >= window.innerHeight * 0.2
                    );
                    
                    if (isVisible) {
                        visibleSteps.push(index);
                    }
                    
                    if (index < timelineSteps.length - 1) {
                        totalHeight += step.offsetHeight;
                    }
                });
                
                if (visibleSteps.length > 0) {
                    // Get the max visible step index
                    const maxVisibleIndex = Math.max(...visibleSteps);
                    
                    // Calculate progress percentage based on the max visible step
                    const progress = ((maxVisibleIndex + 1) / timelineSteps.length) * 100;
                    progressBar.style.height = `${progress}%`;
                }
            };
            
            // Animate on scroll
            window.addEventListener('scroll', animateProgressBar);
            
            // Initial animation
            setTimeout(animateProgressBar, 500);
        }
        
        // Animate step images on scroll
        const stepImages = document.querySelectorAll('.step-image');
        if (stepImages.length > 0) {
            const stepObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                        stepObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            stepImages.forEach(image => {
                // Set initial state
                image.style.transform = 'translateY(20px)';
                image.style.opacity = '0';
                image.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                
                // Observe the image
                stepObserver.observe(image);
            });
        }
    };
    
    // Initialize How It Works mobile slider
    const initMobileSlider = () => {
        const sliderContainer = document.querySelector('.swiper-container');
        const sliderWrapper = document.querySelector('.swiper-wrapper');
        const slides = document.querySelectorAll('.swiper-slide');
        const pagination = document.querySelector('.swiper-pagination');
        const nextBtn = document.querySelector('.swiper-button-next');
        const prevBtn = document.querySelector('.swiper-button-prev');
        
        if (!sliderContainer || !sliderWrapper || slides.length === 0) return;
        
        let currentIndex = 0;
        const slideWidth = 100; // 100%
        const totalSlides = slides.length;
        
        // Create pagination bullets
        slides.forEach((_, index) => {
            const bullet = document.createElement('span');
            bullet.className = `swiper-pagination-bullet ${index === 0 ? 'swiper-pagination-bullet-active' : ''}`;
            bullet.addEventListener('click', () => {
                goToSlide(index);
            });
            pagination.appendChild(bullet);
        });
        
        // Function to go to a specific slide
        const goToSlide = (index) => {
            if (index < 0) index = 0;
            if (index >= totalSlides) index = totalSlides - 1;
            
            currentIndex = index;
            const offset = -currentIndex * slideWidth;
            sliderWrapper.style.transform = `translateX(${offset}%)`;
            
            // Update pagination
            const bullets = pagination.querySelectorAll('.swiper-pagination-bullet');
            bullets.forEach((bullet, i) => {
                bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
            });
        };
        
        // Event listeners for next and previous buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            const threshold = 50;
            
            if (swipeDistance > threshold) {
                // Swipe right (prev)
                goToSlide(currentIndex - 1);
            } else if (swipeDistance < -threshold) {
                // Swipe left (next)
                goToSlide(currentIndex + 1);
            }
        };
        
        // Auto-slide functionality
        let sliderInterval;
        
        const startAutoSlide = () => {
            sliderInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % totalSlides;
                goToSlide(nextIndex);
            }, 5000);
        };
        
        const stopAutoSlide = () => {
            clearInterval(sliderInterval);
        };
        
        // Start auto-slide
        startAutoSlide();
        
        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });
    };
    
    // Product Categories Animation
    const initProductCategoriesAnimation = () => {
        const categoryCards = document.querySelectorAll('.category-card');
        if (categoryCards.length === 0) return;
        
        // Function to apply the tilt effect
        const applyTiltEffect = (card) => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const posX = e.clientX - centerX;
                const posY = e.clientY - centerY;
                
                // Calculate tilt values (reduce intensity for subtle effect)
                const tiltX = posY / (cardRect.height / 2) * 4; // Max 4 degrees
                const tiltY = -posX / (cardRect.width / 2) * 4; // Max 4 degrees
                
                // Apply transform to the card
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px) scale(1.02)`;
                
                // Subtle shadow movement
                const shadowX = posX / 30;
                const shadowY = posY / 30;
                card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.1)`;
                
                // Move icon slightly
                const icon = card.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = `translateX(${posX / 20}px) translateY(${posY / 20}px)`;
                }
            });
            
            // Reset transform on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                
                const icon = card.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'none';
                }
            });
        };
        
        // Apply tilt effect to each category card
        categoryCards.forEach(applyTiltEffect);
        
        // Animate cards entrance
        const productsSection = document.querySelector('.products-showcase');
        if (productsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    categoryCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 150);
                    });
                    
                    observer.unobserve(productsSection);
                }
            }, { threshold: 0.2 });
            
            observer.observe(productsSection);
        }
    };
    
    // Product chart animation
    const initProductChart = () => {
        const chartSegments = document.querySelectorAll('.chart-segment');
        if (chartSegments.length === 0) return;
        
        // Initially set all segments to 0% height
        chartSegments.forEach(segment => {
            segment.style.height = '0';
        });
        
        // Animate segments when they come into view
        const chartContainer = document.querySelector('.product-chart');
        if (chartContainer) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Animate each segment with a delay
                    chartSegments.forEach((segment, index) => {
                        setTimeout(() => {
                            const targetHeight = segment.style.getPropertyValue('--segment-size');
                            segment.style.height = targetHeight;
                        }, index * 200);
                    });
                    
                    observer.unobserve(chartContainer);
                }
            }, { threshold: 0.5 });
            
            observer.observe(chartContainer);
        }
    };
    
    // Modern Testimonials Carousel
    const initTestimonialsCarousel = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.testimonials .testimonial-btn.prev');
        const nextBtn = document.querySelector('.testimonials .testimonial-btn.next');
        
        if (testimonialCards.length === 0) return;
        
        let currentIndex = 0;
        const totalCards = testimonialCards.length;
        
        // Function to update the carousel display
        const updateCarousel = () => {
            // Update positions based on current index
            testimonialCards.forEach((card, index) => {
                // Calculate relative position
                let position;
                const relativeIndex = (index - currentIndex + totalCards) % totalCards;
                
                if (relativeIndex === 0) {
                    position = "center";
                } else if (relativeIndex === 1 || relativeIndex === (totalCards - 1)) {
                    position = relativeIndex === 1 ? "right" : "left";
                } else if (relativeIndex === 2 || relativeIndex === (totalCards - 2)) {
                    position = relativeIndex === 2 ? "far-right" : "far-left";
                } else {
                    // Hide other cards
                    position = relativeIndex < totalCards / 2 ? "far-right" : "far-left";
                }
                
                card.dataset.position = position;
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Event listeners for previous and next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCarousel();
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Touch swipe functionality
        const track = document.querySelector('.testimonial-track');
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (track) {
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            const handleSwipe = () => {
                const swipeDistance = touchEndX - touchStartX;
                const threshold = 50;
                
                if (swipeDistance > threshold) {
                    // Swipe right (prev)
                    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                    updateCarousel();
                } else if (swipeDistance < -threshold) {
                    // Swipe left (next)
                    currentIndex = (currentIndex + 1) % totalCards;
                    updateCarousel();
                }
            };
        }
        
        // Auto-rotate functionality
        let carouselInterval;
        
        const startAutoRotate = () => {
            carouselInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                updateCarousel();
            }, 5000);
        };
        
        const stopAutoRotate = () => {
            clearInterval(carouselInterval);
        };
        
        // Start auto-rotation
        startAutoRotate();
        
        // Pause on hover
        const testimonialsCarousel = document.querySelector('.testimonials-3d-carousel');
        if (testimonialsCarousel) {
            testimonialsCarousel.addEventListener('mouseenter', stopAutoRotate);
            testimonialsCarousel.addEventListener('mouseleave', startAutoRotate);
        }
        
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoRotate();
            } else {
                startAutoRotate();
            }
        });
        
        // Initialize the carousel
        updateCarousel();
    };
    
    // Testimonial stats counter animation
    const initTestimonialStats = () => {
        const statValues = document.querySelectorAll('.testimonial-stat .stat-value');
        if (statValues.length === 0) return;
        
        const animateStats = () => {
            statValues.forEach(stat => {
                const value = parseFloat(stat.getAttribute('data-value'));
                const isDecimal = value % 1 !== 0;
                const duration = 2000; // Animation duration in milliseconds
                const steps = 60; // Total animation steps
                const stepTime = duration / steps;
                let current = 0;
                
                // Add easing effect for more natural animation
                const easeOutQuad = t => t * (2 - t);
                
                const counter = setInterval(() => {
                    current += 1 / steps;
                    
                    if (current >= 1) {
                        stat.textContent = isDecimal ? value.toFixed(1) : value;
                        clearInterval(counter);
                    } else {
                        const easedProgress = easeOutQuad(current);
                        const currentValue = value * easedProgress;
                        stat.textContent = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);
                    }
                }, stepTime);
            });
        };
        
        // Animate when the stats section is in view
        const statsSection = document.querySelector('.testimonials-stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateStats();
                    observer.unobserve(statsSection);
                }
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    };

    // Smooth scroll for navigation links
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        // Easing function
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href');
            // Skip empty links and dropdown toggles
            if (target === '#' || this.classList.contains('dropdown-toggle')) return;
            
            smoothScroll(target, 800);
            
            // Close the mobile menu if it's open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                ctaButtons.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Fade-in animations for elements when they enter the viewport
    const fadeElements = document.querySelectorAll('.feature-card, .stat-card, .step, .category');
    
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }
    
    // Initialize all section animations
    initHowItWorksAnimations();
    initMobileSlider();
    initProductCategoriesAnimation();
    initProductChart();
    initTestimonialsCarousel();
    initTestimonialStats();
});