import axios from "axios";

export default async function handler(req, res) {
  const { query } = req.query;

  const apiKey =
    "717ea8710ba831ab223585b59772e354862056d24ad46bdfd3c0c7179097c9e5";

  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        q: `${query} hotels`,
        location: "Paris, France",
        engine: "google",
        api_key: apiKey,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
}
