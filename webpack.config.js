module.exports = (env) => {
  const fileName = `./webpack.${env}.js`;
  return require(fileName);
};
