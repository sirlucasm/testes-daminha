import { useState, useEffect } from 'react';

// imports
import {
	NormalChecker
} from '../../../styles/components/Checker';
import {
	CHECKER_DIMENSION_NORMAL,
	CHECKER_TOTAL_NORMAL
} from '../../../constants/checker';
import $ from 'jquery';

function NormalCheckerPieces() {
	const [primaryBgColor, setPrimaryBgColor] = useState('rgba(0,0,0, .8)');
	const [secondaryBgColor, setSecondaryBgColor] = useState('#f0ebebcc');
	const [primaryPieceColor, setPrimaryPieceColor] = useState('#272525cc');
	const [secondaryPieceColor, setSecondaryPieceColor] = useState('#521c1ccc');
	const [player, setPlayer] = useState('primary');
	const [selectedPiece, setSelectedPiece] = useState();
	const leftWall = [0, 8, 16, 24, 32, 40, 48, 56];
	const rightWall = [7, 15, 23, 31, 39, 47, 55, 63];
	const primaryInitialPositions = [1, 3, 5, 7];
	const secondaryInitialPositions = [56, 58, 60, 62];

	const handleChecker = (event) => {
		const piece = event.target;
		if (clickablePieces(piece)) {
			selectedPiece?.classList.remove('piece-clicked');
			if (!document.getElementsByClassName('piece-clicked').length > 0) {
				// seleciona a peça e deixa ela com cor diferente
				piece.classList.add('piece-clicked');
				setSelectedPiece(piece);
			}

			availableSpaces(piece);
		}
	}

	const CreateCheckerBoard = () => {
		let arr = [];
		let total = -1;

		// loop para gerar o tabuleiro
		for (let line = 0; line < CHECKER_DIMENSION_NORMAL; line++) {
			for (let column = 0; column < CHECKER_DIMENSION_NORMAL; column++) {
				total++;
				if (line % 2 === 0) {
					if (column % 2 === 0) {
						arr.push(
							<NormalChecker
								onClick={handleChecker}
								bgColor={primaryBgColor}
								primaryPieceColor={primaryPieceColor}
								secondaryPieceColor={secondaryPieceColor}
								key={total}
								id={total}
							></NormalChecker>
						);
					} else {
						arr.push(
							<NormalChecker
								onClick={handleChecker}
								bgColor={secondaryBgColor}
								primaryPieceColor={primaryPieceColor}
								secondaryPieceColor={secondaryPieceColor}
								key={total}
								id={total}
							></NormalChecker>
						);
					}
				} else {
					if (column % 2 === 0) {
						arr.push(
							<NormalChecker
								onClick={handleChecker}
								bgColor={secondaryBgColor}
								primaryPieceColor={primaryPieceColor}
								secondaryPieceColor={secondaryPieceColor}
								key={total}
								id={total}
							></NormalChecker>
						);
					} else {
						arr.push(
							<NormalChecker
								onClick={handleChecker}
								bgColor={primaryBgColor}
								primaryPieceColor={primaryPieceColor}
								secondaryPieceColor={secondaryPieceColor}
								key={total}
								id={total}
							></NormalChecker>
						);
					}
				}
			}
		}
		return arr;
	}

	const givePrimaryCheckerPieces = () => {
		let checkerArea;
		let total = -1;
		let div;

		// distribui as peças primárias
		for (let line = 0; line < 24; line++) {
			total++;
			checkerArea = document.getElementById(line);
			if (line % 2 == 1 && total < 8) {
				div = document.createElement('div')
				checkerArea.appendChild(div);
				div.classList.add('checker-piece', 'secondary-piece');
			}
			if (line % 2 == 0 && total >= 8 && total < 16) {
				div = document.createElement('div')
				checkerArea.appendChild(div);
				div.classList.add('checker-piece', 'secondary-piece');
			}
			if (line % 2 == 1 && total >= 16 && total < 24) {
				div = document.createElement('div')
				checkerArea.appendChild(div);
				div.classList.add('checker-piece', 'secondary-piece');
			}
		}
	}

	const giveSecondaryCheckerPieces = () => {
		let checkerArea;
		let total = 40;
		let div;

		// distribui as peças secundárias
		for (let line = 40; line < 64; line++) {
			total++;
			checkerArea = document.getElementById(line);
			if (line % 2 == 0 && total < 49) {
				div = document.createElement('div')
				checkerArea.appendChild(div);
				div.classList.add('checker-piece', 'primary-piece');
			}
			if (line % 2 == 1 && total >= 49 && total < 57) {
				div = document.createElement('div')
				checkerArea.appendChild(div);
				div.classList.add('checker-piece', 'primary-piece');
			}
			if (line % 2 == 0 && total >= 57 && total < 64) {
				div = document.createElement('div')
				checkerArea.appendChild(div);
				div.classList.add('checker-piece', 'primary-piece');
			}
		}
	}

	const availableSpaces = (piece) => {
		const pieceParentId = parseInt(piece.parentElement.id);
		const piecesPositions = {
			primaryRightPiece: pieceParentId - 7,
			primaryLeftPiece: pieceParentId - 9,
			secondaryRightPiece: pieceParentId + 9,
			secondaryLeftPiece: pieceParentId + 7,
		};
		const piecesPositionsWithEnemies = {
			primaryRightPiece: piecesPositions.primaryRightPiece - 7,
			primaryLeftPiece: piecesPositions.primaryLeftPiece - 9,
			secondaryRightPiece: piecesPositions.secondaryRightPiece + 9,
			secondaryLeftPiece: piecesPositions.secondaryLeftPiece + 7
		};
		let pieceArea;
		// remove todas recomendações anteriores
		$('.recommended-part').removeClass('recommended-part');

		if (!isDamaPiece(piece)) {
			// >>>>>>  PEÇA PRIMÁRIA (PRETA)  <<<<<<
			if (piece.classList.contains('primary-piece')) {
				pieceArea = document.getElementById(piecesPositions.primaryRightPiece);
				if (pieceArea && !rightWall.includes(pieceParentId)) { // --- LADO DIREITO
					// verificar se espaço não contém peça preta e se não contém peça vermelha
					// caso tenha, não irá recomendar o espaço
					if (!pieceArea?.children[0]?.classList.contains('primary-piece') && !pieceArea?.children[0]?.classList.contains('secondary-piece')) { // bloqueia movimento se o espaço já está com alguma peça
						pieceArea.classList.add('recommended-part');
					}
					// verificar se espaço contém peça vermelha para capturar
					if (
						pieceArea?.children[0]?.classList.contains('secondary-piece') &&
						!rightWall.includes(piecesPositions.primaryRightPiece)
					) { // espaço tem peça inimiga
						pieceArea = document.getElementById(piecesPositionsWithEnemies.primaryRightPiece);
						// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
						if (pieceArea && !pieceArea?.children[0]?.classList.contains('primary-piece') && !pieceArea?.children[0]?.classList.contains('secondary-piece'))
							pieceArea.classList.add('recommended-part');
					}
					if (pieceArea) pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'right', 'primary-piece');
				}

				pieceArea = document.getElementById(piecesPositions.primaryLeftPiece);
				if (pieceArea && !leftWall.includes(pieceParentId)) { // --- LADO ESQUERDO
					// verificar se espaço não contém peça preta e se não contém peça vermelha
					// caso tenha, não irá recomendar o espaço
					if (!pieceArea?.children[0]?.classList.contains('primary-piece') && !pieceArea?.children[0]?.classList.contains('secondary-piece')) { // bloqueia movimento se o espaço já está com alguma peça
						pieceArea?.classList.add('recommended-part');
					}
					// verificar se espaço contém peça vermelha para capturar
					if (
						pieceArea?.children[0]?.classList.contains('secondary-piece') &&
						!leftWall.includes(piecesPositions.primaryLeftPiece)
					) { // espaço tem peça inimiga
						pieceArea = document.getElementById(piecesPositionsWithEnemies.primaryLeftPiece);
						// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
						if (pieceArea && !pieceArea?.children[0]?.classList.contains('primary-piece') && !pieceArea?.children[0]?.classList.contains('secondary-piece'))
							pieceArea.classList.add('recommended-part');
					}
					if (pieceArea) pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'left', 'primary-piece');
				}
			}

			// >>>>>>  PEÇA SECUNDÁRIA (VERMELHA)  <<<<<<
			else if (piece.classList.contains('secondary-piece')) {
				pieceArea = document.getElementById(piecesPositions.secondaryRightPiece);
				if (pieceArea && !rightWall.includes(pieceParentId)) { // --- LADO DIREITO
					// verificar se espaço não contém peça vermelha e se não contém peça preta
					// caso tenha, não irá recomendar o espaço
					if (!pieceArea.children[0]?.classList.contains('secondary-piece') && !pieceArea?.children[0]?.classList.contains('primary-piece')) { // bloqueia movimento se o espaço já está com alguma peça
						pieceArea?.classList.add('recommended-part');
					}
					// verificar se espaço contém peça vermelha para capturar
					if (
						pieceArea?.children[0]?.classList.contains('primary-piece') &&
						!rightWall.includes(piecesPositions.secondaryRightPiece)
					) { // espaço tem peça inimiga
						pieceArea = document.getElementById(piecesPositionsWithEnemies.secondaryRightPiece);
						// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
						if (pieceArea && !pieceArea?.children[0]?.classList.contains('primary-piece') && !pieceArea?.children[0]?.classList.contains('secondary-piece'))
							pieceArea.classList.add('recommended-part');
					}
					if (pieceArea) pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'right', 'secondary-piece');
				}

				pieceArea = document.getElementById(piecesPositions.secondaryLeftPiece);
				if (pieceArea && !leftWall.includes(pieceParentId)) { // --- LADO ESQUERDO
					// verificar se espaço não contém peça vermelha e se não contém peça preta
					// caso tenha, não irá recomendar o espaço
					if (!pieceArea.children[0]?.classList.contains('secondary-piece') && !pieceArea?.children[0]?.classList.contains('primary-piece')) { // bloqueia movimento se o espaço já está com alguma peça
						pieceArea.classList.add('recommended-part');
					}
					// verificar se espaço contém peça vermelha para capturar
					if (
						pieceArea?.children[0]?.classList.contains('primary-piece') &&
						!leftWall.includes(piecesPositions.secondaryLeftPiece)
					) { // espaço tem peça inimiga
						pieceArea = document.getElementById(piecesPositionsWithEnemies.secondaryLeftPiece);
						// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
						if (pieceArea && !pieceArea?.children[0]?.classList.contains('primary-piece') && !pieceArea?.children[0]?.classList.contains('secondary-piece'))
							pieceArea.classList.add('recommended-part');
					}
					if (pieceArea) pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'left', 'secondary-piece');
				}
			}
		} else { // entrou aqui é pq a peça é uma DAMA
			spacesWithDamaPiece(
				piece,
				pieceArea,
				piecesPositions,
				piecesPositionsWithEnemies
			);
		}

	}

	const movePiece = (pieceArea, pieceToMove, position, piece) => {
		const parentElementId = parseInt(pieceArea?.id);
		const div = document.createElement('div');
		let previousSpace;
		if (pieceArea?.classList.contains('recommended-part')) {
			// >>>>>>  PEÇA PRIMÁRIA (PRETA)  <<<<<<
			if (piece === 'primary-piece') {
				// verifica posições e faz a animação de mover peça
				if (position === 'right') {
					previousSpace = document.getElementById(parentElementId + 7);
					if (!previousSpace.children[0]?.classList.contains('primary-piece')) { // verifica se o espaço tem peça inimiga dentro
						$(pieceToMove).css('transform', `translateY(-120px) translateX(120px)`);
						capturePiece(previousSpace.children[0]);
					}
					else $(pieceToMove).css('transform', `translateY(-60px) translateX(60px)`);
				} else if (position === 'left') {
					previousSpace = document.getElementById(parentElementId + 9);
					if (!previousSpace.children[0]?.classList.contains('primary-piece')) { // verifica se o espaço tem peça inimiga dentro
						$(pieceToMove).css('transform', `translateY(-120px) translateX(-120px)`);
						capturePiece(previousSpace.children[0]);
					}
					else $(pieceToMove).css('transform', `translateY(-60px) translateX(-60px)`);
				}
			}

			// >>>>>>  PEÇA SECUNDÁRIA (VERMELHA)  <<<<<<
			else if (piece === 'secondary-piece') {
				// verifica posições e faz a animação de mover peça
				if (position === 'right') {
					previousSpace = document.getElementById(parentElementId - 9);
					if (!previousSpace.children[0]?.classList.contains('secondary-piece')) { // verifica se o espaço tem peça inimiga dentro
						$(pieceToMove).css('transform', `translateY(120px) translateX(120px)`);
						capturePiece(previousSpace.children[0]);
					}
					else $(pieceToMove).css('transform', `translateY(60px) translateX(60px)`);
				} else if (position === 'left') {
					previousSpace = document.getElementById(parentElementId - 7);
					if (!previousSpace.children[0]?.classList.contains('secondary-piece')) { // verifica se o espaço tem peça inimiga dentro
						$(pieceToMove).css('transform', `translateY(120px) translateX(-120px)`);
						capturePiece(previousSpace.children[0]);
					}
					else $(pieceToMove).css('transform', `translateY(60px) translateX(-60px)`);
				}
			}

			// faz a movimentação com a peça
			setTimeout(() => {
				pieceToMove.remove();
				pieceArea.appendChild(div);
				div.classList.add('checker-piece', piece);
				setDamaPiece(div);
				$('.recommended-part').removeClass('recommended-part');
				$('.piece-clicked').removeClass('piece-clicked');
			}, 250);
		}
	}

	const spacesWithDamaPiece = (piece, pieceArea, piecesPositions, piecesPositionsWithEnemies) => {
		const pieceParentId = parseInt(piece.parentElement.id);

		if (!rightWall.includes(pieceParentId)) { // --- LADO DIREITO
			pieceArea = document.getElementById(piecesPositions.primaryRightPiece);
			// verificar se espaço não contém peça preta e se não contém peça vermelha
			// caso tenha, não irá recomendar o espaço
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('primary-piece') &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece') &&
				(!primaryInitialPositions.includes(pieceParentId) || !secondaryInitialPositions.includes(pieceParentId))
			) { // bloqueia movimento se o espaço já está com alguma peça
				pieceArea.classList.add('recommended-part');
			}

			pieceArea = document.getElementById(piecesPositions.secondaryRightPiece);
			// verificar se espaço não contém peça preta e se não contém peça vermelha
			// caso tenha, não irá recomendar o espaço
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('primary-piece') &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece') &&
				(!primaryInitialPositions.includes(pieceParentId) || !secondaryInitialPositions.includes(pieceParentId))
			) { // bloqueia movimento se o espaço já está com alguma peça
				pieceArea.classList.add('recommended-part');
			}

			verifyIfHaveEnemy(pieceArea, piecesPositionsWithEnemies); // verificar se espaço tem peça inimiga
		}
		if (!leftWall.includes(pieceParentId)) { // --- LADO ESQUERDO
			pieceArea = document.getElementById(piecesPositions.primaryLeftPiece);
			// verificar se espaço não contém peça preta e se não contém peça vermelha
			// caso tenha, não irá recomendar o espaço
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece') &&
				!pieceArea?.children[0]?.classList.contains('primary-piece') &&
				(!primaryInitialPositions.includes(pieceParentId) || !secondaryInitialPositions.includes(pieceParentId))
			) { // bloqueia movimento se o espaço já está com alguma peça
				pieceArea.classList.add('recommended-part');
			}

			pieceArea = document.getElementById(piecesPositions.secondaryLeftPiece);
			// verificar se espaço não contém peça preta e se não contém peça vermelha
			// caso tenha, não irá recomendar o espaço
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('primary-piece') &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece') &&
				(!primaryInitialPositions.includes(pieceParentId) || !secondaryInitialPositions.includes(pieceParentId))
			) { // bloqueia movimento se o espaço já está com alguma peça
				pieceArea.classList.add('recommended-part');
			}

			verifyIfHaveEnemy(pieceArea, piecesPositionsWithEnemies); // verificar se espaço tem peça inimiga
		}
	}

	const verifyIfHaveEnemy = (
		pieceArea,
		piecesPositionsWithEnemies
	) => {
		// verificar se espaço contém peça vermelha para capturar
		if (pieceArea?.children[0]?.classList.contains('secondary-piece')) { // espaço tem peça inimiga
			pieceArea = document.getElementById(piecesPositionsWithEnemies.secondaryLeftPiece);
			// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('primary-piece') &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece')
			)
				pieceArea.classList.add('recommended-part');

			pieceArea = document.getElementById(piecesPositionsWithEnemies.secondaryRightPiece);

			// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('primary-piece') &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece')
			)
				pieceArea.classList.add('recommended-part');
		}
		// verificar se espaço contém peça vermelha para capturar
		if (pieceArea?.children[0]?.classList.contains('primary-piece')) { // espaço tem peça inimiga
			pieceArea = document.getElementById(piecesPositionsWithEnemies.primaryRightPiece);
			// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece') &&
				!pieceArea?.children[0]?.classList.contains('primary-piece')
			)
				pieceArea.classList.add('recommended-part');

			pieceArea = document.getElementById(piecesPositionsWithEnemies.primaryLeftPiece);
			// verifica se novo espaço recomendado não possui peça preta no meio nem peça vermelha
			if (
				pieceArea &&
				!pieceArea?.children[0]?.classList.contains('secondary-piece') &&
				!pieceArea?.children[0]?.classList.contains('primary-piece')
			)
				pieceArea.classList.add('recommended-part');
		}
	}

	const capturePiece = (piece) => {
		piece.remove();
	}

	const setDamaPiece = (piece) => {
		const pieceParentId = parseInt(piece.parentElement.id);
		
		if (primaryInitialPositions.includes(pieceParentId)) {
			piece.classList.add('dama-piece');
		}
		if (secondaryInitialPositions.includes(pieceParentId)) {
			piece.classList.add('dama-piece');
		}
	}

	const isDamaPiece = (piece) => {
		return piece.classList.contains('dama-piece');
	}

	const getPrimaryPieces = () => {
		const primaryPieces = document.getElementsByClassName('primary-piece');
		return primaryPieces;
	}

	const getSecondaryPieces = () => {
		const primaryPieces = document.getElementsByClassName('secondary-piece');
		return primaryPieces;
	}

	const getPieces = () => {
		const primaryPieces = document.getElementsByClassName('checker-piece');
		return primaryPieces;
	}

	const getClickedPieces = () => {
		const clicked = document.getElementsByClassName('piece-clicked');
		return clicked;
	}

	const getAllCheckerPiecesArea = () => {
		let CheckerboardPart = [];
		for (let i = 0; i < CHECKER_TOTAL_NORMAL; i++) {
			let checkerPieceArea = document.getElementById(i);
			CheckerboardPart.push(checkerPieceArea.children);
		}
		return CheckerboardPart;
	}

	const clickablePieces = (pieceArea) => {
		return pieceArea.classList.contains('checker-piece');
	}

	useEffect(() => {
		givePrimaryCheckerPieces();
		giveSecondaryCheckerPieces();
	}, [])

	return CreateCheckerBoard();
}

export default NormalCheckerPieces;