/**
 * Created by Netta.bondy on 28/02/2016.
 */
requirejs.config({
    baseUrl: 'scripts',

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        mainview: {
            deps: ['jquery', 'backbone'],
            exports: 'MainView'
        }
    },

    paths:{
        'jquery': 'external/jquery-1.12.1.min',
        'underscore': 'external/underscore-min',
        'backbone': 'external/backbone-min',
        'mainview': 'mainView',
        'headerview': 'headerView'
    }
});

requirejs(['jquery', 'underscore', 'backbone', 'mainview', 'headerview'],
function($, _, Backbone, MainView, HeaderView){

});