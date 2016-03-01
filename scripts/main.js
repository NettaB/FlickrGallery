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
        },
        localstorage: {
            deps: ['backbone'],
            exports: 'LocalStorage'
        }
    },

    paths:{
        'jquery': 'external/jquery-1.12.1.min',
        'underscore': 'external/underscore-min',
        'backbone': 'external/backbone-min',
        'localstorage': '//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min',
        'history_model': 'history_model/history_model',
        'history_collection': 'history_model/history_collection'
    }
});

requirejs(['jquery', 'underscore', 'backbone', 'localstorage', 'parent_view', 'header_view', 'sidebar_view', 'photo_view',
    'gallery_view', 'history_model', 'history_collection'],
function($, _, Backbone, LocalStorage, ParentView, HeaderView, SidebarView, PhotoView,
         GalleryView, HistoryModel, HistoryCollection){

});