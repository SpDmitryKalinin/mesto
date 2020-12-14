<<<<<<< HEAD
// подключите плагины в файл
=======
>>>>>>> 42d44548c2d41892dec430b85ae0a482eb22b019
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
}; 