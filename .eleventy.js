/* .eleventy.js */
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-table-of-contents";
import yaml from "js-yaml";

export default async function (eleventyConfig) {
    const mathjax3 = (await import("markdown-it-mathjax3")).default;
    
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

    const markdownLib = markdownIt({ html: true, breaks: true, linkify: true })
    .use(markdownItAnchor)
    .use(markdownItToc, {
      includeLevel: [2, 3],
      containerClass: 'toc', 
    })
    .use(mathjax3, {
        tex: {packages: { '[+]': ['stmaryrd'] } },
        loader: {load: ['[tex]/stmaryrd']}
    });
  
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.setLibrary("md", markdownLib);

    eleventyConfig.addFilter("dateToIso", (date) => {
        return new Date(date).toISOString();
    });
    eleventyConfig.addFilter("formatDate", (date) => {
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium"
        }).format(new Date(date));
    });

    return {
        dir: { input: 'src', output: '_site' },
    };
}