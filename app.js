//preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
    preloader.classList.add('hide-preloader');
});

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

//NAVIGATION SLIDE
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav li');
    //toggle nav
    burger.addEventListener('click', () => {
        //TOGGLE NAV
        nav.classList.toggle('nav-active')
        //ANIMATE LINKS
        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = ``
            } else {
                link.style.animation = `navFade 0.5s ease forwards ${index / 7}s`;
            }
        });
        //BURGER ANIMATION
        burger.classList.toggle('toggle');
    });
    
}
navSlide();
const navToggle = document.querySelector('.burger');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    
    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function(){
    const scrollHeight = window.pageYOffset;
    // const navHeight = navbar.getBoundingClientRect().height;
    // if(scrollHeight > navHeight){
    //     navbar.classList.add('fixed-nav');
    // } else {
    //     navbar.classList.remove('fixed-nav');
    // }
    //similar to the above but indicating the height you want
    if(scrollHeight>500){
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
});


// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
        //prevent default
        e.preventDefault();
        //navigate to specific spot
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        //calculate the height
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');

        let position = element.offsetTop;

        window.scrollTo({
            left: 0, 
            top: position,
        });
        linksContainer.style.height = 0;
    });
});

const faders = document.querySelectorAll('.section');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        } else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, 
appearOptions);

faders.forEach (fader => {
    appearOnScroll.observe(fader);
});