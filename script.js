const swiper = new Swiper('.slider-wrapper', {
  // Optional parameters
  loop: true,
  spaceBetween: 30,
  grabCursor: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //Responsive breakpoints

  breakpoints: {
    0:{
        slidesPerView: 1,
    },
    768:{
        slidesPerView: 2,
    },
    1080:{
        slidesPerView: 3,
    },

  }

});







let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.addEventListener("click", () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    document.body.classList.toggle('show-mobile-menu');
});

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
    document.body.classList.remove('show-mobile-menu');
    
}



const typed = new Typed('.multiple-text', {
    strings: ['IT Undergraduate', 'Novice Novel Writer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true
});


/*=============== SKILLS JS ===============*/

// Toggle open/close on header click
document.querySelectorAll('.skills-header').forEach(header => {
    header.addEventListener('click', () => {
        const skillsContent = header.parentElement;

        // Close all other open cards
        document.querySelectorAll('.skills-content').forEach(content => {
            if (content !== skillsContent) {
                content.classList.remove('open');
                // Reset bar widths when closing
                resetBars(content);
            }
        });

        // Toggle clicked card
        skillsContent.classList.toggle('open');

        // Animate bars if now open
        if (skillsContent.classList.contains('open')) {
            animateBars(skillsContent);
        } else {
            resetBars(skillsContent);
        }
    });
});

// Animate skill bars inside a card
function animateBars(card) {
    card.querySelectorAll('.skills-percentage').forEach(bar => {
        const targetWidth = bar.style.width || getComputedStyle(bar).getPropertyValue('width');
        bar.style.width = '0%';
        // Small delay so animation is visible
        setTimeout(() => {
            // Re-apply class-based width by triggering reflow
            bar.style.width = '';
        }, 50);
    });
}

// Reset bars to 0 when card closes
function resetBars(card) {
    card.querySelectorAll('.skills-percentage').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = '';
        }, 400); // restore after card closes
    });
}

// Animate bars on first open card (default open) on page load
window.addEventListener('DOMContentLoaded', () => {
    const firstOpen = document.querySelector('.skills-content.open');
    if (firstOpen) {
        const bars = firstOpen.querySelectorAll('.skills-percentage');
        bars.forEach(bar => {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = '';
            }, 300);
        });
    }
});

// Intersection Observer — animate bars when section scrolls into view
const skillsSection = document.querySelector('#skills');

if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.skills-content.open .skills-percentage').forEach(bar => {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = '';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}



//Contact page

emailjs.init("FeUku1WCWsax7l36N");

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    btn.value = 'Sending...';
    btn.disabled = true;
    status.style.color = '';
    status.textContent = '';

    emailjs.sendForm('service_w6iddxb', 'template_wqld31i', this)
        .then(() => {
            status.style.color = 'green';
            status.textContent = '✅ Message sent! I will get back to you soon.';
            btn.value = 'Send Message';
            btn.disabled = false;
            this.reset();
        })
        .catch((error) => {
            status.style.color = 'red';
            status.textContent = '❌ Failed to send. Please try again.';
            btn.value = 'Send Message';
            btn.disabled = false;
            console.error('EmailJS error:', error);
        });
});
