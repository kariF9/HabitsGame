module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: 'assets',

  // Ajout d'une configuration Webpack personnalisée
  configureWebpack: {
    resolve: {
      fallback: {
        global: require.resolve('global'), // Fallback pour l'objet global
        crypto: false, // Désactivation si nécessaire
        stream: false, // Désactivation si nécessaire
      },
    },
  },
};
