/**
 * Created by Netta.bondy on 28/02/2016.
 */
requirejs.config({
    baseUrl: 'scripts',

    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },

    paths:{
        'jquery': 'external/jquery-1.12.1.min',
        'underscore': 'external/underscore-min',
        'backbone': 'external/backbone-min',
    }
});

requirejs(['jquery', 'underscore', 'backbone', 'parent_view', 'header_view', 'sidebar_view', 'photo_view', 'gallery_view'],
function($, _, Backbone, ParentView, HeaderView, SidebarView, PhotoView, GalleryView){

});