import Word from "./word";

enum WordType {
  chinese,
  english,
  mixed,
  other,
}

function which_type(s: string): WordType {
  if (/^[\u4e00-\u9fa5]+$/.test(s)) return WordType.chinese;
  else if (/^[a-zA-Z0-9-_]+$/.test(s)) return WordType.english;
  else if (/^[\u4e00-\u9fa5a-zA-Z0-9-_]+$/.test(s)) return WordType.mixed;
  else return WordType.other;
}

function compare_word(self: Word, other: Word): boolean {
  switch (which_type(self.main)) {
    case WordType.chinese:
    case WordType.english:
      if (self.main.length !== other.main.length) {
        return self.main.length < other.main.length;
      }
      break;
    default:
      break;
  }

  if (self.spell !== other.spell) {
    return self.spell < other.spell;
  }

  if (self.rank === null) return false;
  if (other.rank === null) return true;

  return self.rank > other.rank;
}

const compare_word_sort = (x: Word, y: Word) => (compare_word(x, y) ? -1 : 1);

function phrase_fmt(text: string): string {
  const comment: string[] = []; // 最前面的注释
  const english: Word[] = []; // 英语
  const chinese: Word[] = []; // 中文
  const mixed: Word[] = []; // 中英混合
  const farra: Word[] = []; // 其余的杂项
  let commentFlag = true;

  function classifyPush(word: Word): void {
    switch (which_type(word.main)) {
      case WordType.chinese:
        chinese.push(word);
        break;
      case WordType.english:
        english.push(word);
        break;
      case WordType.mixed:
        mixed.push(word);
        break;
      default:
        farra.push(word);
        break;
    }
  }

  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith("#")) {
      if (commentFlag) comment.push(line);
      continue;
    }

    const trimmedLine = line.trim();
    if (!trimmedLine) {
      commentFlag = false;
      continue;
    }

    const spl = trimmedLine.split(/\s+/);
    const hanzi = spl[0];
    const duyin = spl[1];
    const quanzhong = spl[2];

    const word = new Word(hanzi, duyin, quanzhong);
    classifyPush(word);
  }

  const newTexts: string[] = [];
  newTexts.push(...comment);
  newTexts.push("");
  newTexts.push(...chinese.sort(compare_word_sort).map((word) => word.toString()));
  newTexts.push("");
  newTexts.push(...english.sort(compare_word_sort).map((word) => word.toString()));
  newTexts.push("");
  newTexts.push(...mixed.sort(compare_word_sort).map((word) => word.toString()));
  newTexts.push("");
  newTexts.push(...farra.map((word) => word.toString()));

  return newTexts.join("\n");
}

export default phrase_fmt;
