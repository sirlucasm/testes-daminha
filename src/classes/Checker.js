// imports
import {
	CHECKER_WIDTH,
	CHECKER_HEIGHT,
	CHECKER_SQUARE,
	CHECKER_DIMENSION_NORMAL
} from '../constants/checker';

export default class Checker {
	constructor(x, y, ctx) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.width = CHECKER_WIDTH;
		this.height = CHECKER_HEIGHT;
		this.square = CHECKER_SQUARE;
		this.primaryBgColor = 'rgba(0,0,0, .8)';
		this.secondaryBgColor = '#f0ebebcc';
	}

	display = () => {
		for (let line = 0; line < CHECKER_DIMENSION_NORMAL; line++) {
			for (let column = 0; column < CHECKER_DIMENSION_NORMAL; column++) {
				this.x = column * this.square;
				this.y = line * this.square;
				if (line % 2 === 0) {
					if (column % 2 === 0) {
						this.ctx.fillStyle = this.primaryBgColor;
						this.ctx.fillRect(this.x, this.y, this.square, this.square);
					}
					else {
						this.ctx.fillStyle = this.secondaryBgColor;
						this.ctx.fillRect(this.x, this.y, this.square, this.square);
					}
				} else {
					if (column % 2 === 0) {
						this.ctx.fillStyle = this.secondaryBgColor;
						this.ctx.fillRect(this.x, this.y, this.square, this.square);
					}
					else {
						this.ctx.fillStyle = this.primaryBgColor;
						this.ctx.fillRect(this.x, this.y, this.square, this.square);
					}
				}

				this.clickEvent();
			}
		}
	};

	clickEvent = () => {
		this.ctx.canvas.addEventListener('click', (e) => {
			console.log(e.pageY)
			const x = Math.floor(e.pageX / this.width);
			const y = Math.floor(e.pageY / this.height);
			// if (x < CHECKER_DIMENSION_NORMAL && y < CHECKER_DIMENSION_NORMAL)
			// 	console.log(x + '< x | y > ' + y)
		})
	}
}