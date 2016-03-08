/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore','backbone', 'dot',
    'text!gallery/tmpl/gallery.view.template.html'],
    function($, _, Backbone, Dot, GalleryViewTemplate){

    return Backbone.View.extend({
        el: '#gallery',

        /**s
         * @returns {Array} smallPhotoArr to render in view
         */
        initialize: function(){
            console.log('Gallery view says hello world!');
            this.photoCounter = 0;
            console.log(this.photoCounter);
            this.smallPhotos = [];
            this.galleryDisplay = Dot.template(GalleryViewTemplate);

            console.log('gallery view is rendered');

            var sortLargePhotos =  function(modelObject){
                if (modelObject.attributes.url_l &&  modelObject.attributes.url_t){
                    return modelObject.attributes.url_t;
                }
            };
            var smallPhotosTemp = _.map(this.collection.models, sortLargePhotos);

            for (var i = 0; i < 20; i++){
                if (smallPhotosTemp[i] !== undefined) {
                    this.smallPhotos.push(smallPhotosTemp[i])
                }
            }

            this.render();

            //this.on('collectionFull', this.populateGallery, this)

        },

        render: function(){
            var smallPhotoArr = this.smallPhotos.slice(0,5);
            this.$el.empty().append(this.galleryDisplay({
                smallPhotoArr}));
        }

        //populateGallery: function() {
            //render photo view on collection creation.
            //triggered from Parent View


            //sort urls into array,
            //excluding ones that don't have a large or small url


            //test
            //console.log(largePhotosTemp);
            //console.log(largePhotosTemp.length);
            //end test

            //remove undefined from array


            //test
            //console.log("final array");
            //console.log(this.largePhotos);
            //test end

            //render first photo

            //console.log(this.photoCounter);
            //return this.largePhotos
        //}

    });
});
