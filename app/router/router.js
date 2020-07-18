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
            if(route.component && typeof route.component === 'function') {
                const view = route.component();
                document.getElementById('app').innerHTML = view;
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
        this.render(this.routes[name]);
    }
};

function Route(name, component) {
    this.name = name;
    this.component = component;
}

export { Router, Route };