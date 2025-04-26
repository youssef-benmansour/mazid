// Main functionality for the Mazid landing page
document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const userType = document.getElementById('userType').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                showNotification('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simulate form submission (in a real application, this would be an API call)
            simulateFormSubmission(name, email, userType, message);
        });
    }
    
    // Newsletter subscription handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Basic validation
            if (email.trim() === '') {
                showNotification('Veuillez entrer votre adresse email', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            simulateNewsletterSubscription(email);
        });
    }
    
    // Function to simulate form submission with loading state
    function simulateFormSubmission(name, email, userType, message) {
        // Create and show loading indicator
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // Reset form and button
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Votre message a été envoyé avec succès! Nous vous contacterons bientôt.', 'success');
            
            // Log form data (for demonstration)
            console.log('Form submitted:', { name, email, userType, message });
        }, 1500);
    }
    
    // Function to simulate newsletter subscription
    function simulateNewsletterSubscription(email) {
        // Create and show loading indicator
        const submitBtn = newsletterForm.querySelector('button');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // Reset form and button
            newsletterForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Vous êtes maintenant inscrit à notre newsletter!', 'success');
            
            // Log email (for demonstration)
            console.log('Newsletter subscription:', { email });
        }, 1000);
    }
    
    // Create notification system
    function showNotification(message, type = 'info') {
        // Check if notification container exists, if not create it
        let notificationContainer = document.querySelector('.notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
            
            // Style the notification container
            Object.assign(notificationContainer.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '9999'
            });
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification based on type
        Object.assign(notification.style, {
            padding: '12px 20px',
            marginBottom: '10px',
            borderRadius: '5px',
            fontSize: '14px',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            backgroundColor: type === 'success' ? '#9ccd63' : 
                            type === 'error' ? '#f44336' : '#2196f3',
            color: '#fff'
        });
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.marginLeft = '10px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '20px';
        closeBtn.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                notificationContainer.removeChild(notification);
            }, 300);
        });
        
        notification.appendChild(closeBtn);
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notificationContainer.contains(notification)) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (notificationContainer.contains(notification)) {
                        notificationContainer.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Mobile responsive handling
    // Dynamically add styles for mobile nav menu when active
    const style = document.createElement('style');
    style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            padding: 20px;
            z-index: 1000;
        }
        
        .cta-buttons.active {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
            padding: 0 20px 20px;
            background-color: white;
        }
        
        .mobile-menu-toggle.active {
            color: rgb(156, 205, 99);
        }
    }
    `;
    document.head.appendChild(style);

    // Add App Install Prompt for PWA capability
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Update UI to notify the user they can add to home screen
        const downloadSection = document.getElementById('download');
        if (downloadSection) {
            const pwaPrompt = document.createElement('div');
            pwaPrompt.className = 'pwa-prompt';
            pwaPrompt.innerHTML = `
                <p>Vous pouvez installer Mazid comme application sur votre appareil!</p>
                <button class="btn btn-primary install-button">Installer</button>
            `;
            
            // Style the prompt
            Object.assign(pwaPrompt.style, {
                backgroundColor: 'rgba(156, 205, 99, 0.1)',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px',
                display: 'none' // Initially hidden, shown when available
            });
            
            downloadSection.querySelector('.download-content').appendChild(pwaPrompt);
            
            // Show the prompt
            pwaPrompt.style.display = 'block';
            
            // Add click event
            pwaPrompt.querySelector('.install-button').addEventListener('click', () => {
                // Show the install prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                        // Hide the prompt
                        pwaPrompt.style.display = 'none';
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null;
                });
            });
        }
    });

    // Sticky elements on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${current}`) {
                navItem.classList.add('active');
            }
        });
    });
    
    // Add active class style for navigation
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: rgb(156, 205, 99);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);

    // Dynamic copyright year
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', year);
    }
});