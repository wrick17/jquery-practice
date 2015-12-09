module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      all: {
        files: ['*.less'],
        tasks: ['less'],
      }
    },

    less: {
      development: {
        files: {
          'style.css': 'style.less',
        }
      }
    },

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less', 'watch']);
  grunt.registerTask('compile', ['less']);
};
