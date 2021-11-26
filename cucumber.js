let common = [
  'src/features/**/*.feature',
  '--require-module ts-node/register',
  '--require src/step-definitions/**/*.ts',
  '--format progress',
  //'--format node_modules/cucumber-pretty'
  '--format json:output/test-results.json'
].join(' ');

module.exports = {
  default: common,
  // More profiles can be added if desired
};
