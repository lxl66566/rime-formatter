class Word {
  main: string;
  spell: string;
  rank: number | null;

  constructor(main: string, spell: string, rank?: string) {
    this.main = main;
    this.spell = spell;
    this.rank = rank !== undefined ? parseInt(rank) : null;
  }

  static fromStr(s: string): Word {
    const spl = s.trim().split("\t");

    if (spl.length === 2) {
      return new Word(spl[0], spl[1]);
    } else if (spl.length === 3) {
      return new Word(spl[0], spl[1], spl[2]);
    } else if (spl.length === 1) {
      const [part1, ...restParts] = spl[0].split(/\s+/);
      const lastPart = restParts.pop();

      if (lastPart && /^[0-9]+$/.test(lastPart)) {
        return new Word(part1, restParts.join(" "), lastPart);
      } else {
        restParts.push(lastPart!);
        return new Word(part1, restParts.join(" "));
      }
    }

    throw new Error(`Invalid word line: \`${s}\``);
  }

  toString(): string {
    return this.rank === null ? `${this.main}\t${this.spell}` : `${this.main}\t${this.spell}\t${this.rank}`;
  }
}

export default Word;
