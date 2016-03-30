/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore', 'backbone', 'dot', 'photo/photo.collection', 'text!photo/tmpl/photo.view.template.html'],
    function($, _, Backbone, Dot, PhotoCollection, PhotoViewTemplate){

        /**
         * @property {object} photoCounter      -counts clicks to navigate photos
         * @property {Array} largePhotos        -array of photo urls for iteration
         * @property {object} photoDisplay      -templates from PhotoViewTemplate
         */
        return Backbone.View.extend({
        el: '#photo',

        /**
         * @function initialize
         * sets template
         */
        initialize: function(){
            this.photoDisplay = Dot.template(PhotoViewTemplate);

            this.collection = new PhotoCollection;
            this.photoCounter = 0;

            /**
             * @event collectionFull
             */
            this.on('collectionFull', this.setArray, this);
            this.on('favoritesRequested', this.showFavorites, this);
            this.on('favoriteSpotted', this.markFavorite, this);

        },

        /**
         * @function render
         * renders view with url from position matching photoCounter
         */
        render: function(currentPhoto){
            this.$el.empty().append(this.photoDisplay(currentPhoto));
            this.currentPhoto = currentPhoto;
            this.trigger('viewed', this.currentPhoto);
        },

        /**
         * @function setArray
         * sets array to iterate over
         * executes render
         */
        setArray: function() {
            this.largePhotos = [];
            var that = this,
                currentModels = this.collection.models;

            _.each(currentModels, function(item){
                if(item.attributes.url_l && item.attributes.url_t) {
                    that.largePhotos.push(item)
                }
            });

            var currentPhoto = this.largePhotos[this.photoCounter];
            this.render(currentPhoto);
        },

        events: {
            'mouseover #right-chevron-div': 'showChevron',
            'mouseout #right-chevron-div': 'hideChevron',
            'mouseover #left-chevron-div': 'showChevron',
            'mouseout #left-chevron-div': 'hideChevron',
            'click #right-chevron-div': 'getNextPhoto',
            'click #left-chevron-div': 'getPrevPhoto',
            'click #favorites-btn': 'toggleFavorites'
        },

        /**
         * @function nextPhoto
         * adds 1 to photoCounter
         */
        getNextPhoto: function(e){
            var maxLength = this.largePhotos.length;
            this.photoCounter +=1;
            clickedElem = $(e.target);
            //console.log(this.photoCounter);

            if(this.favorites) {
                if(this.photoCounter < maxLength) {
                    var currentPhoto = this.largePhotos[this.photoCounter];
                    this.render(currentPhoto);
                } else {
                    clickedElem.hide();

                }
            } else{
                if (this.photoCounter < maxLength) {
                    var currentPhoto = this.largePhotos[this.photoCounter];
                    this.render(currentPhoto);
                } else {
                    this.trigger('nextPhotoPage')
                }
            }

        },

        /**
         * @function prevPhoto
         * subtracts 1 from photoCounter
         */
        getPrevPhoto: function(e){
            this.photoCounter -=1;
            if(this.photoCounter >= 0) {
                var currentPhoto = this.largePhotos[this.photoCounter];
                this.render(currentPhoto);
            } else {
                $(e.target).addClass('hidden')
            }
        },

        /**
         * @function gallerySetView
         * retrieves photo url based on id string passed from parentView
         * renders url for current photo.
         * @param a {string}  -the id string passed from parent view
         */
        gallerySetView: function(a){
            var currentPhoto = this.collection.findWhere({id:a});
            this.photoCounter = this.collection.models.indexOf(currentPhoto);
            this.render(currentPhoto);
        },

            /**
             * @function toggleFavorites
             * toggles favorite indication on this view
             * @fires ParentView#favorited
             * passes photo to be added to favorites collection
             * @param e
             */
        toggleFavorites: function(e) {
            var clicked = $(e.target);
            clicked.toggleClass("clicked");
            this.trigger('favorited', this.currentPhoto)
        },

        /**
         * @function markFavorite
         * marks a photo as existing in the favorites collection
         */
        markFavorite: function() {
            var star = $('#star-button');
            star.addClass('clicked');
        },

        showChevron: function(e) {
            var elem =  $(e.target);
            var directly = elem.find('span');
            directly.addClass('viewable')
        },

        hideChevron: function(e) {
            var elem = $(e.target);
            var directly = elem.find('span');
            directly.removeClass('viewable')
        }


    });
});
