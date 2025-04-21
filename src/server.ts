import app from "./app";
import config from "./config";

app.listen(config.port, () => {});
async function main() {
  console.log(`Server is running on port ${config.port}`);
}
main();
