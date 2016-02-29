/**
 * Created by Netta.bondy on 28/02/2016.
 */
define (['jquery', 'backbone', 'header_view', 'sidebar_view', 'photo_view', 'gallery_view'],
    function($, Backbone, HeaderView, SidebarView, PhotoView, GalleryView){

    var theMainView = Backbone.View.extend({

        initialize: function() {
            this.headerView = new HeaderView();
            this.sidebarView = new SidebarView();
            this.photoView = new PhotoView();
            this.galleryView = new GalleryView();
        }
    });
    var main = new theMainView();
});