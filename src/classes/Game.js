// imports
import {
	CHECKER_HEIGHT,
	CHECKER_WIDTH
} from '../constants/checker';

export default class Game {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = CHECKER_WIDTH;
		this.height = CHECKER_HEIGHT;
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
	}

	init = () => {
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		// requestAnimationFrame(this.init, this.canvas);
	}
}