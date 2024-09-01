import { useEffect, useState } from "react";
import "./App.css";

import { useCatFact } from "./hooks/useCatFact";
import { useCatImage } from "./hooks/useCatImage";

export function App() {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  return (
    <main>
      <button onClick={refreshFact}>Get new fact</button>

      {fact && <p>{fact}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image extracted using the first three words for ${fact}`}
        ></img>
      )}
    </main>
  );
}
