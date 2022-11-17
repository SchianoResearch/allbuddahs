import { useState } from "react";
// import fetch from 'node-fetch';
import * as log from 'loglevel';

import { registerFetch, registerLogger, Signer, TezosMessageUtils } from 'conseiljs';
import { KeyStoreUtils, SoftSigner } from 'conseiljs-softsigner';

const TezosButton = () => {
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTezos = async () => {
    setLoading(true);
    setMessage("");
    try {
      const tx = await tezos();
      setTxs([...txs, tx]);
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <button
        className="btn btn-primary mt-5"
        onClick={handleTezos}
        disabled={loading}
      >
        {loading ? "Loading..." : "Tezos"}
      </button>
     
    </div>
  );
}
export default TezosButton;