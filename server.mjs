import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
const DBURL =
  "mongodb+srv://khana:khana@cluster0.6jcs2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(DBURL);
const SECRET = process.env.SECRET || "12345";
const PORT = process.env.PORT || 8000;
const app = express();
const __dirname = path.resolve();
const POST = mongoose.model("Posts", {
  id: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
const ADMIN = mongoose.model("Admins", {
  email: String,
  password: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "web/build")));
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./web/build/index.html"));
  // res.redirect("/")
});
app.post("/api/v1/post", (req, res) => {
  let newPost = new POST({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
  });
  newPost.save(() => {
    res.send("Post has been created");
  });
});

app.get("/api/v1/posts", (req, res) => {
  POST.find({}).exec((err, data) => {
    res.send(data);
  });
});

app.get("/**", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "./web/build/index.html"))
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
