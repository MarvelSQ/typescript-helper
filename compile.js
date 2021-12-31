const path = require('path');
const fs = require('fs-extra');
const ts = require('typescript');
const cwd = process.cwd();
const configFilePath = ts.findConfigFile(cwd, (filename) => fs.existsSync(filename));
const { config } = ts.readConfigFile('tsconfig.json', () =>
  fs.readFileSync(configFilePath, {
    encoding: 'utf-8',
  })
);

/**
 * @type {ts.CompilerOptions}
 */
const compilerOptions = {
  ...config.compilerOptions,
  sourceMap: false,
  target: ts.ScriptTarget.ES5,
  jsx: ts.JsxEmit.React,
};

const host = ts.createCompilerHost(compilerOptions);

/**
 * @param {string} fileName
 * @param {string} contents
 */
host.writeFile = (fileName, contents) => {
  const libName = fileName.replace(path.resolve(cwd, 'src'), path.resolve(cwd, 'lib'));
  console.log(fileName, '=>', libName);
  if (fileName.endsWith('.map')) {
    return;
  }

  fs.ensureFileSync(libName, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile(libName, contents, {}, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const program = ts.createProgram([path.resolve(cwd, 'src/realtime.tsx')], compilerOptions, host);

program.emit();
