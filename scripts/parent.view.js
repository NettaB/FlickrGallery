/**
 * Created by Netta.bondy on 28/02/2016.
 */
define (['jquery', 'backbone', 'header.view', 'sidebar.view', 'photo.view',
    'gallery.view', 'flickr.service'],
    function($, Backbone, HeaderView, SidebarView, PhotoView, GalleryView, FlickrService){

    var theMainView = Backbone.View.extend({

        initialize: function() {
            this.flickrService = new FlickrService;
            this.headerView = new HeaderView();
            this.sidebarView = new SidebarView();
 
            //listens for header button click
            //sends event to sidebarView
            this.headerView.on('openSidebar', this.btnClicked, this);
            this.sidebarView.on('searchEvent', this.flickrServiceInit, this);
            this.on('searchIsBack', this.onSearchIsBack, this)
        },

        //triggers event on sidebarView
        btnClicked: function() {
            this.sidebarView.trigger('openView');
        },

        flickrServiceInit: function(searchVal) {
            this.flickrService.doSearch(searchVal, function(){
                this.trigger('searchIsBack');
            }.bind(this));

        },
        onSearchIsBack: function(){
            console.log('I know search is done!');
            this.photoView = new PhotoView({collection: this.flickrService.flickrServiceCollection});
            this.galleryView = new GalleryView({collection: this.flickrService.flickrServiceCollection});
        }

    });
    var main = new theMainView();
});