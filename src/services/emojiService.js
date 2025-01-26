const url = "https://emojihub.yurace.pro/api/all";

export const fetchEmojis = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const emojiData = await response.json();
    const emojis = [];

    for (const emojiInfo of emojiData) {
      const [codePoint] = [...emojiInfo.unicode];
      const emojiCharacter = parseInt(codePoint.replace("U+", ""), 16);
      emojis.push(String.fromCodePoint(emojiCharacter));
    }

    return emojis;
  } catch (err) {
    console.error(err);
    return [];
  }
};
