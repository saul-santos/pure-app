import { Counter } from './counter.js';
import { Route, Router } from "./router/router.js";
import { aboutController, homeController } from './controllers/index.js';

const router = new Router({
    home: new Route('home', 'home', homeController),
    about: new Route('about', 'about', aboutController),
}, 'home');

document.getElementById('takeMeHome').addEventListener('click', e => {
    router.goToRoute('home');
});

document.getElementById('addCounterForm').addEventListener('submit', e => {
    e.preventDefault();
    
    let phase = parseInt( e.target.elements[0].value)
    let counter = new Counter(0, phase);

    counter.init();
});
