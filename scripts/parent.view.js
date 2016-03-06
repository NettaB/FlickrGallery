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
            this.emptyPhotoView = new PhotoView();
            this.emptyGalleryView = new GalleryView();
 
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

        //callback function for search btn click
        flickrServiceInit: function(searchVal) {
            console.log('searching...');
            //init collection singleton
            this.flickrService.doSearch(searchVal, function(){
                //trigger main view event
                this.trigger('searchIsBack');
            }.bind(this));

        },

        //on collection population event
        onSearchIsBack: function(){
            console.log('I know search is done!');
            //init photoview with collection
            this.photoView = new PhotoView({collection: this.flickrService.flickrServiceCollection});
            this.photoView.trigger('collectionFull');
            //init galleryview with collection
            this.galleryView = new GalleryView({collection: this.flickrService.flickrServiceCollection});
        }

    });
    var main = new theMainView();
});