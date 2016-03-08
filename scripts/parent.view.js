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
 
            /**
             * @listens openSidebar
             * sends event to sidebarView
             */
            this.headerView.on('openSidebar', this.btnClicked, this);
            /**
             * @listens searchEvent
             * initiates flickr service and http request
             */
            this.sidebarView.on('searchEvent', this.flickrServiceInit, this);
            this.on('searchIsBack', this.onSearchIsBack, this)
        },

        /**
         * triggers event on sidebarView
         */
        btnClicked: function() {
            this.sidebarView.trigger('openView');
        },

        /**
         * @function flickrServiceInit
         * @param searchVal     -value from search input field
         * passes search term to flickr service
         * triggers event on request completion
         */
        flickrServiceInit: function(searchVal) {
            console.log('searching...');
            //init collection singleton
            this.flickrService.doSearch(searchVal, function(){
                //trigger main view event
                this.trigger('searchIsBack');
            }.bind(this));

        },

        //on collection population event
        /**
         * @function onSearchIsBack
         * inits new photoView and new galleryView
         * passes collection to views
         */
        onSearchIsBack: function(){
            console.log('I know search is done!');
            //init photoview with collection
            this.photoView = new PhotoView({collection: this.flickrService.flickrServiceCollection});
            this.photoView.trigger('collectionFull');
            //init galleryview with collection
            this.galleryView = new GalleryView({collection: this.flickrService.flickrServiceCollection});
            this.galleryView.trigger('collectionFull')
        }

    });
    var main = new theMainView();
});