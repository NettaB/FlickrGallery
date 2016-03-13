/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore','backbone', 'dot', 'gallery/gallery.collection',
    'text!gallery/tmpl/gallery.view.template.html', 'text!gallery/tmpl/gallery.empty.tmpl.html',
    'text!modal/tmpl/modal.tmpl.html'],
    function($, _, Backbone, Dot, GalleryCollection, GalleryViewTemplate, GalleryViewEmpty,
    ModalView){

    return Backbone.View.extend({
        el: '#gallery',

        /**s
         * @returns {Array} smallPhotoArr to render in view
         */
        initialize: function(){
            console.log('Gallery view says hello world!');
            this.galleryDisplay = Dot.template(GalleryViewTemplate);
            this.collection = new GalleryCollection;

            this.galleryCounter = 0;

            this.on('collectionFull', this.setArray, this)
        },

        render: function(a){
            this.$el.empty().append(this.galleryDisplay({a}));
        },

        events: {
            'click #right-chevron': 'getNextGallery',
            'click #left-chevron': 'getPrevGallery',
            'click .gallery-photo': 'setPhotoDisplay'
        },

        /**
         * @function setArray
         * populates the array to be iterated over
         * calls render
         * returns this.galleriesArr
         */
        setArray: function() {
            console.log(this.galleryCounter);
            this.smallPhotosArr = [];
            this.galleriesArr = [];

            var currentModels = this.collection.models;
            /**
             * populates temporary array of models
             */
            for( var j = 0; j < currentModels.length; j++) {
                if (currentModels[j].attributes.url_l &&  currentModels[j].attributes.url_t){
                    this.smallPhotosArr.push(currentModels[j]);
                }
            }


            /**
             *populates galleriesArr with sub-arrays to display
             */
            var arrayLength = this.smallPhotosArr.length;
            var repeats = Math.floor(arrayLength/9);
            var leftover = arrayLength%9;
            var arrayEdge = 9;

            if(repeats != 0){
                for (var i = 0; i < repeats; i++) {
                    var localStart = i * 9;
                    var tempArr = this.smallPhotosArr.slice(localStart, arrayEdge);
                    this.galleriesArr.push(tempArr);
                    arrayEdge +=9
                }
            }

            if (leftover != 0) {
                if (arrayLength > 9){
                    var lastTempArr = this.smallPhotosArr.slice(arrayLength - 9, arrayLength);
                    this.galleriesArr.push(lastTempArr)
                } else {
                    this.galleriesArr.push(this.smallPhotosArr);
                }
            }

            this.render(this.galleriesArr[this.galleryCounter]);

        },

        /**
         * sets new array to display on forwards click
         * triggers new http call on parent view when array is done
         */
        getNextGallery: function() {
            var maxLength = this.galleriesArr.length;
            this.galleryCounter += 1;
            if (this.galleryCounter < maxLength) {
                this.render(this.galleriesArr[this.galleryCounter]);
            } else {
                this.trigger('nextPhotoPage')
            }
        },

        /**
         * sets new array to display on backwards click
         * triggers new http call on parent view when array is done
         */
        getPrevGallery: function() {
            this.galleryCounter -= 1;
            if (this.galleryCounter >= 0) {

                this.render(this.galleriesArr[this.galleryCounter]);
            } else {
                $("body").append(ModalView);
                //var galleryEmpty = Dot.template(GalleryViewEmpty);
                //this.$('#gallery-display').empty().prepend(galleryEmpty);
            }
        },

        /**
         * @function setPhotoDisplay
         * retrieves id of clicked photo
         * passes id to parentView
         * @triggers parentView:gallerySetsPhoto
         * @param e  -target of event
         */
        setPhotoDisplay: function(e) {
            $(e.target).siblings().removeClass("gallery-clicked");
            $(e.target).addClass("gallery-clicked");
            var clickedID = $(e.target).context.id;

            this.trigger('gallerySetsPhoto', clickedID);

        }

    });
});
