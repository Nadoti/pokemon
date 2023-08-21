/** @type {import('next').NextConfig} */

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.pokemondb.net',
          port: '',
          pathname: '/artwork/large/**',
        },
      ],
    },
  }