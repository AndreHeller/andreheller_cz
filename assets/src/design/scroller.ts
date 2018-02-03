///<reference path="../reference.ts" />
module design {
	/**
	 * Instances of class Scroller represents smooth scroller controller.
	 *
	 * @author  André Heller; mail@andreheller.cz
	 * @version 1.00 — 02/2018
	 */
	export class Scroller
	{
	//== CLASS ATTRIBUTES ==========================================================
	//== INSTANCE ATTRIBUTES =======================================================

		/** Time of scrolling in miliseconds. Be careful in case of change. 
		 * It has to be changed also iN CSS body selector. */
		private animateTime: number;	

		/** Reference to document body object */
		private body: any = document.body;

	//== CLASS GETTERS AND SETTERS =================================================
	//== OTHER NON-PRIVATE CLASS METHODS =========================================== 
	
	//##############################################################################
	//== CONSTUCTORS AND FACTORY METHODS =========================================== 
			
		constructor(animateTime: number)
		{
			this.animateTime = animateTime;
		}
	
	//== INSTANCE GETTERS AND SETTERS ==============================================

		/** 
		 * This method simulates scroll effect by translate whole body object up.
		 * Than set hard scroll (without animation) to new coordinates, otherwise 
		 * the body object should return back.
		 */
		public scrollTo(element) {
			let targetOffset = element.offsetTop;
			let currentPosition = this.getPageScroll();

			let cssText = this.body.style.cssText;
			this.body.classList.add('in-transition');

			this.setScrollCoordinates(targetOffset, currentPosition);

			window.setTimeout(() => {
				this.body.classList.remove('in-transition');
				this.body.style.cssText = cssText;
				window.scrollTo(0, targetOffset+1);
			}, this.animateTime);
		}

	//== OTHER NON-PRIVATE INSTANCE METHODS ========================================
	//== PRIVATE AND AUXILIARY CLASS METHODS =======================================
	//== PRIVATE AND AUXILIARY INSTANCE METHODS ====================================

		/** Return actual number of scrolled pixels from top. */
		private getPageScroll(): number {
			let yScroll: number;

			if (window.pageYOffset) {
				yScroll = window.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
				yScroll = document.documentElement.scrollTop;
			} else if (document.body) {
				yScroll = document.body.scrollTop;
			}
			
			return yScroll;
		}

		private getBodyHeight(): number {
			let body = document.body,
			    html = document.documentElement;

			return Math.max( body.scrollHeight, body.offsetHeight, 
			                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		}

		private setScrollCoordinates(targetOffset: number, currentPosition: number): void{
			let scrollDistance: number = 0;
			
			scrollDistance = (currentPosition - targetOffset);	

			if(this.getBodyHeight() - targetOffset < window.innerHeight){
				scrollDistance += window.innerHeight;
			}

			this.body.style.WebkitTransform = "translate(0, " + scrollDistance + "px)";
			this.body.style.MozTransform = "translate(0, " + scrollDistance + "px)";
			this.body.style.transform = "translate(0, " + scrollDistance + "px)";
		}
	}
}