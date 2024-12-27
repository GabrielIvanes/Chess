import {
	MoveInterface,
	PieceInterface,
	PositionInterface,
} from '../utils/interface';

interface Props {
	piece: PieceInterface;
	position: PositionInterface;
	handleCellClick: (piece: PieceInterface, position: PositionInterface) => void;
	activePosition: PositionInterface | null;
	possibleMoves: MoveInterface[];
	lastMove: MoveInterface | null;
}

function Cell({
	piece,
	position,
	activePosition,
	possibleMoves,
	handleCellClick,
	lastMove,
}: Props) {
	const getPieceSymbol = (piece: PieceInterface) => {
		if (piece.team == 2) {
			switch (piece.num) {
				case 1:
					return '♟'; // Pawn
				case 2:
					return '♜'; // Rook
				case 3:
					return '♞'; // Knight
				case 4:
					return '♝'; // Bishop
				case 5:
					return '♛'; // Queen
				case 6:
					return '♚'; // King
				default:
					return '';
			}
		} else {
			switch (piece.num) {
				case 1:
					return '♙'; // Pawn
				case 2:
					return '♖'; // Rook
				case 3:
					return '♘'; // Knight
				case 4:
					return '♗'; // Bishop
				case 5:
					return '♕'; // Queen
				case 6:
					return '♔'; // King
				default:
					return '';
			}
		}
	};

	const isPossibleMove = possibleMoves.some(
		(move) => move.to.row === position.row && move.to.col === position.col
	);

	return (
		<div
			className={`
				aspect-square flex items-center justify-center text-5xl
				${
					(activePosition != null &&
						activePosition.row == position.row &&
						activePosition.col == position.col) ||
					(lastMove != null &&
						lastMove.to.row == position.row &&
						lastMove.to.col == position.col) ||
					(lastMove != null &&
						lastMove.from.row == position.row &&
						lastMove.from.col == position.col)
						? (position.row + position.col) % 2 === 0
							? 'bg-[var(--active-light-cell)]'
							: 'bg-[var(--active-dark-cell)]'
						: (position.row + position.col) % 2 === 0
						? 'bg-[var(--light-cell)]'
						: 'bg-[var(--dark-cell)]'
				}
				${piece.team === 1 ? 'text-[var(--piece-light)]' : 'text-[var(--piece-dark)]'}
                font-bold
			`}
			onClick={() => {
				handleCellClick(piece, position);
			}}
		>
			<div
				className={`
				cursor-pointer
				${
					piece.team === 1
						? 'drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]'
						: 'drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]'
				}
			`}
			>
				{getPieceSymbol(piece)}
			</div>
			{isPossibleMove && (
				<div
					className={`absolute pointer-events-none
					${
						activePosition != null
							? piece.num !== 0
								? 'w-[60px] h-[60px] border-2 border-black/20 rounded-full'
								: 'w-3 h-3 rounded-full bg-black/20'
							: ''
					}`}
				/>
			)}
		</div>
	);
}

export default Cell;
