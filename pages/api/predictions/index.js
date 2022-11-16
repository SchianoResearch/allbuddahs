export default async function handler(req, res) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of kuprel/min-dalle, fetched from:
      // https://replicate.com/kuprel/min-dalle/versions
      version:
        "8abccf52e7cba9f6e82317253f4a3549082e966db5584e92c808ece132037776",
      input: { prompt: req.body.prompt, num_outputs: 1,scheduler:"DDIM" ,prompt_strength:0.5, width:1024, height: 768,init_image:req.body.init_image},
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
