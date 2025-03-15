import app from "./routes.js";
const port = 8080;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`SERVER http://localhost:${port}`);
});
