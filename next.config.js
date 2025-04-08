const withLess = require("next-with-less");

/** @type {import('next').NextConfig} */

module.exports = withLess({
  images: {
    domains: [
      "api.kashmirnirvana.com",
      "nirvana-bucket.s3.amazonaws.com",
      "www.tourmyindia.com",
      "media1.thrillophilia.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "source.unsplash.com",
    ],
  },
  lessLoaderOptions: {},
  redirects: async () => {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/es", destination: "/", permanent: true },
    ];
  },
});
