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
        "191406e6a98a2a0f922ebd4ea063e43b09eb004334e2a01955aeaf761c1b772b",
      input: { prompt: req.body.prompt, num_outputs: 1, width:512, height: 512,num_inference_steps:500 },
      
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
