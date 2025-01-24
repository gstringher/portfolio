///////////////////////////////////////////////////////////////////////////
// HAMBURGER MENU - HEADER SMALL DISPLAYS
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu ul li a');
const header = document.querySelector('header');
const body = document.body;

function toggleMenu() {
  // const isOpen = menu.classList.toggle('open');
  hamburger.classList.toggle('active');

 // Alterna la classe .open per il menu
  menu.classList.toggle('open');

  if (menu.classList.contains('open')) {
    body.classList.add('fixed'); // Blocca lo scroll
  } else {
    body.classList.remove('fixed'); // Sblocca lo scroll
  }
}

// Gestione del click sul pulsante hamburger
hamburger.addEventListener('click', toggleMenu);

// Chiude il menu e sblocca lo scroll quando si clicca un'ancora
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('open')) toggleMenu();
  });
});

///////////////////////////////////////////////////////////////////////////
// MENU EXPERIENCE - HOMEPAGE

const sidebarItems = document.querySelectorAll('.sidebar li');
const jobs = document.querySelectorAll('.job');

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all sidebar items
        sidebarItems.forEach(i => i.classList.remove('active'));
        // Add active class to the clicked item
        item.classList.add('active');

        // Hide all job descriptions
        jobs.forEach(job => job.classList.remove('active'));
        // Show the targeted job description
        const target = document.getElementById(item.dataset.target);
        target.classList.add('active');
    });
});

///////////////////////////////////////////////////////////////////////////
// HEADER ANIMATION SCROLL
const main = document.querySelector('main');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  // Blocca l'animazione dello scroll se il menu è aperto
  if (menu.classList.contains('open')) return;

  // Calcola la posizione della prima sezione dopo l'hero rispetto alla viewport
  const mainTop = main.getBoundingClientRect().top;

  // Nascondi l'header quando si scorre verso il basso oltre la sezione hero
  if (mainTop <= 150) {
    header.classList.add('hidden');
    header.classList.remove('visible');
  } else {
    header.classList.add('visible');
    header.classList.remove('hidden');
  }

  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

 // Se l'utente scrolla verso l'alto, mostra l'header
 if (currentScrollTop < lastScrollTop) {
  header.classList.add('visible');
  header.classList.remove('hidden');
}
  // Aggiorna la variabile per il prossimo controllo
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

