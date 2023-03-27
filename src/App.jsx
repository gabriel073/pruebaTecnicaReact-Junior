import React, { useEffect, useState } from "react";
import "./app.css";

export function App() {
  //    const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
  const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`;
  const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching fact");

        return res.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  // Para recuperar la imagen cada vez q tenga una cita nueva
  useEffect(() => {
    if (!fact) return;
    const firstTrheeWord = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${firstTrheeWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const { url } = response;
        setImageUrl(`${CAT_PREFIX_IMAGE_URL}/${url}`);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de Gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Image extracted using the first trhee words for ${fact}`}
          />
        )}
      </section>
    </main>
  );
}
