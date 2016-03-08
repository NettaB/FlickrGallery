/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore', 'backbone', 'dot', 'text!photo/tmpl/photo.view.template.html',
'text!photo/tmpl/photo.empty.tmpl.html'],
    function($, _, Backbone, Dot, PhotoViewTemplate, PhotoViewEmpty){

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

            /**
             * @event nextPhotoPage
             */
            this.on('nextPhotoPage', this.onNextPhotoPage, this);
            /**
             * @event collectionFull
             */
            this.on('collectionFull', this.setArray, this)

        },

        /**
         * @function render
         * renders view with url from position matching photoCounter
         */
        render: function(){
            this.$el.empty().append(this.photoDisplay({
                url:this.largePhotos[this.photoCounter]}));

        },

        /**
         * @function setArray
         * sets array to iterate over
         * executes render
         */
        setArray: function() {

            this.photoCounter = 0;
            console.log(this.photoCounter);
            this.largePhotos = [];
            //console.log('photo view is rendered');
            var sortLargePhotos =  function(modelObject){
                if (modelObject.attributes.url_l &&  modelObject.attributes.url_t){
                    return modelObject.attributes.url_l;
                }
            };

            //creates new temporary array for photos with urls
            var largePhotosTemp = _.map(this.collection.models, sortLargePhotos);

            //creates new array of urls for large photos
            for (var i = 0; i < 20; i++){
                if (largePhotosTemp[i] !== undefined) {
                    this.largePhotos.push(largePhotosTemp[i])
                }
            }

            this.render();
        },

        events: {
            'click #right-chevron': 'getNextPhoto',
            'click #left-chevron': 'getPrevPhoto'
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
                this.render();
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
            console.log(this.photoCounter);
            if(this.photoCounter > 0) {
                this.render();
            } else {
                this.trigger('prevPhotoPage')
            }
        },

        /**
         * @function alertFirstPhoto
         * sets message on reaching first photo
         */
        alertFirstPhoto: function() {
            var photoEmpty = Dot.template(PhotoViewEmpty);
            this.$('.image-display').empty().append(photoEmpty)
        }

    });
});
