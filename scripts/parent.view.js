/**
 * Created by Netta.bondy on 28/02/2016.
 */
define (['jquery', 'backbone', 'header.view', 'sidebar.view', 'photo.view',
    'gallery.view', 'flickr.service', 'favorites/favorites.collection', 'viewed/viewed.collection'],
    function($, Backbone, HeaderView, SidebarView, PhotoView, GalleryView, FlickrService,
    FavoritesCollection, ViewedCollection){

    var theMainView = Backbone.View.extend({
        el: 'body',

        defaults: {
            apiKey: '0affe632606ef9d2bef8d03065994c47'
        },

        initialize: function() {
            this.flickrService = new FlickrService(this.defaults.apiKey);
            this.FavoritesCollection = new FavoritesCollection;
            this.FavoritesCollection.fetch();
            this.headerView = new HeaderView();
            this.sidebarView = new SidebarView();
            this.photoView = new PhotoView();
            this.galleryView = new GalleryView();


 
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
             * @listens gallerySetsPhoto
             * executes setPhoto
             */
            this.galleryView.on('gallerySetsPhoto', this.setPhoto, this);

            this.photoView.on('favorited', this.toggleFavorites, this);

            this.sidebarView.on('favoritesClicked', this.sendFavorites, this);

            this.photoView.on('viewed', this.markViewed, this);
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
            this.flickrPageCounter = 1;
            this.query = searchVal;
            this.photoView.collection.reset();
            this.photoView.photoCounter = 0;
            this.galleryView.collection.reset();
            this.galleryView.favorites = 0;
            this.galleryView.galleryCounter = 0;
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
            this.totalPages = this.flickrService.flickrServiceCollection.totalPages;

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
            this.flickrPageCounter +=1;
            if (this.flickrPageCounter < this.totalPages) {
                this.flickrServiceSearch()
            } else {
                alert('no more photos!')
            }
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
                    that.galleryView.favorites = 1;

                    that.photoView.collection.reset();
                    that.photoView.collection.add(response);
                    that.photoView.trigger('collectionFull');
                    that.photoView.favorites = 1

                })
                .fail(function(error){
                    console.log(error)
                })
            },

        markViewed: function(currentPhoto) {
            this.viewedCollection = new ViewedCollection;
            var favBool = this.FavoritesCollection.findWhere({id: currentPhoto.attributes.id});
            //console.log(favBool);
            if (favBool) {
                //console.log("the limit does not exist!")
                this.photoView.trigger('favoriteSpotted');
            }

            this.viewedCollection.create(currentPhoto.attributes);
            this.viewedCollection.fetch()
                .done(function(response) {
                    //console.log(response);
                })
                .fail(function(error) {
                    console.log(error)
                });
        }
        });
    var main = new theMainView();
});