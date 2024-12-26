import { useEffect, useState } from 'react';
import Cell from './Cell';
import {
	CellInterface,
	MoveInterface,
	PieceInterface,
	PositionInterface,
} from '../utils/interface';

function Board() {
	const [board, setBoard] = useState<CellInterface[][]>([]);
	const [lastMove, setLastMove] = useState<MoveInterface | null>(null);
	const [activePosition, setActivePosition] =
		useState<PositionInterface | null>(null);
	const [possibleMoves, setPossibleMoves] = useState<MoveInterface[]>([]);
	const [activeTeam, setActiveTeam] = useState<number>(1);
	const [deadPieces, setDeadPieces] = useState<PieceInterface[]>([]);

	useEffect(() => {
		const initialBoard: CellInterface[][] = [
			// Black pieces (team 1)
			[
				{ piece: { num: 2, team: 2 }, position: { row: 0, col: 0 } },
				{ piece: { num: 3, team: 2 }, position: { row: 0, col: 1 } },
				{ piece: { num: 4, team: 2 }, position: { row: 0, col: 2 } },
				{ piece: { num: 5, team: 2 }, position: { row: 0, col: 3 } },
				{ piece: { num: 6, team: 2 }, position: { row: 0, col: 4 } },
				{ piece: { num: 4, team: 2 }, position: { row: 0, col: 5 } },
				{ piece: { num: 3, team: 2 }, position: { row: 0, col: 6 } },
				{ piece: { num: 2, team: 2 }, position: { row: 0, col: 7 } },
			],
			[
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 0 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 1 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 2 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 3 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 4 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 5 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 6 } },
				{ piece: { num: 1, team: 2 }, position: { row: 1, col: 7 } },
			],
			[
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 3 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 2, col: 7 } },
			],
			[
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 3 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 3, col: 7 } },
			],
			[
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 3 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 4, col: 7 } },
			],
			[
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 0 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 1 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 2 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 3 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 4 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 5 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 6 } },
				{ piece: { num: 1, team: 1 }, position: { row: 5, col: 7 } },
			],
			[
				{ piece: { num: 2, team: 1 }, position: { row: 6, col: 0 } },
				{ piece: { num: 3, team: 1 }, position: { row: 6, col: 1 } },
				{ piece: { num: 4, team: 1 }, position: { row: 6, col: 2 } },
				{ piece: { num: 5, team: 1 }, position: { row: 6, col: 3 } },
				{ piece: { num: 6, team: 1 }, position: { row: 6, col: 4 } },
				{ piece: { num: 4, team: 1 }, position: { row: 6, col: 5 } },
				{ piece: { num: 3, team: 1 }, position: { row: 6, col: 6 } },
				{ piece: { num: 2, team: 1 }, position: { row: 6, col: 7 } },
			],
		];

		setBoard(initialBoard);
	}, []);

	function handlePieceClick(
		piece: PieceInterface,
		position: PositionInterface
	) {
		let moves: MoveInterface[] = possibleMoves;
		const tmpBoard = board;
		if (
			moves.some(
				(move) => move.to.row === position.row && move.to.col === position.col
			)
		) {
			const move = moves.find(
				(move) => move.to.row === position.row && move.to.col === position.col
			);
			const tmpDeadPieces = deadPieces;
			if (!move) return;
			if (tmpBoard[move.to.row][move.to.col].piece.num != 0) {
				tmpDeadPieces.push(tmpBoard[move.to.row][move.to.col].piece);
			}
			tmpBoard[move.to.row][move.to.col].piece = move.piece;
			tmpBoard[move.from.row][move.from.col].piece = { num: 0, team: 0 };
			setBoard(tmpBoard);
			setActiveTeam(move.piece.team == 1 ? 2 : 1);
			setDeadPieces(tmpDeadPieces);
			setActivePosition(null);
			setPossibleMoves([]);
			setLastMove(move);
		} else {
			moves = [];
			if (piece.num != 0 && piece.team == activeTeam) {
				setActivePosition(position);
			} else {
				setActivePosition(null);
			}
			console.log(
				'row:',
				position.row,
				'col:',
				position.col,
				'num:',
				piece.num,
				'team:',
				piece.team
			);
			if (piece.team == activeTeam) {
				switch (piece.num) {
					case 0:
						break;
					case 1:
						moves = movePawn(piece, position, tmpBoard);
						break;
					case 2:
						moves = moveRook(piece, position, tmpBoard);
						break;
					case 3:
						moves = moveKnight(piece, position, tmpBoard);
						break;
					case 4:
						moves = moveBishop(piece, position, tmpBoard);
						break;
					case 5:
						moves = moveQueen(piece, position, tmpBoard);
						break;
					case 6:
						moves = moveKing(piece, position, tmpBoard);
						break;
				}
				setPossibleMoves(moves);
				console.log(moves);
			}
		}
	}

	function horizontalMove(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][],
		possibleMoves: MoveInterface[],
		direction: 'left' | 'right'
	) {
		if (direction == 'left') {
			for (let i = position.col - 1; i >= 0; i--) {
				if (!board[position.row] || !board[position.row][i]) {
					break;
				}
				if (board[position.row][i].piece.num != 0) {
					if (board[position.row][i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row, col: i },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: i },
						piece: piece,
					});
				}
			}
		} else if (direction == 'right') {
			for (let i = position.col + 1; i < 8; i++) {
				if (!board[position.row] || !board[position.row][i]) {
					break;
				}
				if (board[position.row][i].piece.num != 0) {
					if (board[position.row][i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row, col: i },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: i },
						piece: piece,
					});
				}
			}
		}
	}

	function verticalMove(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][],
		possibleMoves: MoveInterface[],
		direction: 'up' | 'down'
	) {
		if (direction == 'up') {
			for (let i = position.row - 1; i >= 0; i--) {
				if (!board[i] || !board[i][position.col]) {
					break;
				}

				if (board[i][position.col].piece.num != 0) {
					if (board[i][position.col].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: i, col: position.col },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: i, col: position.col },
						piece: piece,
					});
				}
			}
		} else if (direction == 'down') {
			for (let i = position.row + 1; i < 8; i++) {
				if (!board[i] || !board[i][position.col]) {
					break;
				}

				if (board[i][position.col].piece.num != 0) {
					if (board[i][position.col].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: i, col: position.col },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: i, col: position.col },
						piece: piece,
					});
				}
			}
		}
	}

	function diagonalMove(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][],
		possibleMoves: MoveInterface[],
		direction: 'up-left' | 'up-right' | 'down-left' | 'down-right'
	) {
		if (direction == 'up-left') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row - i < 0 ||
					position.col - i < 0 ||
					!board[position.row - i] ||
					!board[position.row - i][position.col - i]
				)
					break;

				if (board[position.row - i][position.col - i].piece.num != 0) {
					if (
						board[position.row - i][position.col - i].piece.team != piece.team
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row - i, col: position.col - i },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row - i, col: position.col - i },
						piece: piece,
					});
				}
			}
		} else if (direction == 'up-right') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row - i < 0 ||
					position.col + i >= 8 ||
					!board[position.row - i] ||
					!board[position.row - i][position.col + i]
				)
					break;

				if (board[position.row - i][position.col + i].piece.num != 0) {
					if (
						board[position.row - i][position.col + i].piece.team != piece.team
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row - i, col: position.col + i },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row - i, col: position.col + i },
						piece: piece,
					});
				}
			}
		} else if (direction == 'down-left') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row + i >= 8 ||
					position.col - i < 0 ||
					!board[position.row + i] ||
					!board[position.row + i][position.col - i]
				)
					break;

				if (board[position.row + i][position.col - i].piece.num != 0) {
					if (
						board[position.row + i][position.col - i].piece.team != piece.team
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row + i, col: position.col - i },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row + i, col: position.col - i },
						piece: piece,
					});
				}
			}
		} else if (direction == 'down-right') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row + i >= 8 ||
					position.row + i >= 8 ||
					!board[position.row + i] ||
					!board[position.row + i][position.col + i]
				)
					break;

				if (board[position.row + i][position.col + i].piece.num != 0) {
					if (
						board[position.row + i][position.col + i].piece.team != piece.team
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row + i, col: position.col + i },
							piece: piece,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row + i, col: position.col + i },
						piece: piece,
					});
				}
			}
		}
	}

	// add "en passant" and "promotion" to the function and verify king safety (maybe in a separate function)
	function movePawn(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][]
	) {
		const initialRow = piece.team == 1 ? 5 : 1;
		const possibleMoves: MoveInterface[] = [];

		const isPawnInInitialRow = position.row == initialRow;
		console.log('initialRow', initialRow, 'position.row', position.row);
		if (piece.team == 1) {
			if (
				board[position.row - 1][position.col] &&
				board[position.row - 1][position.col].piece.num == 0
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col },
					piece: piece,
				});
				if (isPawnInInitialRow) {
					if (
						board[position.row - 2][position.col] &&
						board[position.row - 2][position.col].piece.num == 0
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row - 2, col: position.col },
							piece: piece,
						});
					}
				}
			}
			if (
				board[position.row - 1][position.col - 1] &&
				board[position.row - 1][position.col - 1].piece.num != 0 &&
				board[position.row - 1][position.col - 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col - 1 },
					piece: piece,
				});
			}
			if (
				board[position.row - 1][position.col + 1] &&
				board[position.row - 1][position.col + 1].piece.num != 0 &&
				board[position.row - 1][position.col + 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col + 1 },
					piece: piece,
				});
			}
		} else if (piece.team == 2) {
			if (
				board[position.row + 1][position.col] &&
				board[position.row + 1][position.col].piece.num == 0
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col },
					piece: piece,
				});
				if (isPawnInInitialRow) {
					if (
						board[position.row + 2][position.col] &&
						board[position.row + 2][position.col].piece.num == 0
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row + 2, col: position.col },
							piece: piece,
						});
					}
				}
			}
			if (
				board[position.row + 1][position.col - 1] &&
				board[position.row + 1][position.col - 1].piece.num != 0 &&
				board[position.row + 1][position.col - 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col - 1 },
					piece: piece,
				});
			}
			if (
				board[position.row + 1][position.col + 1] &&
				board[position.row + 1][position.col + 1].piece.num != 0 &&
				board[position.row + 1][position.col + 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col + 1 },
					piece: piece,
				});
			}
		}
		return possibleMoves;
	}

	function moveRook(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];
		horizontalMove(piece, position, board, possibleMoves, 'left');
		horizontalMove(piece, position, board, possibleMoves, 'right');
		verticalMove(piece, position, board, possibleMoves, 'up');
		verticalMove(piece, position, board, possibleMoves, 'down');

		return possibleMoves;
	}

	function moveKnight(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];

		// All possible knight moves
		const moves = [
			[-2, -1],
			[-2, 1], // Up 2, left/right 1
			[2, -1],
			[2, 1], // Down 2, left/right 1
			[-1, -2],
			[1, -2], // Left 2, up/down 1
			[-1, 2],
			[1, 2], // Right 2, up/down 1
		];

		moves.forEach(([rowOffset, colOffset]) => {
			const newRow = position.row + rowOffset;
			const newCol = position.col + colOffset;

			// Check if the new position is within bounds and exists
			if (
				newRow >= 0 &&
				newRow < 8 &&
				newCol >= 0 &&
				newCol < 8 &&
				board[newRow] &&
				board[newRow][newCol]
			) {
				if (
					board[newRow][newCol].piece.num === 0 ||
					board[newRow][newCol].piece.team !== piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: newRow, col: newCol },
						piece: piece,
					});
				}
			}
		});

		return possibleMoves;
	}

	function moveBishop(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];
		diagonalMove(piece, position, board, possibleMoves, 'up-left');
		diagonalMove(piece, position, board, possibleMoves, 'up-right');
		diagonalMove(piece, position, board, possibleMoves, 'down-left');
		diagonalMove(piece, position, board, possibleMoves, 'down-right');

		return possibleMoves;
	}

	function moveQueen(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];
		horizontalMove(piece, position, board, possibleMoves, 'left');
		horizontalMove(piece, position, board, possibleMoves, 'right');
		verticalMove(piece, position, board, possibleMoves, 'up');
		verticalMove(piece, position, board, possibleMoves, 'down');
		diagonalMove(piece, position, board, possibleMoves, 'up-left');
		diagonalMove(piece, position, board, possibleMoves, 'up-right');
		diagonalMove(piece, position, board, possibleMoves, 'down-left');
		diagonalMove(piece, position, board, possibleMoves, 'down-right');

		return possibleMoves;
	}

	function moveKing(
		piece: PieceInterface,
		position: PositionInterface,
		board: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];

		// All possible king moves (including diagonals)
		const moves = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1],
		];

		moves.forEach(([rowOffset, colOffset]) => {
			const newRow = position.row + rowOffset;
			const newCol = position.col + colOffset;

			// Check if the new position is within bounds and exists
			if (
				newRow >= 0 &&
				newRow < 8 &&
				newCol >= 0 &&
				newCol < 8 &&
				board[newRow] &&
				board[newRow][newCol]
			) {
				const targetPiece = board[newRow][newCol].piece;

				// Can move if square is empty or contains enemy piece
				if (targetPiece.num === 0 || targetPiece.team !== piece.team) {
					possibleMoves.push({
						from: position,
						to: { row: newRow, col: newCol },
						piece: piece,
					});
				}
			}
		});

		return possibleMoves;
	}

	return (
		<section className='grid grid-cols-8 gap-0 w-[600px] border border-[hsl(var(--border))]'>
			{board.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<Cell
						key={`${rowIndex}-${colIndex}`}
						piece={cell.piece}
						position={cell.position}
						activePosition={activePosition}
						handlePieceClick={handlePieceClick}
						possibleMoves={possibleMoves}
						lastMove={lastMove}
					/>
				))
			)}
		</section>
	);
}

export default Board;
