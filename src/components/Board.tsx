import { useEffect, useState } from 'react';
import Cell from './Cell';
import {
	AlgebricMoveInterface,
	CastlingRightsInterface,
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
	const [algrebricMoves, setAlgrebricMoves] = useState<AlgebricMoveInterface[]>(
		[]
	);
	const [castlingRights, setCastlingRights] = useState<CastlingRightsInterface>(
		{
			white: { kingside: true, queenside: true },
			black: { kingside: true, queenside: true },
		}
	);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);

	useEffect(() => {
		// const initialBoard: CellInterface[][] = [
		// 	// Black pieces (team 1)
		// 	[
		// 		{ piece: { num: 2, team: 2 }, position: { row: 0, col: 0 } },
		// 		{ piece: { num: 3, team: 2 }, position: { row: 0, col: 1 } },
		// 		{ piece: { num: 4, team: 2 }, position: { row: 0, col: 2 } },
		// 		{ piece: { num: 5, team: 2 }, position: { row: 0, col: 3 } },
		// 		{ piece: { num: 6, team: 2 }, position: { row: 0, col: 4 } },
		// 		{ piece: { num: 4, team: 2 }, position: { row: 0, col: 5 } },
		// 		{ piece: { num: 3, team: 2 }, position: { row: 0, col: 6 } },
		// 		{ piece: { num: 2, team: 2 }, position: { row: 0, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 0 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 1 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 2 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 3 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 4 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 5 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 6 } },
		// 		{ piece: { num: 1, team: 2 }, position: { row: 1, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 0 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 1 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 2 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 3 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 4 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 5 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 6 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 2, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 0 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 1 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 2 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 3 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 4 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 5 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 6 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 3, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 0 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 1 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 2 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 3 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 4 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 5 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 6 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 4, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 0 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 1 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 2 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 3 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 4 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 5 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 6 } },
		// 		{ piece: { num: 0, team: 0 }, position: { row: 5, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 0 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 1 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 2 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 3 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 4 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 5 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 6 } },
		// 		{ piece: { num: 1, team: 1 }, position: { row: 6, col: 7 } },
		// 	],
		// 	[
		// 		{ piece: { num: 2, team: 1 }, position: { row: 7, col: 0 } },
		// 		{ piece: { num: 3, team: 1 }, position: { row: 7, col: 1 } },
		// 		{ piece: { num: 4, team: 1 }, position: { row: 7, col: 2 } },
		// 		{ piece: { num: 5, team: 1 }, position: { row: 7, col: 3 } },
		// 		{ piece: { num: 6, team: 1 }, position: { row: 7, col: 4 } },
		// 		{ piece: { num: 4, team: 1 }, position: { row: 7, col: 5 } },
		// 		{ piece: { num: 3, team: 1 }, position: { row: 7, col: 6 } },
		// 		{ piece: { num: 2, team: 1 }, position: { row: 7, col: 7 } },
		// 	],
		// ];
		const initialBoard: CellInterface[][] = [
			// Black pieces (team 1)
			[
				{ piece: { num: 0, team: 0 }, position: { row: 0, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 0, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 0, col: 2 } },
				{ piece: { num: 5, team: 2 }, position: { row: 0, col: 3 } },
				{ piece: { num: 6, team: 2 }, position: { row: 0, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 0, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 0, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 0, col: 7 } },
			],
			[
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 3 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 1, col: 7 } },
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
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 3 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 5, col: 7 } },
			],
			[
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 3 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 6, col: 7 } },
			],
			[
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 0 } },
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 1 } },
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 2 } },
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 3 } },
				{ piece: { num: 6, team: 1 }, position: { row: 7, col: 4 } },
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 5 } },
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 6 } },
				{ piece: { num: 0, team: 0 }, position: { row: 7, col: 7 } },
			],
		];

		setBoard(initialBoard);
		setPossibleMoves([]);
		setActivePosition(null);
		setActiveTeam(1);
		setLastMove(null);
		setDeadPieces([]);
		setCastlingRights({
			white: { kingside: true, queenside: true },
			black: { kingside: true, queenside: true },
		});
		setIsGameOver(false);
	}, []);

	useEffect(() => {
		if (isGameOver) {
			const positionWhiteKing = getPositionOfPiece({ num: 6, team: 1 }, board);
			const positionBlackKing = getPositionOfPiece({ num: 6, team: 2 }, board);
			if (positionWhiteKing && positionBlackKing) {
				if (
					isCellInDanger(
						{ piece: { num: 6, team: 1 }, position: positionWhiteKing },
						board,
						1
					)
				) {
					console.log('Black wins');
				} else if (
					isCellInDanger(
						{ piece: { num: 6, team: 2 }, position: positionBlackKing },
						board,
						2
					)
				) {
					console.log('White wins');
				} else {
					console.log('Draw');
				}
			}
		}
	}, [board, isCellInDanger, isGameOver]);

	function getSquareNotation(position: PositionInterface) {
		const col = String.fromCharCode(position.col + 97);
		const row = (8 - position.row).toString();
		return { col, row };
	}

	function getAlgebricNotation(move: MoveInterface, b: CellInterface[][]) {
		let tmpAlgebricMove: string = '';

		if (move.isCastling) {
			tmpAlgebricMove = move.to.col > move.from.col ? 'O-O' : 'O-O-O'; // Kingside or Queenside castling
		} else {
			switch (move.piece.num) {
				case 1:
					tmpAlgebricMove = '';
					break;
				case 2:
					tmpAlgebricMove = 'R';
					break;
				case 3:
					tmpAlgebricMove = 'N';
					break;
				case 4:
					tmpAlgebricMove = 'B';
					break;
				case 5:
					tmpAlgebricMove = 'Q';
					break;
				case 6:
					tmpAlgebricMove = 'K';
					break;
			}

			if (b[move.to.row][move.to.col].piece.num != 0 || move.isPriseEnPassant) {
				if (move.piece.num == 1) {
					tmpAlgebricMove += getSquareNotation(move.from).col;
				}
				tmpAlgebricMove += 'x';
			}

			tmpAlgebricMove += `${getSquareNotation(move.to).col}${
				getSquareNotation(move.to).row
			}`;

			if (move.isPriseEnPassant) {
				tmpAlgebricMove += 'e.p.';
			}
		}

		return {
			white: activeTeam == 1 ? tmpAlgebricMove : '',
			black: activeTeam == 2 ? tmpAlgebricMove : '',
		};
	}

	function getPositionOfPiece(piece: PieceInterface, b: CellInterface[][]) {
		for (const row of b) {
			for (const cell of row) {
				if (cell.piece.num == piece.num && cell.piece.team == piece.team) {
					return cell.position;
				}
			}
		}
	}

	function movePiece(
		move: MoveInterface,
		isTestingMove: boolean,
		b: CellInterface[][]
	) {
		const tmpBoard = b.map((row) =>
			row.map((cell) => ({
				piece: { ...cell.piece },
				position: { ...cell.position },
			}))
		);
		const tmpDeadPieces = deadPieces;
		const tmpAlgebricMove = getAlgebricNotation(move, tmpBoard);
		let tmpRightCastling = castlingRights;

		if (tmpBoard[move.to.row][move.to.col].piece.num != 0) {
			tmpDeadPieces.push(tmpBoard[move.to.row][move.to.col].piece);
		}

		if (move.piece.num == 1) {
			if (move.piece.team == 1) {
				if (move.isPriseEnPassant) {
					tmpDeadPieces.push(tmpBoard[move.to.row + 1][move.to.col].piece);
					tmpBoard[move.to.row + 1][move.to.col].piece = { num: 0, team: 0 };
				}
			} else {
				if (move.isPriseEnPassant) {
					tmpDeadPieces.push(tmpBoard[move.to.row - 1][move.to.col].piece);
					tmpBoard[move.to.row - 1][move.to.col].piece = { num: 0, team: 0 };
				}
			}
		} else if (move.piece.num == 2) {
			if (move.piece.team == 1) {
				if (move.from.col == 0) {
					tmpRightCastling = {
						white: {
							kingside: castlingRights.white.kingside,
							queenside: false,
						},
						black: castlingRights.black,
					};
				} else if (move.from.col == 7) {
					tmpRightCastling = {
						white: castlingRights.white,
						black: {
							kingside: false,
							queenside: castlingRights.black.queenside,
						},
					};
				}
			} else {
				if (move.from.col == 0) {
					tmpRightCastling = {
						white: castlingRights.white,
						black: {
							kingside: castlingRights.black.kingside,
							queenside: false,
						},
					};
				} else if (move.from.col == 7) {
					tmpRightCastling = {
						white: castlingRights.white,
						black: {
							kingside: false,
							queenside: castlingRights.black.queenside,
						},
					};
				}
			}
		} else if (move.piece.num == 6) {
			if (move.piece.team == 1) {
				tmpRightCastling = {
					white: { kingside: false, queenside: false },
					black: castlingRights.black,
				};
			} else {
				tmpRightCastling = {
					white: castlingRights.white,
					black: { kingside: false, queenside: false },
				};
			}
		}

		if (move.isPriseEnPassant) {
			if (move.piece.team == 1) {
				tmpDeadPieces.push(tmpBoard[move.to.row + 1][move.to.col].piece);
				tmpBoard[move.to.row + 1][move.to.col].piece = { num: 0, team: 0 };
			} else {
				tmpDeadPieces.push(tmpBoard[move.to.row - 1][move.to.col].piece);
				tmpBoard[move.to.row - 1][move.to.col].piece = { num: 0, team: 0 };
			}
		}

		if (move.isCastling) {
			if (move.piece.team == 1) {
				if (move.to.col < move.from.col) {
					tmpBoard[7][3].piece = tmpBoard[7][0].piece;
					tmpBoard[7][0].piece = { num: 0, team: 0 };
				} else {
					tmpBoard[7][5].piece = tmpBoard[7][7].piece;
					tmpBoard[7][7].piece = { num: 0, team: 0 };
				}
			} else {
				if (move.to.col < move.from.col) {
					tmpBoard[0][3].piece = tmpBoard[0][0].piece;
					tmpBoard[0][0].piece = { num: 0, team: 0 };
				} else {
					tmpBoard[0][5].piece = tmpBoard[0][7].piece;
					tmpBoard[0][7].piece = { num: 0, team: 0 };
				}
			}
		}

		tmpBoard[move.to.row][move.to.col].piece = move.piece;
		tmpBoard[move.from.row][move.from.col].piece = { num: 0, team: 0 };

		if (!isTestingMove) {
			setBoard(tmpBoard);
			if (activeTeam == 1) {
				setAlgrebricMoves([...algrebricMoves, tmpAlgebricMove]);
			} else {
				const lastMove = algrebricMoves[algrebricMoves.length - 1];
				lastMove.black = tmpAlgebricMove.black;
				setAlgrebricMoves([...algrebricMoves]);
			}
			setActiveTeam(move.piece.team == 1 ? 2 : 1);
			setDeadPieces(tmpDeadPieces);
			setActivePosition(null);
			setPossibleMoves([]);
			setLastMove(move);
			setCastlingRights(tmpRightCastling);
		}
		return tmpBoard;
	}

	function handleCellClick(piece: PieceInterface, position: PositionInterface) {
		let tmpPossibleMoves: MoveInterface[] = possibleMoves;
		const tmpBoard = board.map((row) =>
			row.map((cell) => ({
				piece: { ...cell.piece },
				position: { ...cell.position },
			}))
		);
		if (isGameOver) return;
		if (
			tmpPossibleMoves.some(
				(tmpPossibleMove) =>
					tmpPossibleMove.to.row === position.row &&
					tmpPossibleMove.to.col === position.col
			)
		) {
			const move = tmpPossibleMoves.find(
				(tmpPossibleMove) =>
					tmpPossibleMove.to.row === position.row &&
					tmpPossibleMove.to.col === position.col
			);
			if (!move) return;
			const newBoard = movePiece(move, false, tmpBoard);
			const opponentTeam = activeTeam == 1 ? 2 : 1;
			if (isEndGame(newBoard, opponentTeam)) {
				setIsGameOver(true);
			}
		} else {
			if (piece.num != 0 && piece.team == activeTeam) {
				setActivePosition(position);
			} else {
				setActivePosition(null);
			}
			tmpPossibleMoves = getPossibleMoves(
				piece,
				position,
				tmpBoard,
				activeTeam
			);
			setPossibleMoves(tmpPossibleMoves);
		}
	}

	function getPossibleMoves(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][],
		activeTeam: number
	) {
		let tmpPossibleMoves: MoveInterface[] = [];

		if (piece.team == activeTeam) {
			switch (piece.num) {
				case 0:
					break;
				case 1:
					tmpPossibleMoves = movePawn(piece, position, b);
					break;
				case 2:
					tmpPossibleMoves = moveRook(piece, position, b);
					break;
				case 3:
					tmpPossibleMoves = moveKnight(piece, position, b);
					break;
				case 4:
					tmpPossibleMoves = moveBishop(piece, position, b);
					break;
				case 5:
					tmpPossibleMoves = moveQueen(piece, position, b);
					break;
				case 6:
					tmpPossibleMoves = moveKing(piece, position, b);
					for (const move of tmpPossibleMoves) {
						const testBoard = testMove(move, b);

						if (
							isCellInDanger(
								{ piece, position: move.to },
								testBoard,
								piece.team
							)
						) {
							tmpPossibleMoves = tmpPossibleMoves.filter(
								(tmpMove) => tmpMove !== move
							);
						}
						if (move.isCastling) {
							if (move.to.col < move.from.col) {
								if (
									isCellInDanger(b[7][4], testBoard, activeTeam) ||
									isCellInDanger(b[7][3], testBoard, activeTeam) ||
									isCellInDanger(b[7][2], testBoard, activeTeam)
								) {
									tmpPossibleMoves = tmpPossibleMoves.filter(
										(tmpMove) => tmpMove !== move
									);
								}
							} else {
								if (
									isCellInDanger(b[7][4], testBoard, activeTeam) ||
									isCellInDanger(b[7][5], testBoard, activeTeam) ||
									isCellInDanger(b[7][6], testBoard, activeTeam)
								) {
									tmpPossibleMoves = tmpPossibleMoves.filter(
										(tmpMove) => tmpMove !== move
									);
								}
							}
						}
					}
					break;
			}
		}

		for (const move of tmpPossibleMoves) {
			const testBoard = testMove(move, b);
			const positionOfKing = getPositionOfPiece(
				{ num: 6, team: activeTeam },
				testBoard
			);
			if (
				positionOfKing &&
				isCellInDanger(
					{ piece: { num: 6, team: activeTeam }, position: positionOfKing },
					testBoard,
					piece.team
				)
			) {
				tmpPossibleMoves = tmpPossibleMoves.filter(
					(tmpMove) => tmpMove !== move
				);
			}
		}
		return tmpPossibleMoves;
	}

	function isEndGame(b: CellInterface[][], teamToCheck: number) {
		const positionOfKing = getPositionOfPiece({ num: 6, team: teamToCheck }, b);
		if (!positionOfKing) return false;
		const allPossibleMoves: MoveInterface[] = [];
		for (const row of b) {
			for (const cell of row) {
				if (cell.piece.team == teamToCheck) {
					allPossibleMoves.push(
						...getPossibleMoves(cell.piece, cell.position, b, teamToCheck)
					);
				}
			}
		}
		if (allPossibleMoves.length == 0) {
			return true;
		} else {
			return false;
		}
	}

	function testMove(
		move: MoveInterface,
		b: CellInterface[][]
	): CellInterface[][] {
		return movePiece(move, true, b);
	}

	function horizontalMove(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][],
		possibleMoves: MoveInterface[],
		direction: 'left' | 'right'
	) {
		if (direction == 'left') {
			for (let i = position.col - 1; i >= 0; i--) {
				if (!b[position.row] || !b[position.row][i]) {
					break;
				}
				if (b[position.row][i].piece.num != 0) {
					if (b[position.row][i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row, col: i },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: i },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		} else if (direction == 'right') {
			for (let i = position.col + 1; i < 8; i++) {
				if (!b[position.row] || !b[position.row][i]) {
					break;
				}
				if (b[position.row][i].piece.num != 0) {
					if (b[position.row][i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row, col: i },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: i },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		}
	}

	function verticalMove(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][],
		possibleMoves: MoveInterface[],
		direction: 'up' | 'down'
	) {
		if (direction == 'up') {
			for (let i = position.row - 1; i >= 0; i--) {
				if (!b[i] || !b[i][position.col]) {
					break;
				}

				if (b[i][position.col].piece.num != 0) {
					if (b[i][position.col].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: i, col: position.col },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: i, col: position.col },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		} else if (direction == 'down') {
			for (let i = position.row + 1; i < 8; i++) {
				if (!b[i] || !b[i][position.col]) {
					break;
				}

				if (b[i][position.col].piece.num != 0) {
					if (b[i][position.col].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: i, col: position.col },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: i, col: position.col },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		}
	}

	function diagonalMove(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][],
		possibleMoves: MoveInterface[],
		direction: 'up-left' | 'up-right' | 'down-left' | 'down-right'
	) {
		if (direction == 'up-left') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row - i < 0 ||
					position.col - i < 0 ||
					!b[position.row - i] ||
					!b[position.row - i][position.col - i]
				)
					break;

				if (b[position.row - i][position.col - i].piece.num != 0) {
					if (b[position.row - i][position.col - i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row - i, col: position.col - i },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row - i, col: position.col - i },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		} else if (direction == 'up-right') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row - i < 0 ||
					position.col + i >= 8 ||
					!b[position.row - i] ||
					!b[position.row - i][position.col + i]
				)
					break;

				if (b[position.row - i][position.col + i].piece.num != 0) {
					if (b[position.row - i][position.col + i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row - i, col: position.col + i },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row - i, col: position.col + i },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		} else if (direction == 'down-left') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row + i >= 8 ||
					position.col - i < 0 ||
					!b[position.row + i] ||
					!b[position.row + i][position.col - i]
				)
					break;

				if (b[position.row + i][position.col - i].piece.num != 0) {
					if (b[position.row + i][position.col - i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row + i, col: position.col - i },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row + i, col: position.col - i },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		} else if (direction == 'down-right') {
			for (let i = 1; i < 8; i++) {
				if (
					position.row + i >= 8 ||
					position.col + i >= 8 ||
					!b[position.row + i] ||
					!b[position.row + i][position.col + i]
				)
					break;

				if (b[position.row + i][position.col + i].piece.num != 0) {
					if (b[position.row + i][position.col + i].piece.team != piece.team) {
						possibleMoves.push({
							from: position,
							to: { row: position.row + i, col: position.col + i },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
					break;
				} else {
					possibleMoves.push({
						from: position,
						to: { row: position.row + i, col: position.col + i },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		}
	}

	function movePawn(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][]
	) {
		const initialRow = piece.team == 1 ? 5 : 1;
		const possibleMoves: MoveInterface[] = [];

		const isPawnInInitialRow = position.row == initialRow;
		if (piece.team == 1) {
			if (
				b[position.row - 1] &&
				b[position.row - 1][position.col] &&
				b[position.row - 1][position.col].piece.num == 0
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col },
					piece: piece,
					isPriseEnPassant: false,
					isCastling: false,
				});
				if (isPawnInInitialRow) {
					if (
						b[position.row - 2] &&
						b[position.row - 2][position.col] &&
						b[position.row - 2][position.col].piece.num == 0
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row - 2, col: position.col },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
				}
			}
			if (
				b[position.row - 1] &&
				b[position.row - 1][position.col - 1] &&
				b[position.row - 1][position.col - 1].piece.num != 0 &&
				b[position.row - 1][position.col - 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col - 1 },
					piece: piece,
					isPriseEnPassant: false,
					isCastling: false,
				});
			}
			if (
				b[position.row - 1] &&
				b[position.row - 1][position.col + 1] &&
				b[position.row - 1][position.col + 1].piece.num != 0 &&
				b[position.row - 1][position.col + 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col + 1 },
					piece: piece,
					isPriseEnPassant: false,
					isCastling: false,
				});
			}
			if (
				lastMove &&
				lastMove.piece.num == 1 && // Piece is a pawn
				position.row == lastMove.to.row && // black pawn is in the same row as the white pawn
				position.col == lastMove.to.col + 1 &&
				lastMove.from.row == lastMove.to.row - 2 // black pawn moved 2 squares
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col - 1 },
					piece: piece,
					isPriseEnPassant: true,
					isCastling: false,
				});
			}
			if (
				lastMove &&
				lastMove.piece.num == 1 && // Piece is a pawn
				position.row == lastMove.to.row && // black pawn is in the same row as the white pawn
				position.col == lastMove.to.col - 1 &&
				lastMove.from.row == lastMove.to.row - 2 // black pawn moved 2 squares
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row - 1, col: position.col + 1 },
					piece: piece,
					isPriseEnPassant: true,
					isCastling: false,
				});
			}
		} else if (piece.team == 2) {
			if (
				b[position.row + 1] &&
				b[position.row + 1][position.col] &&
				b[position.row + 1][position.col].piece.num == 0
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col },
					piece: piece,
					isPriseEnPassant: false,
					isCastling: false,
				});
				if (isPawnInInitialRow) {
					if (
						b[position.row + 2] &&
						b[position.row + 2][position.col] &&
						b[position.row + 2][position.col].piece.num == 0
					) {
						possibleMoves.push({
							from: position,
							to: { row: position.row + 2, col: position.col },
							piece: piece,
							isPriseEnPassant: false,
							isCastling: false,
						});
					}
				}
			}
			if (
				b[position.row + 1] &&
				b[position.row + 1][position.col - 1] &&
				b[position.row + 1][position.col - 1].piece.num != 0 &&
				b[position.row + 1][position.col - 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col - 1 },
					piece: piece,
					isPriseEnPassant: false,
					isCastling: false,
				});
			}
			if (
				b[position.row + 1] &&
				b[position.row + 1][position.col + 1] &&
				b[position.row + 1][position.col + 1].piece.num != 0 &&
				b[position.row + 1][position.col + 1].piece.team != piece.team
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col + 1 },
					piece: piece,
					isPriseEnPassant: false,
					isCastling: false,
				});
			}
			if (
				lastMove &&
				lastMove.piece.num == 1 && // Piece is a pawn
				position.row == lastMove.to.row && // black pawn is in the same row as the white pawn
				position.col == lastMove.to.col + 1 &&
				lastMove.from.row == lastMove.to.row + 2 // white pawn moved 2 squares
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col - 1 },
					piece: piece,
					isPriseEnPassant: true,
					isCastling: false,
				});
			}
			if (
				lastMove &&
				lastMove.piece.num == 1 && // Piece is a pawn
				position.row == lastMove.to.row && // black pawn is in the same row as the white pawn
				position.col == lastMove.to.col - 1 &&
				lastMove.from.row == lastMove.to.row + 2 // white pawn moved 2 squares
			) {
				possibleMoves.push({
					from: position,
					to: { row: position.row + 1, col: position.col + 1 },
					piece: piece,
					isPriseEnPassant: true,
					isCastling: false,
				});
			}
		}
		return possibleMoves;
	}

	function moveRook(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];
		horizontalMove(piece, position, b, possibleMoves, 'left');
		horizontalMove(piece, position, b, possibleMoves, 'right');
		verticalMove(piece, position, b, possibleMoves, 'up');
		verticalMove(piece, position, b, possibleMoves, 'down');

		return possibleMoves;
	}

	function moveKnight(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];

		// All possible knight moves
		const moves = [
			[-2, -1],
			[-2, 1],
			[2, -1],
			[2, 1],
			[-1, -2],
			[1, -2],
			[-1, 2],
			[1, 2],
		];

		moves.forEach(([rowOffset, colOffset]) => {
			const newRow = position.row + rowOffset;
			const newCol = position.col + colOffset;

			// Check if the new position is within bounds and exists
			if (
				newRow >= 0 &&
				newRow < 7 &&
				newCol >= 0 &&
				newCol < 8 &&
				b[newRow] &&
				b[newRow][newCol]
			) {
				if (
					b[newRow][newCol].piece.num === 0 ||
					b[newRow][newCol].piece.team !== piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: newRow, col: newCol },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		});

		return possibleMoves;
	}

	function moveBishop(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];
		diagonalMove(piece, position, b, possibleMoves, 'up-left');
		diagonalMove(piece, position, b, possibleMoves, 'up-right');
		diagonalMove(piece, position, b, possibleMoves, 'down-left');
		diagonalMove(piece, position, b, possibleMoves, 'down-right');

		return possibleMoves;
	}

	function moveQueen(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][]
	) {
		const possibleMoves: MoveInterface[] = [];
		horizontalMove(piece, position, b, possibleMoves, 'left');
		horizontalMove(piece, position, b, possibleMoves, 'right');
		verticalMove(piece, position, b, possibleMoves, 'up');
		verticalMove(piece, position, b, possibleMoves, 'down');
		diagonalMove(piece, position, b, possibleMoves, 'up-left');
		diagonalMove(piece, position, b, possibleMoves, 'up-right');
		diagonalMove(piece, position, b, possibleMoves, 'down-left');
		diagonalMove(piece, position, b, possibleMoves, 'down-right');

		return possibleMoves;
	}

	function moveKing(
		piece: PieceInterface,
		position: PositionInterface,
		b: CellInterface[][]
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

			if (
				newRow >= 0 &&
				newRow < 8 &&
				newCol >= 0 &&
				newCol < 8 &&
				b[newRow] &&
				b[newRow][newCol]
			) {
				if (
					b[newRow][newCol].piece.num === 0 ||
					b[newRow][newCol].piece.team !== piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: newRow, col: newCol },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: false,
					});
				}
			}
		});
		if (piece.team == 1) {
			if (castlingRights.white.kingside) {
				if (
					b[7][5].piece.num == 0 &&
					b[7][6].piece.num == 0 &&
					b[7][7].piece.num == 2 &&
					b[7][7].piece.team == piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: position.col + 2 },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: true,
					});
				}
			}
			if (castlingRights.white.queenside) {
				if (
					b[7][3].piece.num == 0 &&
					b[7][2].piece.num == 0 &&
					b[7][1].piece.num == 0 &&
					b[7][0].piece.num == 2 &&
					b[7][0].piece.team == piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: position.col - 2 },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: true,
					});
				}
			}
		} else {
			if (castlingRights.black.kingside) {
				if (
					b[0][5].piece.num == 0 &&
					b[0][6].piece.num == 0 &&
					b[0][7].piece.num == 2 &&
					b[0][7].piece.team == piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: position.col + 2 },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: true,
					});
				}
			}
			if (castlingRights.black.queenside) {
				if (
					b[0][3].piece.num == 0 &&
					b[0][2].piece.num == 0 &&
					b[0][1].piece.num == 0 &&
					b[0][0].piece.num == 2 &&
					b[0][0].piece.team == piece.team
				) {
					possibleMoves.push({
						from: position,
						to: { row: position.row, col: position.col - 2 },
						piece: piece,
						isPriseEnPassant: false,
						isCastling: true,
					});
				}
			}
		}

		return possibleMoves;
	}

	function isCellInDanger(
		cell: CellInterface,
		b: CellInterface[][],
		activeTeam: number
	) {
		const tmpPossibleMoves = [];
		for (const row of b) {
			for (const cellBoard of row) {
				if (cellBoard.piece.team != activeTeam && cellBoard.piece.team != 0) {
					switch (cellBoard.piece.num) {
						case 0:
							break;
						case 1:
							tmpPossibleMoves.push(
								...movePawn(cellBoard.piece, cellBoard.position, b)
							);
							break;
						case 2:
							tmpPossibleMoves.push(
								...moveRook(cellBoard.piece, cellBoard.position, b)
							);
							break;
						case 3:
							tmpPossibleMoves.push(
								...moveKnight(cellBoard.piece, cellBoard.position, b)
							);
							break;
						case 4:
							tmpPossibleMoves.push(
								...moveBishop(cellBoard.piece, cellBoard.position, b)
							);
							break;
						case 5:
							tmpPossibleMoves.push(
								...moveQueen(cellBoard.piece, cellBoard.position, b)
							);
							break;
						case 6:
							tmpPossibleMoves.push(
								...moveKing(cellBoard.piece, cellBoard.position, b)
							);
							break;
					}
					if (
						tmpPossibleMoves.some(
							(move) =>
								move.to.row === cell.position.row &&
								move.to.col === cell.position.col
						)
					) {
						return true;
					}
				}
			}
		}
		return false;
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
						handleCellClick={handleCellClick}
						possibleMoves={possibleMoves}
						lastMove={lastMove}
					/>
				))
			)}
		</section>
	);
}

export default Board;
