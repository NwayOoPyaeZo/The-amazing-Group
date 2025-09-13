/* script.js */
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});


// Add loading animation to member cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);


document.querySelectorAll('.member-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Profile page section toggle
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        title.classList.toggle('expanded');
        if (content.classList.contains('show')) {
            content.classList.remove('show');
            content.style.maxHeight = null;
        } else {
            content.classList.add('show');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Adjust max-height on window resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.section-content.show').forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});
