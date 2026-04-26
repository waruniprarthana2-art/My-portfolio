/*=============== CARD POPUP JS ===============*/
const modal = document.querySelectorAll('.modal'),
   cardBtn = document.querySelectorAll('.card__product'),
   modalClose = document.querySelectorAll('.modal__close'),
   modalCard = document.querySelectorAll('.modal__card');

/*  Show modal */
let activeModal = (modalClick) => {
   modal[modalClick].classList.add('active-modal');
};

cardBtn.forEach((btn, i) => {
   btn.addEventListener('click', () => {
      activeModal(i);
   });
});

/*  Hide modal on close button */
modalClose.forEach((closeBtn) => {
   closeBtn.addEventListener('click', () => {
      modal.forEach((m) => {
         m.classList.remove('active-modal');
      });
   });
});

/* Hide modal on background click */
modal.forEach((m) => {
   m.addEventListener('click', () => {
      m.classList.remove('active-modal');
   });
});

/*  Don't close modal when clicking inside the card */
modalCard.forEach((card) => {
   card.addEventListener('click', (e) => {
      e.stopPropagation();
   });
});

/*  Intersection Observer to trigger card entrance animation */
const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
         // Stagger each card slightly for a nice cascade effect
         setTimeout(() => {
            entry.target.classList.add('show');
         }, index * 150);

         // Stop observing once animation is triggered
         observer.unobserve(entry.target);
      }
   });
}, { threshold: 0.1 });

// Observe every card
cardBtn.forEach((card) => {
   observer.observe(card);
});



/*=============== NAVBAR TOGGLE ===============*/
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