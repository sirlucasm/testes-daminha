import { useState, useEffect } from 'react';

// imposts
import Game from '../../../classes/Game';
import Checker from '../../../classes/Checker';

function NormalCheckerPieces() {
	const [primaryBgColor, setPrimaryBgColor] = useState('rgba(0,0,0, .8)');
	const [secondaryBgColor, setSecondaryBgColor] = useState('#f0ebebcc');
	const [primaryPieceColor, setPrimaryPieceColor] = useState('#272525cc');
	const [secondaryPieceColor, setSecondaryPieceColor] = useState('#521c1ccc');

	useEffect(() => {
		const game = new Game(0, 0);
		const checker = new Checker(0, 0, game.ctx);
		game.init();

		checker.primaryBgColor = primaryBgColor;
		checker.secondaryBgColor = secondaryBgColor;
		checker.display();
	}, [])

	return (
		<canvas></canvas>
	);
}

export default NormalCheckerPieces;