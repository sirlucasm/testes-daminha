import { useState } from 'react';
import {
	Container,
	CheckerBoard,
	CheckerContent,
} from '../../styles/components/Checker';
import NormalCheckerPieces from './Normal/NormalCheckerPieces';


export default function Checker() {

	return (
		<Container>
			<CheckerBoard>
				<CheckerContent>
					<NormalCheckerPieces />
				</CheckerContent>
			</CheckerBoard>
		</Container>
	)
}
