export type Pairing = {
  round: number;
  table: string;
  player_1: Player;
  player_2: Player;
};

type Player = {
  name: string;
  score: string;
};
