
const TUILE_VIDE = ' ';
const TUILE_JOUEUR = 'O';
const TAILLE_PLATEAU = 3;
export class Game {
  private _lastSymbol = TUILE_VIDE;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == TUILE_VIDE) {
      if (player == TUILE_JOUEUR) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != TUILE_VIDE) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(0, 0)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(1, 0)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(2, 0)!.Symbol;
    }

    return TUILE_VIDE;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(0, 0)!.Symbol != TUILE_VIDE &&
      this._board.TileAt(0, 1)!.Symbol != TUILE_VIDE &&
      this._board.TileAt(0, 2)!.Symbol != TUILE_VIDE
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(0, 0)!.Symbol == this._board.TileAt(0, 1)!.Symbol &&
      this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(1, 0)!.Symbol != TUILE_VIDE &&
      this._board.TileAt(1, 1)!.Symbol != TUILE_VIDE &&
      this._board.TileAt(1, 2)!.Symbol != TUILE_VIDE
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(1, 0)!.Symbol == this._board.TileAt(1, 1)!.Symbol && //test
      this._board.TileAt(1, 2)!.Symbol == this._board.TileAt(1, 1)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(2, 0)!.Symbol != TUILE_VIDE &&
      this._board.TileAt(2, 1)!.Symbol != TUILE_VIDE &&
      this._board.TileAt(2, 2)!.Symbol != TUILE_VIDE
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(2, 0)!.Symbol == this._board.TileAt(2, 1)!.Symbol &&
      this._board.TileAt(2, 2)!.Symbol == this._board.TileAt(2, 1)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < TAILLE_PLATEAU; i++) {
      for (let j = 0; j < TAILLE_PLATEAU; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: TUILE_VIDE };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
