const url = "https://emojihub.yurace.pro/api/all"; // De Api

// Haalt alle emoji's op van de API
export const fetchEmojis = async () => {
  try {
    const response = await fetch(url);

    // Controller of het resultaat succesvol is
    // Zo niet? Dan een error geven
    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const emojiData = await response.json();
    const emojis = [];

    // Iterate over de emoji data
    // Emoji unicode omzetten naar emoji karakters 
    for (const emojiInfo of emojiData) {
      const [codePoint] = [...emojiInfo.unicode];
      // Het unicode codepunt (bijvoorbeeld U+1F600) omzetten naar een getal
      const emojiCharacter = parseInt(codePoint.replace("U+", ""), 16);
      emojis.push(String.fromCodePoint(emojiCharacter));
    }

    return emojis;
  } catch (err) {
    console.error(err);
    return []; // Een lege array terug sturen indien er een fout is
  }
};
