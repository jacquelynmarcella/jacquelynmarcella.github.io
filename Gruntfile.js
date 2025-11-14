module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/portfolio.js',
        dest: 'js/portfolio.min.js'
      }
    },
    bake: {
        build: {
            files: {
                "index.html": "src/index.html",
                "accessibility.html": "src/accessibility.html",
                "blackjack.html": "src/blackjack.html",
                "design-system.html": "src/design-system.html",
                "dreamstate.html": "src/dreamstate.html",
                "form-api.html": "src/form-api.html",
                "media-optimization.html": "src/media-optimization.html",
                "mega-menu-navigation.html": "src/mega-menu-navigation.html",
                "plant-parenthood.html": "src/plant-parenthood.html",
                "search-api.html": "src/search-api.html",
                "skincare.html": "src/skincare.html"
            }
        }
    },    
    cssmin: {
      options: {
        // Optional: Add a banner to the minified CSS
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      minify: {
        expand: true,
        cwd: 'src/css/custom/', // Source directory for your CSS files
        src: ['*.css', '!*.min.css'], // Match all .css files except already minified ones
        dest: 'css/', // Destination directory for minified CSS
        ext: '.min.css' // Add .min.css extension to minified files
      },
      minify: {
        expand: true,
        cwd: 'css/', // Source directory for your CSS files
        src: ['*.css', '!*.min.css'], // Match all .css files except already minified ones
        dest: 'css/', // Destination directory for minified CSS
        ext: '.min.css' // Add .min.css extension to minified files
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bake');

  // Default to compile theme updates
  grunt.registerTask('default', ['bake', 'cssmin', 'uglify']);

};