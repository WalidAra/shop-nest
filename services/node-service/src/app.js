console.clear();
const express = require("express");
const cors = require("cors");
const EndPointCounter = require("express-list-endpoints");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const router = require("./apis/routes");
const chalk = require("chalk");

const swaggerDocument = YAML.load("swagger.yaml");
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  const endpoints = EndPointCounter(app);

  console.log("\n====================================");
  console.log(chalk.yellow(`- Total endpoints: ${endpoints.length}`));
  console.log(chalk.blue(`- Server is running on port ${PORT}`));
  console.log(chalk.red(`~> http://localhost:${PORT}/ <~`));
  console.log(chalk.white(`~> http://localhost:${PORT}/docs <~`));

  console.log("\n====================================");

  console.log(chalk.cyan("* Available endpoints:\n"));
  endpoints.forEach((endpoint) => {
    console.log(
      chalk.green(`==> ${endpoint.methods.join(", ")} ${endpoint.path}`)
    );
  });

  console.log("\n====================================\n");
});
