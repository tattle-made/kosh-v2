module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx"],
        defaultLayouts: {
          default: require.resolve(`./src/components/atoms/layout.js`),
        },
      },
    },
  ],
};
