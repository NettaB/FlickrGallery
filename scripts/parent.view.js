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
            this.photoView = new PhotoView();
            //this.galleryView = new GalleryView();
 
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

            /**
             * @listens searchIsBack
             * executes function when collection is populated
             */
            this.on('searchIsBack', this.onSearchIsBack, this);

            /**
             * @listens nextPhotoPage
             * sends http request when photo view needs next page
             */
            this.photoView.on('nextPhotoPage', this.getNextPage, this);

            /**
             * @listens prevPhotoPage
             * sends http request when phot view needs previous page
             */
            this.photoView.on('prevPhotoPage', this.getPrevPage, this)
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
         * saves search term
         * executes search
         */
        flickrServiceInit: function(searchVal) {
            console.log('searching...');
            this.flickrPageCounter = 1;
            this.query = searchVal;
            this.flickrServiceSearch();
        },

        /**
         * @function flickrServiceSearch
         * triggers service search method
         */
        flickrServiceSearch: function() {
            if (this.flickrPageCounter)
            this.flickrService.setPage (this.flickrPageCounter);
            console.log(this.flickrService.rootUrl);
            this.flickrService.doSearch(this.query, function(){
                //trigger main view event
                this.trigger('searchIsBack');
            }.bind(this));
        },

        /**
         * @function onSearchIsBack
         * passes collection to photoView and galleryView
         */
        onSearchIsBack: function(){
            console.log('I know search is done!');

            if (this.photoView.collection){
                this.photoView.collection.reset();
                this.photoView.collection = this.flickrService.flickrServiceCollection;
            } else {
                this.photoView.collection = this.flickrService.flickrServiceCollection
            }
            this.photoView.trigger('collectionFull');


            //***this will init gallery view. DO NOT DELETE!!***//
            //if(this.galleryView.collection){
                //this.galleryView.reset();
   //         this.galleryView.collection = this.flickrService.flickrServiceCollection;
      //      } else {
        ///        this.galleryView.collection = this.flickrService.flickrServiceCollection;
          //  }
            //init galleryview with collection
            this.galleryView = new GalleryView({collection: this.flickrService.flickrServiceCollection});
            this.galleryView.trigger('collectionFull')
        },

        /**
         * @function goNextPage
         * sets page number to retrieve from flickr
         * executes search
         */
        getNextPage: function() {
            console.log('I need the next page');
            this.flickrPageCounter +=1;
            console.log('I am on page:');
            console.log(this.flickrPageCounter);
            this.flickrServiceSearch();
        },

        /**
         * @function goPrevPage
         * sets page number to retrieve from flickr
         * executes search
         */
        getPrevPage: function() {
            console.log('I need the previous page');
            this.flickrPageCounter -=1;
            console.log('I am on page:');
            console.log(this.flickrPageCounter);
            if(this.flickrPageCounter < 0 ){
                this.photoView.alertFirstPhoto();
            } else{
                this.flickrServiceSearch();
            }

        }

    });
    var main = new theMainView();
});