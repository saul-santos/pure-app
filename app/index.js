import { Counter } from './counter.js';
import { Route, Router } from "./router/router.js";
import { Home, About } from './components/index.js';

const router = new Router({
    home: new Route('home', Home),
    about: new Route('about', About),
}, 'home');

/* document.getElementById('addCounterForm').addEventListener('submit', e => {
    e.preventDefault();
    
    let phase = parseInt( e.target.elements[0].value)
    let counter = new Counter(0, phase);

    counter.init();
}); */
