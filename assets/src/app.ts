///<reference path="./reference.ts" />

/**
 * Instance of class Application represents main controller for whole website
 *
 * @author  André Heller; mail@andreheller.cz
 * @version 1.00 — 02/2018
 */
class Application {

	private nav: design.Navigation;
    private scroller: design.Scroller;

    constructor() {
    	this.nav = new design.Navigation(window.innerHeight);
        this.scroller = new design.Scroller(900);
    }
    
    public initialize(): void {
    	window.addEventListener("scroll", () => {return this.nav.turnOnNavigation();});
        document.getElementById('navbutton').addEventListener("click", () => {return this.nav.toggleNavigationLinks();}, false);
        
        document.getElementById('signpost-show-more').addEventListener("click", (e) => {
            return this.scroll(e, document.getElementById("timeline"));
        }, false);

        document.getElementById('navbar-linkTo-timeline').addEventListener("click", (e) => {
            return this.scroll(e, document.getElementById("timeline")); 
        }, false);

        document.getElementById('top-button').addEventListener("click", (e) => {
            return this.scroll(e, document.getElementById("signpost")); 
        }, false);
    }


    private scroll(e, element) {
        e.preventDefault();
        return this.scroller.scrollTo(element);
    }
}

window.onload = (e) => {
    const app = new Application();

    app.initialize(); 
    
    e.target['app'] = app; //document.app 
} 