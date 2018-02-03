///<reference path="./reference.ts" />

/**
 * Instance of class Application represents main controller for whole website
 *
 * @author  André Heller; mail@andreheller.cz
 * @version 1.00 — 02/2018
 */
class Application {

	private nav;

    constructor() {
    	this.nav = new design.Navigation(window.innerHeight);
    }
    
    public initialize(): void {
    	window.addEventListener("scroll", () => {return this.nav.turnOnNavigation();});
        document.getElementById('navbutton').addEventListener("click", () => {return this.nav.toggleNavigationLinks();});
    }
}

window.onload = (e) => {
    const app = new Application();

    app.initialize(); 
    
    e.target['app'] = app; //document.app 
}