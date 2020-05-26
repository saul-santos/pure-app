import * as views from '../views/index.js';

/**
 * Router
 * @param {Object} routes
 * @param {String} defaultRoute default route name
 */
function Router(routes, defaultRoute) {
    try {
        if(!routes) throw new Error('routes object is required!');

        this.routes = routes;
        this.defaultRoute = defaultRoute || '/';
    
        this.init();
    } catch (error) {
        console.error('[Router contructor]', error);
    }
}

Router.prototype = {
    current: {},
    init: function init() {
        this.current = this.routes[this.defaultRoute];
        this.hashChange = this.hashChange.bind(this);

        window.addEventListener('hashchange', this.hashChange);

        this.goToRoute(this.defaultRoute);
    },
    render: function render(route) {
        try {
            const view = views[route.htmlName];
            document.getElementById('app').innerHTML = view;
            
            if(route.controller && typeof route.controller === 'function') {
                route.controller();
            }
        } catch (error) {
            console.error('[Router render]', error);
        }

    },
    hashChange: function hashChange() {
        let hash = window.location.hash;

        if(hash.length > 0) {
            this.render(this.routes[hash.substring(1)])
        }
    },
    goToRoute: function goToRoute(name) {
        window.location.hash = `#${name}`;
    }
};

function Route(name, htmlName, controller) {
    this.name = name;
    this.htmlName = htmlName;
    this.controller = controller;
}

export { Router, Route };