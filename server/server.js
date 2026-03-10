require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

  const { message } = req.body;

  try {

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("AI request error:", error.response?.data || error.message);

    res.status(500).json({
      error: "AI request failed"
    });
  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});