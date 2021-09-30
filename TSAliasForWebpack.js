const path = require("path");
const fs = require("fs");
const ts = require("typescript");
/**
 * get current working directory
 */
const cwd = process.cwd();
/**
 * get tsconfig.json location
 */
const configFilePath = ts.findConfigFile(cwd, (filename) =>
  fs.existsSync(filename)
);
/**
 * get 'paths' & 'baseUrl' from tsconfig.json
 */
const {
  config: {
    compilerOptions: { paths, baseUrl = "./src" },
  },
} = ts.readConfigFile("tsconfig.json", () =>
  fs.readFileSync(configFilePath, {
    encoding: "utf-8",
  })
);

/**
 * convert paths to webpack style alias
 * @example Utils/* => Utils
 */
const aliasConfig = Object.entries(paths).reduce((acc, [key, value]) => {
  acc[key.replace("/*", "")] = path.resolve(
    cwd,
    baseUrl,
    value[0].replace("/*", "")
  );
  return acc;
}, {});

module.exports = aliasConfig;
