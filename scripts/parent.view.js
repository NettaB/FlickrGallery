/**
 * Created by Netta.bondy on 28/02/2016.
 */
define (['jquery', 'backbone', 'header.view', 'sidebar.view', 'photo.view',
    'gallery.view', 'flickr.service', 'favorites/favorites.collection'],
    function($, Backbone, HeaderView, SidebarView, PhotoView, GalleryView, FlickrService,
    FavoritesCollection){

    var theMainView = Backbone.View.extend({

        initialize: function() {
            this.flickrService = new FlickrService('0affe632606ef9d2bef8d03065994c47');
            this.headerView = new HeaderView();
            this.sidebarView = new SidebarView();
            this.photoView = new PhotoView();
            this.galleryView = new GalleryView();
            this.FavoritesCollection = new FavoritesCollection;
 
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
             * sends http request when gallery view needs next page
             */
            this.photoView.on('nextPhotoPage', this.getNextPage, this);
            this.galleryView.on('nextPhotoPage', this.getNextPage, this);

            /**
             * @listens prevPhotoPage
             * sends http request when phot view needs previous page
             */
            //this.photoView.on('prevPhotoPage', this.getPrevPage, this);
            //this.galleryView.on('prevPhotoPage', this.getPrevPage, this);


            /**
             * @listens gallerySetsPhoto
             * executes setPhoto
             */
            this.galleryView.on('gallerySetsPhoto', this.setPhoto, this);

            this.photoView.on('favorited', this.toggleFavorites, this);

            this.sidebarView.on('favoritesClicked', this.sendFavorites, this)
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
            this.photoView.collection.reset();
            this.galleryView.collection.reset();
            this.flickrServiceSearch()
        },

        /**
         * @function flickrServiceSearch
         * triggers service search method
         */
        flickrServiceSearch: function() {
            if (this.flickrPageCounter)
            this.flickrService.setPage (this.flickrPageCounter);
            //console.log(this.flickrService.rootUrl);
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

            this.photoView.collection.add(this.flickrService.flickrServiceCollection.models);

            this.photoView.trigger('collectionFull');

            this.galleryView.collection.add(this.flickrService.flickrServiceCollection.models);

            this.galleryView.trigger('collectionFull')

        },

        /**
         * @function goNextPage
         * sets page number to retrieve from flickr
         * executes search
         */
        getNextPage: function() {
            //console.log('I need the next page');
            this.flickrPageCounter +=1;
            //console.log('I am on page:');
            //console.log(this.flickrPageCounter);
            this.flickrServiceSearch();
        },

        /**
         * @function SetPhoto
         * passes id from galleryView to photoView
         * @param {string} clickedID  -id passed from galleryView
         */
        setPhoto: function(clickedID) {
            this.photoView.gallerySetView(clickedID);
        },

        toggleFavorites: function(photoModel) {
            //console.log(photoModel);
            var favBool = this.FavoritesCollection.findWhere({id: photoModel.attributes.id});
            if (favBool) {
                favBool.destroy();
                this.sendFavorites()
            } else {
                this.FavoritesCollection.create(photoModel.attributes);
            }
            },

        sendFavorites: function() {
            var that = this;
            this.FavoritesCollection.fetch()
                .done(function(response) {
                    that.galleryView.galleryCounter = 0;
                    that.galleryView.collection.reset();
                    that.galleryView.collection.add(response);
                    that.galleryView.trigger('collectionFull');

                    that.photoView.collection.reset();
                    that.photoView.collection.add(response);
                    //console.log(that.photoView.collection);
                    that.photoView.trigger('collectionFull');

                })
                .fail(function(error){
                    console.log(error)
                })
            }

        });
    var main = new theMainView();
});