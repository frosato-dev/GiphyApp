const path = require('path');

const ROOT = `${__dirname}/..`;
const APP = path.join(ROOT,'/src');
const BUILD = path.join(ROOT,'/dist');
const NODE_MODULES = path.join(ROOT,'/node_modules');

module.exports = {
  ROOT: ROOT,
  APP: APP,
  BUILD: BUILD,
  NODE_MODULES: NODE_MODULES,
};
