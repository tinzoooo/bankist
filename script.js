'use strict';

///////////////////////////////////////
// Modal window

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContant = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const btnScroll = document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', () => {
    // Modern way
    section1.scrollIntoView({ behavior: 'smooth' });
  });

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link--btn')) {
    if (e.target.classList.contains('openacc')) {
      window.location.href = 'https://bankist-netbanking.netlify.app/';
    }
  } else if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // Removing all classies
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContant.forEach(c => c.classList.remove('operations__content--active'));

  // Adding active class
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
// Passing "ARGUMENTS" into handler

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});

headerObs.observe(header);

// Cookie
const cookieMessage = `<div class="cookie-message">
                        We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>
                       </div>`;
header.insertAdjacentHTML('afterend', cookieMessage);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  document.querySelector('.cookie-message').style.opacity = '0';
  document.querySelector('.cookie-message').style.display = 'none';
});

const sectionsFunction = () => {
  const allSection = document.querySelectorAll('.section');

  function sectionPop(entries, observe) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observe.unobserve(entry.target);
  }

  const sectionObs = new IntersectionObserver(sectionPop, {
    root: null,
    threshold: 0.15,
  });

  allSection.forEach(section => {
    sectionObs.observe(section);
    section.classList.add('section--hidden');
  });

  const imgs = document.querySelectorAll('img[data-src]');

  function lazyLoad(entries, observe) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );

    observe.unobserve(entry.target);
  }

  const lazyLoadObs = new IntersectionObserver(lazyLoad, {
    root: null,
    threshold: 0,
    rootMargin: '-250px',
  });

  imgs.forEach(img => {
    lazyLoadObs.observe(img);
  });
};

sectionsFunction();

// slider
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let curSlite = 0;
  const maxSlide = slides.length;

  const createDots = () => {
    slides.forEach((s, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDots = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = () => {
    createDots();
    activeDots(0);
  };
  init();

  const moveSlider = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  moveSlider(0);

  const nextSlide = () => {
    if (curSlite === maxSlide - 1) {
      curSlite = 0;
    } else {
      curSlite++;
    }
    moveSlider(curSlite);
    activeDots(curSlite);
  };

  const prevSlide = () => {
    if (curSlite === 0) {
      curSlite = maxSlide - 1;
    } else {
      curSlite--;
    }
    moveSlider(curSlite);
    activeDots(curSlite);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      moveSlider(slide);
      activeDots(slide);
    }
  });
};

slider();
