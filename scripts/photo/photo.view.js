/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore', 'backbone', 'dot', 'photo/photo.collection', 'text!photo/tmpl/photo.view.template.html',
'text!photo/tmpl/photo.empty.tmpl.html'],
    function($, _, Backbone, Dot, PhotoCollection, PhotoViewTemplate, PhotoViewEmpty){

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
            console.log('Photo view says hello world!');

            this.photoDisplay = Dot.template(PhotoViewTemplate);

            this.collection = new PhotoCollection;

            this.photoCounter = 0;

            /**
             * @event collectionFull
             */
            this.on('collectionFull', this.setArray, this)

        },

        /**
         * @function render
         * renders view with url from position matching photoCounter
         */
        render: function(currentPhoto){
            this.$el.empty().append(this.photoDisplay(currentPhoto));

        },

        /**
         * @function setArray
         * sets array to iterate over
         * executes render
         */
        setArray: function() {
            this.largePhotos = [];
            var currentModels = this.collection.models;

            for (var i = 0; i < currentModels.length; i++){
                if(currentModels[i].attributes.url_l && currentModels[i].attributes.url_t){
                    this.largePhotos.push(currentModels[i]);
                }
            }

            var currentPhoto = this.largePhotos[this.photoCounter];
            this.render(currentPhoto);
        },

        events: {
            'click #photo-right-chevron': 'getNextPhoto',
            'click #photo-left-chevron': 'getPrevPhoto'
        },

        /**
         * @function nextPhoto
         * adds 1 to photoCounter
         */
        getNextPhoto: function(){
            var maxLength = this.largePhotos.length;
            this.photoCounter +=1;
            console.log(this.photoCounter);

            if (this.photoCounter < maxLength) {
                var currentPhoto = this.largePhotos[this.photoCounter];
                this.render(currentPhoto);
            } else {
                this.trigger('nextPhotoPage')
            }
        },

        /**
         * @function prevPhoto
         * subtracts 1 from photoCounter
         */
        getPrevPhoto: function(){
            this.photoCounter -=1;
            if(this.photoCounter >= 0) {
                var currentPhoto = this.largePhotos[this.photoCounter];
                this.render(currentPhoto);
            } else {
                this.trigger('prevPhotoPage');
                var photoEmpty = Dot.template(PhotoViewEmpty);
                this.$('.image-display').empty().prepend(photoEmpty)
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
            console.log(this.photoCounter);
            this.render(currentPhoto);
        }

    });
});
