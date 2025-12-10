document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Navbar Glass Effect on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // EmailJS Form Submission
    // Initialize EmailJS with your public key
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    })();

    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.style.opacity = '0.7';

        // Collect form data
        const formData = {
            from_name: document.querySelector('input[placeholder="Full Name"]').value,
            from_email: document.querySelector('input[placeholder="Email Address"]').value,
            service_type: document.querySelector('select').value,
            message: document.querySelector('textarea').value,
            to_name: 'Shivshakti Motors'
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                btn.innerText = 'Request Sent Successfully!';
                btn.style.background = '#4CAF50';
                btn.style.borderColor = '#4CAF50';
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                btn.innerText = 'Failed to Send. Try Again!';
                btn.style.background = '#f44336';
                btn.style.borderColor = '#f44336';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            });
    });

    // Handle Broken Images in Marquee
    document.querySelectorAll('.brand-logo').forEach(img => {
        img.addEventListener('error', function() {
            this.onerror = null; 
            this.remove(); // Remove the broken image entirely
        });
    });

    // Smooth Scroll for Safari/Legacy
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
