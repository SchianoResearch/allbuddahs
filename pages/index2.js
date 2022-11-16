
import axios from 'axios';
  
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { CompressedPixelFormat } from 'three';

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setFile] = useState(null);
  const[formData, setFormData] = useState(null);
  const fileData = () => {
     
    if (selectedFile) {
        
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {setFile(selectedFile)}</p>
  
          {/* <p>File Type: {setFile(selectedFile.type)}</p> */}
  
          <p>
            {/* Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()} */}
          </p>
  
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// state = {
  
//   // Initially, no file is selected
  
// };
 
// On file select (from the pop up)

 
// On file upload (click the upload button)
const OnFileChange = event => {
  console.log(event);
  // Update the state
  // setFile({ selectedFile: event.target.files[0] });
  // event.preventDefault();
};[selectedFile, setFile]; 
const OnFileUpload = (e) => {
    e.preventDefaults();
   OnFileChange();
  // Create an object of formData
  const formData = new FormData();
  
  // Update the formData object
  formData.append(
  selectedFile,
);
 
  // Details of the uploaded file
  console.log(selectedFile);
 
  // Request made to the backend api
  // Send formData object
  axios.post("api/uploadfile", formData);
  
};
 
// File content to be displayed after
// file upload is complete
  const handleSubmit = async (e) => {

    e.preventDefaults();
    if (selectedFile != null) {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
        init_image: selectedFile,
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
  }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AI API CALLS</title>
      </Head>

      <p>
        ALL BUDDHAS ARE ALL BUDDHAS{" "}
        <a href="https://replicate.com/">ask for any buddha buddha</a>:
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
      {/* <input title= type="file" name="init_image" onChange={()=>{OnFileChange}}  /> */}
        {/* <button type="submit" onClick={ () => {OnFileUpload}} > */}
          {/* Upload!
        </button> */}
           
          {fileData()}
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
