const getFirstSentence = (text) => {
  let fullText;

  if (Array.isArray(text)) {
    fullText = text.join(" ");
  } else if (typeof text === "string") {
    fullText = text;
  } else {
    console.error("Expected an array or string, but received:", typeof text);
    return;
  }
  const sentences = fullText.split(/(?<=[.!?])\s+/);
  let firstSentence = sentences[0];
  const words = firstSentence.split(/\s+/);
  if (words.length > 20) {
    firstSentence = words.slice(0, 15).join(" ") + "...";
  }
  return firstSentence;
};

const getAuthors = (authors) => {
  if (Array.isArray(authors) && authors.length > 0) {
    return authors.join(", ");
  }
  return authors || ""; 
};

export {
  getFirstSentence,
  getAuthors,
};
