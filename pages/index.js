import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI API CALLS</title>
      </Head>
    <img src="donatebutton.jpg" alt="ai" width="200" height="200" />
      <p>
        ALL BUDDHAS ARE ALL BUDDHAS{" "}
        <a href="https://replicate.com/">ask for any buddha buddha</a>:
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="prompt" />
        
        <button type="submit">Go!</button>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <div>
          <p>{prediction.status}</p>
          {prediction.output && (
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="output"
              width={1024}
              height={768}
            />
          )}
        </div>
      )}
    </div>
  );
}
