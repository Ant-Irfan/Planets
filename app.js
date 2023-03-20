import { Planets }  from './planets.js';

const bodyElement = document.querySelector('body');
const hamburgerMenu = document.querySelector('.mobile-menu-button');
const navItemContainer = document.querySelector('.nav-items-container');
const planetTitle = document.querySelector('.planet-info-title');
const planetDescription = document.querySelector('.planet-description');
const wikipediaSourceLink = document.querySelector('.planet-info-source a');
const planetRotation = document.getElementById('rotation');
const planetRevolution = document.getElementById('revolution');
const planetRadius = document.getElementById('radius');
const planetTemperature = document.getElementById('temperature');
const planetLinks = document.querySelectorAll('.nav-item');
const planetTitles = document.querySelectorAll('.planet-title');
const overviewButton = document.getElementById('overview-button');
const structureButton = document.getElementById('structure-button');
const surfaceButton = document.getElementById('surface-button');
const planetImage = document.querySelector('.planet-image');
const planetImageInternal = document.querySelector('.planet-image-internal');

let currentPlanet = null;
const planetStates = {
    Overview: 'Overview',
    Structure: 'Structure',
    Geology: 'Geology'
}

window.addEventListener('DOMContentLoaded', initialPlanetLoad);
window.addEventListener('resize', closeMobileMenuOnResize);

hamburgerMenu.addEventListener('click', openMobileMenu);
overviewButton.addEventListener('click', () => {
    setPlanetState(planetStates.Overview, currentPlanet)
})
structureButton.addEventListener('click', () => {
    setPlanetState(planetStates.Structure, currentPlanet)
})
surfaceButton.addEventListener('click', () => {
    setPlanetState(planetStates.Geology, currentPlanet)
})
planetLinks.forEach(planet => {
    const planetTitle = planet.querySelector('.planet-title').textContent
    planet.addEventListener('click', () => {
        setPlanet(planetTitle)
    })
});

function initialPlanetLoad () {
    currentPlanet = Planets[0];
    setPlanet(currentPlanet.name);
    setPlanetState(planetStates.Overview, currentPlanet);
    setPlanetColor(currentPlanet.name);
}

function setPlanet (planetName) {
    const planetToShow = Planets.filter(planet => planet.name === planetName)
    if (planetToShow.length  ===  1) {    
        currentPlanet = planetToShow[0];
        setPlanetInfo(currentPlanet)
        setPlanetState(planetStates.Overview, currentPlanet)
        setPlanetColor(currentPlanet.name);
        setActivePlanetLink(currentPlanet.name);
        closeMobileMenu();
        return;
    }
    alert("Invalid Planet identifier!")
}

function setPlanetInfo(planet) {
    planetTitle.textContent = planet.name
    planetRotation.textContent = planet.rotation;
    planetRevolution.textContent = planet.revolution;
    planetRadius.textContent = planet.radius;
    planetTemperature.textContent = planet.temperature;
}

function setPlanetState (planetState, planet) {
    [overviewButton, structureButton, surfaceButton].forEach(stateButton => {
        stateButton.classList.remove('active')
    })
    planetImageInternal.style.display = 'none';

    switch (planetState) {
        case planetStates.Overview:
            overviewButton.classList.add('active')
            planetDescription.textContent = planet.overview.content
            wikipediaSourceLink.href = planet.overview.source
            planetImage.src = planet.images.planet
            break;
        
        case planetStates.Structure:
            structureButton.classList.add('active')
            planetDescription.textContent = planet.structure.content
            wikipediaSourceLink.href = planet.structure.source
            planetImage.src = planet.images.internal
            break;
        
        case planetStates.Geology:
            surfaceButton.classList.add('active')
            planetDescription.textContent = planet.geology.content
            wikipediaSourceLink.href = planet.geology.source

            planetImageInternal.style.display = 'block';
            planetImage.src = planet.images.planet
            planetImageInternal.src = planet.images.geology
            break;
        
        default:
            alert('Invalid Planet State')
            break;
    }
}

function setPlanetColor (planet) {
    if (bodyElement.hasAttribute('id')) {
        bodyElement.removeAttribute('id')
    }
    bodyElement.setAttribute('id', planet)   
}

function openMobileMenu () {
    navItemContainer.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');

    if (bodyElement.style.overflow === 'hidden') {
        bodyElement.style.overflow = 'auto'
    }
    else {
        bodyElement.style.overflow = 'hidden'
    }
}

function closeMobileMenu () {
    const mobileMenuOpen = hamburgerMenu.classList.contains('active') &&
                           navItemContainer.classList.contains('active');
    if (mobileMenuOpen) {
        hamburgerMenu.classList.remove('active')
        navItemContainer.classList.remove('active')
    }
}

function setActivePlanetLink (planetName) {
    planetTitles.forEach((planet) => {
        if (planet.textContent === planetName) {
            planet.classList.add('active')
        }
        else
            planet.classList.remove('active')
    });
}

function closeMobileMenuOnResize () {
   if (window.innerWidth > 768) {
        closeMobileMenu();
   }
}