/* .eleventy.js */

const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
    const milaOptions = {
        matcher(href) {
            return href.match(/^https?:\/\//);
        },
        attrs: {
            target: "_blank",
            rel: "noopener",
        },
    };
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('src/css')

    return {
        dir: { input: 'src', output: '_site' },
    };
}