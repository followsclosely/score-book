export class Game {
  constructor(
    public type?: string,
    public gameTypeNew?: string,
    public dateTime?: string,
    public factionCount?: number,
  ) {}
}

export class GameType {
  constructor(
    public name?: string,
  ) {}
}