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

            this.headerView.on('open', this.btnClicked, this);
        },

        btnClicked: function() {
            this.sidebarView.trigger('openView');
        }

    });
    var main = new theMainView();
});