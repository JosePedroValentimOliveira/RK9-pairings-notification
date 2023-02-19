import fs from "fs";
import { Pairing } from "../types/types";

export class PairingClass {
  public constructor(private name: string, private file_path: string) {}

  public get() {
    const pairings = require(this.file_path);

    return pairings.filter((pairing: Pairing) => {
      return (
        pairing.player_1.name === this.name ||
        pairing.player_2.name === this.name
      );
    });
  }
}
