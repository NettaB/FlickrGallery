/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore','backbone', 'dot',
    'text!gallery/tmpl/gallery.view.template.html', 'text!gallery/tmpl/gallery.empty.tmpl.html'],
    function($, _, Backbone, Dot, GalleryViewTemplate, GalleryViewEmpty){

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
            var a = this.smallPhotoArr;
            this.$el.empty().append(this.galleryDisplay({a}));
        },

        events: {
            'click #right-chevron': 'getNextPhoto',
            'click #left-chevron': 'getPrevPhoto'

        },

        setArray: function() {
            this.galleryCounter = 9;
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
            this.smallPhotoArr = this.smallPhotos.slice(0,9);
            this.render();
        },

        getNextPhoto: function() {
            var maxLength = this.smallPhotos.length;
            if (this.galleryCounter < maxLength) {
                this.smallPhotoArr.shift();
                this.smallPhotoArr.push(this.smallPhotos[this.galleryCounter]);
                this.galleryCounter += 1;
                console.log(this.galleryCounter);
                this.render();
            } else {
                this.trigger('nextPhotoPage')
            }
        },

        getPrevPhoto: function() {
            var prevPhoto = this.galleryCounter - 10;
            if (this.galleryCounter > 9) {
                this.smallPhotoArr.pop();
                this.smallPhotoArr.unshift(this.smallPhotos[prevPhoto]);
                this.galleryCounter -= 1;
                console.log(this.galleryCounter);
                this.render();
            } else {
                this.trigger('prevPhotoPage')
            }
        },

        alertFirstPhoto: function() {
            console.log('gallery knows its empty')
            var galleryEmpty = Dot.template(GalleryViewEmpty);
            this.$('#gallery-display').empty().prepend(galleryEmpty)
        }


    });
});
