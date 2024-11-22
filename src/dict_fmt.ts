import { ConfigType } from "./configuration";
import Word from "./word";

function dict_fmt(text: string, option: ConfigType): string {
  const lines = text.split(/\r?\n/);

  const comment: string[] = [];
  let firstCommentFlag = true;
  const header: string[] = [];
  let headerFlag = false;
  const words: Word[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;

    if (headerFlag) {
      if (!line.startsWith("---") && !line.startsWith("...")) {
        header.push(line);
        continue;
      } else {
        headerFlag = false;
        continue;
      }
    }

    if (line.startsWith("#") && firstCommentFlag) {
      comment.push(line);
      continue;
    } else {
      firstCommentFlag = false;
    }

    if (line.startsWith("---")) {
      headerFlag = true;
      continue;
    }

    const word = Word.fromStr(line);
    words.push(word);
  }

  words.sort((a, b) => (option.sort_by != "weight" ? compare_by_spell(a, b) : compare_by_weight(a, b)));

  const result: string[] = [];
  result.push(...comment);
  result.push("", "---", ...header, "...", "");
  result.push(...words.map((word) => word.toString()), "");

  return result.join("\n");
}

function compare_by_spell(self: Word, other: Word): number {
  if (self.spell < other.spell) return -1;
  if (self.spell > other.spell) return 1;

  if (self.rank === null) return 1;
  if (other.rank === null) return -1;

  return other.rank - self.rank;
}

function compare_by_weight(self: Word, other: Word): number {
  if (self.rank === null) return 1;
  if (other.rank === null) return -1;

  if (self.rank < other.rank) return 1;
  if (self.rank > other.rank) return -1;

  return other.spell.localeCompare(self.spell);
}

export default dict_fmt;
