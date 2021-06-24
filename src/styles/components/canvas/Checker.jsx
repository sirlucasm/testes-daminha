import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const CheckerBoard = styled.div`
	background:#565656;
	padding: 40px;
	width: 560px;
	min-width: 560px;
	box-shadow:0 5px 0 #444, 0 2px 0 #373737, 0 3px 0 #555, 0 4px 0 #474747, 0 15px 0 #666, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
`;

export const CheckerContent = styled.div`
	display: flex;
	max-width: 480px;
	flex-wrap: wrap;
`;

export const NormalChecker = styled.div`
	width: 60px;
	height: 60px;
	padding: 3px;
	cursor: pointer;
	background: ${props => props.bgColor && props.bgColor};
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	.checker-piece {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		z-index: 99;
	}
	
	.primary-piece {
		box-shadow: 1px 4px 0px 0px ${props => props.primaryPieceColor && props.primaryPieceColor};
		background: ${props => props.primaryPieceColor && props.primaryPieceColor};
	}

	.secondary-piece {
		box-shadow: 1px 4px 0px 0px ${props => props.secondaryPieceColor && props.secondaryPieceColor};
		background: ${props => props.secondaryPieceColor && props.secondaryPieceColor};
	}


	.piece-clicked {
		transition: .1s ease;
		background: #846b13cc;
		box-shadow: 1px 4px 0px 0px #675618cc;
	}

	&.recommended-part {
		box-shadow: inset 0px 0px 0 4px #927818cc;
	}

	.dama-piece {
		background-image: url('/assets/coroa.png');
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}
`;