/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore', 'backbone', 'dot', 'text!photo/tmpl/photo.view.template.html',
'text!photo/tmpl/photo.view.empty.template.html'],
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
         * @return {number} this.photoCounter
         * @return {Array} this.largePhotos
         */
        initialize: function(){
            console.log('Photo view says hello world!');
            this.photoCounter = 0;
            console.log(this.photoCounter);
            this.largePhotos = [];
            this.photoDisplay = Dot.template(PhotoViewTemplate);

            //checks for missing urls
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
            /**
             * @function render
             * renders view with url from position matching photoCounter
             */

        render: function(){
            //console.log('photo view is rendered');
            this.$el.empty().append(this.photoDisplay({
                url:this.largePhotos[this.photoCounter]}));

        },

        events: {
            'click #right-chevron': 'nextPhoto',
            'click #left-chevron': 'prevPhoto'
        },
            /**
             * @function nextPhoto
             * adds 1 to photoCounter
             */
        nextPhoto: function(){
            var maxLength = this.largePhotos.length;
            this.photoCounter +=1;
            console.log(this.photoCounter);
            this.render();

        },

        /**
         * @function prevPhoto
         * subtracts 1 from photoCounter
         */
        prevPhoto: function(){
            this.photoCounter -=1;
            console.log(this.photoCounter);
            this.render();
        }

    });
});
