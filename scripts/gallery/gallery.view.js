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
            this.galleryDisplay = Dot.template(GalleryViewTemplate);

            this.on('collectionFull', this.setArray, this)
        },

        render: function(){
            var smallPhotoArr = this.smallPhotos.slice(0,9);
            this.$el.empty().append(this.galleryDisplay({
                smallPhotoArr}));
        },

        setArray: function() {
            this.galleryCounter = 0;
            console.log("this is the gallery counter");
            console.log(this.galleryCounter);
            this.smallPhotos = [];

            var sortSmallPhotos =  function(modelObject){
                if (modelObject.attributes.url_l &&  modelObject.attributes.url_t){
                    return modelObject.attributes.url_t;
                }
            };
            var smallPhotosTemp = _.map(this.collection.models, sortSmallPhotos);

            for (var i = 0; i < 20; i++){
                if (smallPhotosTemp[i] !== undefined) {
                    this.smallPhotos.push(smallPhotosTemp[i])
                }
            }

            this.render();

        }


    });
});
