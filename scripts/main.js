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
        localStorage: {
            deps: ['backbone'],
            exports: 'LocalStorage'
        }
    },

    paths:{
        'jquery': '../libs/jquery-1.12.1.min',
        'underscore': '../libs/underscore-min',
        'backbone': '../libs/backbone-min',
        'localStorage': '//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min',
        'dot': '//cdnjs.cloudflare.com/ajax/libs/dot/1.0.3/doT.min',
        'text': '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'header.view': 'header/header.view',
        'sidebar.view': 'sidebar/sidebar.view',
        'photo.view': 'photo/photo.view',
        'gallery.view': 'gallery/gallery.view',
        'history.model': 'sidebar/history/history_model/history.model',
        'history.collection': 'sidebar/history/history_model/history.collection',
        'history.view': 'sidebar/history/history_model/history.view',
        'search.service': 'sidebar/search/search.service'
    }
});

requirejs(['jquery', 'underscore', 'backbone', 'localStorage', 'dot', 'text',
    'parent.view', 'header.view', 'sidebar.view', 'photo.view',
    'gallery.view', 'history.model', 'history.collection', 'history.view',
    'search.service'],
function($, _, Backbone, LocalStorage, Dot, Text,
         ParentView, HeaderView, SidebarView, PhotoView,
         GalleryView, HistoryModel, HistoryCollection, HistoryView,
         SearchCollection){

});