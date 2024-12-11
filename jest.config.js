const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

const createJestConfigFromNext = nextJest({ dir: "." });
const jestConfiguration = createJestConfigFromNext({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfiguration;
