require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    siteUrl: "https://map.greenkd.ru",
    title: "My Gatsby Site",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp", // Needed for dynamic images
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "Directus",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "directus",
        // Url to query from
        url: "http://127.0.0.1:8055/graphql",
        refetchInterval: 15,
      },
    },
  ],
};
