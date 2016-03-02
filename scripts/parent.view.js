/**
 * Created by Netta.bondy on 28/02/2016.
 */
define (['jquery', 'backbone', 'header.view', 'sidebar.view', 'photo.view', 'gallery.view'],
    function($, Backbone, HeaderView, SidebarView, PhotoView, GalleryView){

    var theMainView = Backbone.View.extend({

        initialize: function() {
            this.headerView = new HeaderView();
            this.sidebarView = new SidebarView();
            this.photoView = new PhotoView();
            this.galleryView = new GalleryView();
 
            //listens for header button click
            //sends event to sidebarView
            this.headerView.on('openSidebar', this.btnClicked, this);
            this.sidebarView.on('searchEvent', this.flickrServiceInit, this)
        },

        //triggers event on sidebarView
        btnClicked: function() {
            this.sidebarView.trigger('openView');
        },

        flickrServiceInit: function(searchVal) {
            //init singleton search model
            // this.flickrService = (function(){
            //serviceSingleton = new FlickrService;
            //serviceSingleton.fetch();
            //return serviceSingleton)();
        }

    });
    var main = new theMainView();
});