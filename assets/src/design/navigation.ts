///<reference path="../reference.ts" />
module design {
	/**
	 * Instances of class Navigation represent main controller for navigation bar.
	 *
	 * @author  André Heller; mail@andreheller.cz
	 * @version 1.00 — 02/2018
	 */
	export class Navigation
	{
	//== CLASS ATTRIBUTES ==========================================================

		/** Number od scrolled pixels where should be the navigation bar shown. */
		private scrollHeight: number;

		/** Helper var which shows if is the navigation currectly shown or hidden. */
		private isShown: boolean = false;

	//== INSTANCE ATTRIBUTES =======================================================	
	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS =========================================== 
			
		constructor(scrollHeight: number)
		{
			this.scrollHeight = scrollHeight;
		}
	
	//== INSTANCE GETTERS AND SETTERS ==============================================
	//== OTHER NON-PRIVATE INSTANCE METHODS ========================================

		/** 
		 * This method turns showing of navigation bar on. By default the navigation
		 * is shown if the browser is scrolled down at least of number of pixels
		 * defined in constructor.
		 * 
		 * It considers dimesion media queries.
		 */
		public turnOnNavigation(): void {
			//Show navigation and top button
            if (document.body.scrollTop >= this.scrollHeight || 
            	document.documentElement.scrollTop >= this.scrollHeight) {
                document.getElementById("navbar").style.top = "0";

            	if (window.matchMedia("only screen and (max-width: 768px)").matches){
            		document.getElementById("top-button").style.right = "10px"; 
            	}
            	else if (window.matchMedia("only screen and (max-width: 1280px)").matches) {
                    document.getElementById("top-button").style.right = "20px"; 
                }
                else {
                	document.getElementById("top-button").style.right = "70px"; 
                }
                
            }
            //Hide navigation and top button
            else {
                if (window.matchMedia("only screen and (max-width: 768px)").matches){
                    document.getElementById("navbar").style.top = "-55px";
                    //small screen has to hide also responsive links
                    this.toggleNavigationLinks(false);
                }
                else if (window.matchMedia("only screen and (max-width: 1280px)").matches) {
                    document.getElementById("navbar").style.top = "-135px";
                }
                else {
                    document.getElementById("navbar").style.top = "-80px";
                }

                document.getElementById("top-button").style.right = "-50px";
            }
		}

		/**
		 * This method changing the visibility of navigation links. Which are
		 * by default hide under the extra menu on small screens.
		 *
		 * By default it is just switching the visibility agaist its current value,
		 * but it can be owerwitten by a force parameter (false = hide).
		 */
		public toggleNavigationLinks(force?: boolean): void {
            let hide: boolean = typeof force == 'undefined' ? !this.isShown : force;

            if(hide){
                this.showNavigationLinks();
            }
            else {
                this.hideNavigationLinks();
            }
        }

	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================

		// Show navigation links and turn helper boolean
		private showNavigationLinks(): void {
            document.getElementById('navbar-links').style.top = "55px";
            this.isShown = true;
        }

		// Hide navigation links and turn helper boolean
        private hideNavigationLinks(): void {
            document.getElementById('navbar-links').style.top = "-60vh";
            this.isShown = false;
        }
	}
}