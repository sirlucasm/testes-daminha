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
		let pieceArea;

		// adicionar recomendações de movimentação para a peça primária (preta)
		if (piece.classList.contains('primary-piece')) {
			$('.recommended-part').removeClass('recommended-part');
			if (rightWall.includes(pieceParentId)) { // checa se a peça está do lado da parede direita
				pieceArea = document.getElementById(pieceParentId - 9);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('primary-piece'))
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'left');
			}
			else if (leftWall.includes(pieceParentId)) {
				pieceArea = document.getElementById(pieceParentId - 7);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('primary-piece'))
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'right');
			} else {
				pieceArea = document.getElementById(pieceParentId - 9);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('primary-piece')) {
					pieceArea.classList.add('recommended-part');
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'left');
				}
				pieceArea = document.getElementById(pieceParentId - 7);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('primary-piece')) {
					pieceArea.classList.add('recommended-part');
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'right');
				}
			}
			if (pieceArea && !pieceArea.children[0]?.classList.contains('primary-piece'))
				pieceArea.classList.add('recommended-part');
		}
		// adicionar recomendações de movimentação para a peça secundária (vermelha)
		else if (piece.classList.contains('secondary-piece')) {
			$('.recommended-part').removeClass('recommended-part');
			if (rightWall.includes(pieceParentId)) { // checa se a peça está do lado da parede direita
				pieceArea = document.getElementById(pieceParentId + 7);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('secondary-piece'))
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'left');
			}
			else if (leftWall.includes(pieceParentId)) {
				pieceArea = document.getElementById(pieceParentId + 9);
				if (!pieceArea.children[0]?.classList.contains('secondary-piece'))
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'right');
			} else {
				pieceArea = document.getElementById(pieceParentId + 9);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('secondary-piece')) {
					pieceArea.classList.add('recommended-part');
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'right');
				}
				pieceArea = document.getElementById(pieceParentId + 7);
				if (pieceArea && !pieceArea.children[0]?.classList.contains('secondary-piece')) {
					pieceArea.classList.add('recommended-part');
					pieceArea.onclick = movePiece.bind(null, pieceArea, piece, 'left');
				}
			}
			if (pieceArea && !pieceArea.children[0]?.classList.contains('secondary-piece'))
				pieceArea.classList.add('recommended-part');
		}

	}

	const movePiece = (pieceArea, pieceToMove, position) => {
		const div = document.createElement('div');
		if (pieceArea.classList.contains('recommended-part')) {
			if (pieceToMove.classList.contains('primary-piece')) {
				pieceToMove.style.position = 'relative';
				// check positions
				if (position === 'right') {
					$(pieceToMove).css('transform', `translateY(-60px) translateX(60px)`);
				} else if (position === 'left') {
					$(pieceToMove).css('transform', `translateY(-60px) translateX(-60px)`);
				}
				if (pieceArea.children[0]?.classList.contains('secondary-piece'))
					capturePiece(pieceArea.children[0])

				// make the move after timeout
				setTimeout(() => {
					pieceToMove.remove();
					pieceArea.appendChild(div);
					div.classList.add('checker-piece', 'primary-piece');
					setDamaPiece(div);
					$('.recommended-part').removeClass('recommended-part');
					$('.piece-clicked').removeClass('piece-clicked');
				}, 250);
			}
			else if (pieceToMove.classList.contains('secondary-piece')) {
				pieceToMove.style.position = 'relative';
				// check positions
				if (position === 'right') {
					$(pieceToMove).css('transform', `translateY(60px) translateX(60px)`);
				} else if (position === 'left') {
					$(pieceToMove).css('transform', `translateY(60px) translateX(-60px)`);
				}
				if (pieceArea.children[0]?.classList.contains('primary-piece'))
					capturePiece(pieceArea.children[0])

				// make the move after timeout
				setTimeout(() => {
					pieceToMove.remove();
					pieceArea.appendChild(div);
					div.classList.add('checker-piece', 'secondary-piece');
					setDamaPiece(div);
					$('.recommended-part').removeClass('recommended-part');
					$('.piece-clicked').removeClass('piece-clicked');
				}, 250);
			}
		}
	}

	const capturePiece = (piece) => {
		piece.remove();
	}

	const setDamaPiece = (piece) => {
		const pieceParentId = parseInt(piece.parentElement.id);
		const primaryPositions = [1, 3, 5, 7];
		const secondaryPositions = [56, 58, 60, 62];
		if (primaryPositions.includes(pieceParentId)) {
			piece.classList.add('dama-piece');
		}
		if (secondaryPositions.includes(pieceParentId)) {
			piece.classList.add('dama-piece');
		}
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