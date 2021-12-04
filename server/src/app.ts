import express from "express";

// Create express object
const app = express();
// Secure the connection and data
// app.use(helmet());
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Needed to parse req.body with json payload (Can be used to parse formData obj)
app.use(express.json());
// Processes data sent from inbuilt form method and action
app.use(express.urlencoded({ extended: true }));
// Load router module in express app (Pass middleware userRouter to app)
// app.use(userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../../public"));
  app.get("*", (req, res) => {
    res.sendFile("../../public/index.html");
  });
}

export default app;
