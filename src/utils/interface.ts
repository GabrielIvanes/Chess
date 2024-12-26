interface PieceInterface {
	num: number; // 1: Pawn, 2: Rook, 3: Knight, 4: Bishop, 5: Queen, 6: King
	team: number;
}

interface PositionInterface {
	row: number;
	col: number;
}

interface MoveInterface {
	from: PositionInterface;
	to: PositionInterface;
	piece: PieceInterface;
}

interface CellInterface {
	piece: PieceInterface;
	position: PositionInterface;
}

export type { PieceInterface, PositionInterface, MoveInterface, CellInterface };
