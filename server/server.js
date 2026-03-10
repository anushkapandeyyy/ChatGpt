require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply = response.data.choices[0].message.content;

    res.json([
      {
        generated_text: aiReply
      }
    ]);

  } catch (error) {

    console.error("HF ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "AI request failed"
    });

  }

});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});