const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdowwnRemark.edges.forEach(({ node }) => {
      createPage({
        path: `${node.frontmatter.type === 'post' ? 'blog' : 'portfolio'}${node.fields.slug}`,
        component: path.resolve(node.frontmatter.type === 'post' ? `./src/templates/post.js` : `./src/templates/project.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}