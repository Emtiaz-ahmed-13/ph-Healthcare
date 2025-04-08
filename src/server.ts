import app from "./app";

const port = 3000;

app.listen(port, () => {});
async function main() {
  console.log(`Server is running on port ${port}`);
}
main();
