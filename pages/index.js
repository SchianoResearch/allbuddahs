import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import EthButton from "./Components/EthButton";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  
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
        <title>ALL_BUDDHAS_ARE_AI_BUDDHAS</title>
      </Head>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="MHMLLF5667SEW" />
<input type="image" src="https://pics.paypal.com/00/s/MzFlZjdlODEtMGE1Zi00ZjJmLWE5ZjEtNzUxMWUwYjI3Nzkz/file.PNG" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<Image alt="" border="0" src="/public/donatebutton.jpg" width="1" height="1" ></Image>
</form>

    {/* <Image src="donatebutton.jpg" alt="ai" width="250" height="250" /> */}
      
        <h2>ALL BUDDHAS ARE ALL BUDDHAS</h2>
        <a href="https://replicate.com/"><h3>ask for any buddha buddha</h3></a>
      

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="prompt" width="400px" />
        
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
              width={512}
              height={512}
            />
          )}
          
        </div>
        
      )}
      
            <EthButton/>
      <div><footer><h3>ⓩⓔⓝ{year} </h3>
          </footer></div>
    </div>
   
  );
}
