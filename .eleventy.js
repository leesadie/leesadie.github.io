/* .eleventy.js */

const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('src/css')

    return {
        dir: { input: 'src', output: '_site' },
    };
}