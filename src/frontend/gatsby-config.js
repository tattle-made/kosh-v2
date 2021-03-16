module.exports = {
  siteMetadata: {
    title: `Tattle Website`,
    description: `We build tools and datasets to understand and respond to misinformation in India.`,
    author: `@tattlemade`,
    base_url: "https://tattle.co.in/",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/layouts/mdx-layout.js"),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "kosh.tattle.co.in",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kosh : Tattle's Archive of multimedia posts`,
        short_name: `Kosh`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#E76D67`,
        display: `standalone`,
        icon: `src/images/app_icon.png`,
      },
    },
  ],
};
