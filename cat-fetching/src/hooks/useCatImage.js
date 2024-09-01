import { useEffect, useState } from "react";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/says/";

export const useCatImage = ({ fact }) => {
  const [fristThreeWords, setFirstThreeWords] = useState();

  useEffect(() => {
    if (!fact) return;

    const threeFirstWords = fact.split(" ", 3).join(" ");

    setFirstThreeWords(threeFirstWords);
  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${fristThreeWords}` };
};
