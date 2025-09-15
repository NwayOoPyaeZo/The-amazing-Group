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

// Add enhanced loading animation to member cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUpEnhanced 0.8s ease forwards';
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

        // Toggle arrow rotation
        title.classList.toggle('expanded');

        // Toggle content visibility with max-height animation
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
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

// Simple typed effect
function typeRoles(element, roles, speed = 150, pause = 2000) {
    let roleIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type() {
        const currentRole = roles[roleIndex];
        if (typing) {
            element.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                typing = false;
                setTimeout(type, pause);
                return;
            }
        } else {
            element.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                typing = true;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(type, speed);
    }

    type();
}

// Initialize typed roles for every profile-role section
document.querySelectorAll('.profile-role').forEach(roleEl => {
    const typedElement = roleEl.querySelector('.typed');
    const roles = roleEl.getAttribute('data-roles');

    if (typedElement && roles) {
        try {
            const rolesArray = JSON.parse(roles);
            if (Array.isArray(rolesArray) && rolesArray.length > 0) {
                typeRoles(typedElement, rolesArray);
            }
        } catch (e) {
            console.error("Invalid data-roles format for:", roleEl, e);
        }
    }
});
