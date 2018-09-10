/**
 * Created by PRadostev on 04.02.2015.
 */
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    srcPath: 'src',
    distPath: 'dist',
    examplesPath: 'examples',
    libsPath: '<%= examplesPath %>/lib',
    specs: 'spec/**/*.js',
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
        '(function(window, document, undefined) {\n\n"use strict";\n\n',
        footer: '\n\n})(window, document);'
      },
      main: {
        src: [
          '<%= srcPath %>/XmlUtil.js',
          '<%= srcPath %>/Request.js',
          '<%= srcPath %>/Filter/Filter.js',
          '<%= srcPath %>/Filter/Filter.Helpers.js',
          '<%= srcPath %>/Filter/Filter.Abstract.js',
          '<%= srcPath %>/Filter/Filter.BinarySpatial.js',
          '<%= srcPath %>/Filter/Filter.BinarySpatial.Implementations.js',
          '<%= srcPath %>/Filter/Filter.DistanceBuffer.js',
          '<%= srcPath %>/Filter/Filter.DistanceBuffer.Implementations.js',
          '<%= srcPath %>/Filter/Filter.BBox.js',
          '<%= srcPath %>/Filter/Filter.GmlObjectID.js',
          '<%= srcPath %>/Filter/Filter.BinaryOperator.js',
          '<%= srcPath %>/Filter/Filter.BinaryOperator.Implementations.js',
          '<%= srcPath %>/Filter/Filter.BinaryComparison.js',
          '<%= srcPath %>/Filter/Filter.BinaryComparison.Implementations.js',
          '<%= srcPath %>/Filter/Filter.Like.js',
          '<%= srcPath %>/Filter/Filter.IsNull.js',
          '<%= srcPath %>/Filter/Filter.IsBetween.js',
          '<%= srcPath %>/Filter/Filter.BinaryLogic.js',
          '<%= srcPath %>/Filter/Filter.BinaryLogic.Implementations.js',
          '<%= srcPath %>/Filter/Filter.Not.js',
          '<%= srcPath %>/Filter/Filter.Function.js',
          '<%= srcPath %>/Format/Format.js',
          '<%= srcPath %>/Format/Scheme.js',
          '<%= srcPath %>/Format/Format.Base.js',
          '<%= srcPath %>/Format/Format.GeoJSON.js',
          '<%= srcPath %>/GML.js',
          '<%= srcPath %>/Format/Parsers/ParserContainerMixin.js',
          '<%= srcPath %>/Format/Parsers/Element.js',
          '<%= srcPath %>/Format/Parsers/Geometry.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/Coordinates.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/Pos.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/PosList.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/PointNode.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/PointSequence.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/LinearRing.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/LineStringNode.js',
          '<%= srcPath %>/Format/Parsers/Coordinates/PolygonNode.js',
          '<%= srcPath %>/Format/Parsers/Layers/CoordsToLatLngMixin.js',
          '<%= srcPath %>/Format/Parsers/Layers/Point.js',
          '<%= srcPath %>/Format/Parsers/Layers/LineString.js',
          '<%= srcPath %>/Format/Parsers/Layers/Polygon.js',
          '<%= srcPath %>/Format/Parsers/Layers/MultiGeometry.js',
          '<%= srcPath %>/Format/Parsers/Layers/AbstractMultiPolyline.js',
          '<%= srcPath %>/Format/Parsers/Layers/AbstractMultiPolygon.js',
          '<%= srcPath %>/Format/Parsers/Layers/MultiLineString.js',
          '<%= srcPath %>/Format/Parsers/Layers/MultiCurve.js',
          '<%= srcPath %>/Format/Parsers/Layers/MultiPolygon.js',
          '<%= srcPath %>/Format/Parsers/Layers/MultiSurface.js',
          '<%= srcPath %>/Format/Parsers/Layers/MultiPoint.js',
          '<%= srcPath %>/Format/Parsers/FeatureType.js',
          '<%= srcPath %>/Format/Format.GML.js',
          '<%= srcPath %>/Util.js',
          '<%= srcPath %>/GmlUtil.js',
          '<%= srcPath %>/GML/*.js',
          '<%= srcPath %>/Properties.js',
          '<%= srcPath %>/WFS.js',
          '<%= srcPath %>/WFST.js',
          '<%= srcPath %>/WFST.Helpers.js',
          '<%= srcPath %>/WFST.Requests.js'
        ],
        dest: '<%= distPath %>/<%= pkg.name %>.src.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      main: {
        src: '<%= concat.main.dest %>',
        dest: '<%= distPath %>/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      scripts: {
        files: {
          src: '<%= concat.main.src %>'
        }
      },
      specs: {
        files: {
          src: ['<%= specs %>']
        }
      }
    },
    copy: {
      libs: {
        files: [{
          cwd: 'bower_components/',
          expand: true,
          flatten: true,
          src: [
            'spin.js/spin.js',

            'Leaflet.toolbar/dist/leaflet.toolbar.css',
            'Leaflet.toolbar/dist/leaflet.toolbar.js',

            'Leaflet.label/dist/leaflet.label.css',
            'Leaflet.label/dist/leaflet.label.js',

            'leaflet.markercluster/dist/MarkerCluster.css',
            'leaflet.markercluster/dist/MarkerCluster.Default.css',
            'leaflet.markercluster/dist/leaflet.markercluster.js',

            'leaflet-sidebar/src/L.Control.Sidebar.css',
            'leaflet-sidebar/src/L.Control.Sidebar.js',

            'leaflet.editable/src/Leaflet.Editable.js',

            'proj4/dist/proj4.js',
            'proj4leaflet/src/proj4leaflet.js'
          ],
          dest: '<%= libsPath %>'
        }]
      }
    },
    clean: {
      libs: {
        src: ['<%= libsPath %>/**/*']
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      single: {
        singleRun: true
      },
      dev: {
        browsers: ['PhantomJS', 'Chrome']
      },
      continuous: {
        background: true,
        browsers: ['PhantomJS']
      }
    },
    watch: {
      scripts: {
        files: '<%= concat.main.src %>',
        tasks: ['concat', 'uglify', 'jshint:scripts']
      },
      specs: {
        files: ['<%= specs %>'],
        tasks: ['jshint:specs']
      },
      libs: {
        files: ['bower_components/**/*'],
        tasks: ['clean:libs', 'copy:libs']
      }
    },
    'gh-pages': {
      options: {
        add: true,
        push: false,
        message: 'Auto update gh-pages'
      },
      examples: {
        src: [
          '<%= examplesPath %>/**/*',
          '<%= concat.main.dest %>'
        ]
      }
    }
  });

  grunt.util.linefeed = '\n';
  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default grunt task.
  grunt.registerTask('default', [
    'jshint:scripts',
    'jshint:specs',
    'concat',
    'uglify',
    'clean:libs',
    'copy:libs',
    'karma:single'
  ]);

  // Watch tack with continuous tests running.
  grunt.registerTask('dev', ['karma:continuous:start', 'watch']);

  // Publish task for gh-pages.
  grunt.registerTask('publish', ['clean:libs', 'copy:libs', 'gh-pages:examples']);

  // CI build task
  grunt.registerTask('build', ['concat', 'uglify', 'jshint:scripts']);
};
