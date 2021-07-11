/* eslint-disable no-console */
const _ = require("lodash");
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const siteConfig = require("./data/SiteConfig");
const { createCanvas, loadImage, registerFont } = require("canvas");
registerFont("./static/fonts/PressStart2P-Regular.tff", {
  family: "Press Start 2P",
});


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString(),
        });
      }
    }
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const modulesPage = path.resolve("src/templates/modules.jsx");

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                tags
                category
                date
                posttype
                cover {
                  publicURL
                  relativePath
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const blogList = [];
  const moduleList = [];

  const blogQueryResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { posttype: { eq: "blog" } } }
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                tags
                category
                description
                date
                posttype
                cover {
                  publicURL
                  relativePath
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  if (blogQueryResult.errors) {
    console.error(blogQueryResult.errors);
    throw blogQueryResult.errors;
  }

  fs.mkdir("src/generated", (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Directory created successfully!");
  });

  const posts = blogQueryResult.data.allMarkdownRemark.edges;
  posts.forEach((edge,index) => {
    blogList.push({
      path: `/blog${edge.node.fields.slug}`,
      tags: edge.node.frontmatter.tags,
      cover: edge.node.frontmatter.cover,
      title: edge.node.frontmatter.title,
      excerpt: edge.node.excerpt,
      description: edge.node.frontmatter.description,
    });
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");
    loadImage("./blog/" + edge.node.frontmatter.cover.relativePath).then(
      (image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        let postid = "#12";

       
        
        ctx.font = '50px "Press Start 2P"';

        spacer = ctx.measureText("Tera").width + 52;

        // Generate Drop Shadow
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#004e33";
        ctx.strokeText("Tera", 50, 170);

        ctx.globalCompositeOperation = "destination-over";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.strokeText("sology", spacer, 170);

        // Generate Stroke
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = "#92f152";
        ctx.strokeText("Tera", 50, 160);

        ctx.globalCompositeOperation = "xor";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.strokeText("sology", spacer, 160);

        // Generate Main Text
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#2c8f33";
        ctx.fillText("Tera", 50, 160);

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.globalCompositeOperation = "xor";
        ctx.fillText("sology", spacer, 160);

        ctx.globalCompositeOperation = "source-over";
        ctx.translate(0, -10);
        ctx.rotate(25);
        ctx.font = '40px "Press Start 2P"';
        ctx.strokeStyle = "#fff";

        ctx.strokeText("Saturday", spacer - 10, 255);
        ctx.strokeText("Saturday", spacer - 10, 245);
        ctx.strokeText("Saturday", spacer - 10, 240);
        ctx.strokeText("Saturday", spacer - 10, 235);
        ctx.strokeText("Saturday", spacer - 10, 230);

        ctx.fillStyle = "#2e0350";
        ctx.fillText("Saturday", spacer - 10, 250);
        ctx.fillStyle = "#7b00a3";
        ctx.fillText("Saturday", spacer - 10, 245);
        ctx.fillStyle = "#bc00c4";
        ctx.fillText("Saturday", spacer - 10, 240);
        ctx.fillStyle = "#f549f5";
        ctx.fillText("Saturday", spacer - 10, 235);
        ctx.fillStyle = "#ffb2ff";
        ctx.fillText("Saturday", spacer - 10, 230);

        let pst_spacer =
          ctx.measureText("sology").width - ctx.measureText(postid).width + 70;

        ctx.strokeText(postid, pst_spacer + spacer, 255 + 50);
        ctx.strokeText(postid, pst_spacer + spacer, 245 + 50);
        ctx.strokeText(postid, pst_spacer + spacer, 240 + 50);
        ctx.strokeText(postid, pst_spacer + spacer, 235 + 50);
        ctx.strokeText(postid, pst_spacer + spacer, 230 + 50);
        ctx.fillStyle = "#2e0350";
        ctx.fillText(postid, pst_spacer + spacer, 255 + 50);
        ctx.fillStyle = "#7b00a3";
        ctx.fillText(postid, pst_spacer + spacer, 245 + 50);
        ctx.fillStyle = "#bc00c4";
        ctx.fillText(postid, pst_spacer + spacer, 240 + 50);
        ctx.fillStyle = "#f549f5";
        ctx.fillText(postid, pst_spacer + spacer, 235 + 50);
        ctx.fillStyle = "#ffb2ff";
        ctx.fillText(postid, pst_spacer + spacer, 230 + 50);

        ctx.restore();

        let buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("./blog/"+edge.node.frontmatter.date+"/cover.jpg", buffer);
      }
    );
  });

  const blogJSON = JSON.stringify(blogList, null, 2);
  fs.writeFileSync("./src/generated/blog-result.json", blogJSON);
  const postsPerPage = 6;
  const postsNumPages = Math.ceil(posts.length / postsPerPage);
  Array.from({
    length: postsNumPages,
    // eslint-disable-next-line no-shadow
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog.jsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        postsNumPages,
        blogCurrentPage: i + 1,
      },
    });
  });

  const moduleQueryResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { posttype: { eq: "module" } } }
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                tags
                category
                date
                posttype
                cover {
                  publicURL
                  relativePath
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  if (moduleQueryResult.errors) {
    console.error(moduleQueryResult.errors);
    throw moduleQueryResult.errors;
  }

  const modules = moduleQueryResult.data.allMarkdownRemark.edges;
  modules.forEach((edge) => {
    moduleList.push({
      path: `/modules${edge.node.fields.slug}`,
      tags: edge.node.frontmatter.tags,
      cover: edge.node.frontmatter.cover,
      title: edge.node.frontmatter.title,
      date: edge.node.frontmatter.date,
      excerpt: edge.node.excerpt,
    });
  });
  const moduleJSON = JSON.stringify(moduleList, null, 2);
  fs.writeFileSync("./src/generated/module-result.json", moduleJSON);
  const modulesPerPage = 6;
  const moduleNumPages = Math.ceil(modules.length / modulesPerPage);
  Array.from({
    length: moduleNumPages,
    // eslint-disable-next-line no-shadow
  }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/modules` : `/modules/${i + 1}`,
      component: path.resolve("./src/templates/modulelist.jsx"),
      context: {
        limit: modulesPerPage,
        skip: i * modulesPerPage,
        moduleNumPages,
        moduleCurrentPage: i + 1,
      },
    });
  });

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  postsEdges.forEach((edge, index) => {
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    // eslint-disable-next-line no-unused-vars
    const nextEdge = postsEdges[nextID];
    // eslint-disable-next-line no-unused-vars
    const prevEdge = postsEdges[prevID];

    if (edge.node.frontmatter.posttype === "module") {
      createPage({
        path: `/modules${edge.node.fields.slug}`,
        component: modulesPage,
        context: {
          slug: edge.node.fields.slug,
          category: edge.node.frontmatter.category,
        },
      });
    } else {
      // blog post
      createPage({
        path: `/blog${edge.node.fields.slug}`,
        component: postPage,
        context: {
          slug: edge.node.fields.slug,
          category: edge.node.frontmatter.category,
        },
      });
    }
  });
};
