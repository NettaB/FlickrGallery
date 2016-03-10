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
            this.galleryCounter = 0;
            console.log("this is the gallery counter");
            console.info(this.galleryCounter);
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
            var arrayNum = Math.floor(arrayLength/9);
            var arrayLeftover = arrayLength%9;
            var arrayCounter = 0;
            console.log(arrayNum);
            console.log(arrayLeftover);

            for (var i = 0; i < arrayNum; i++) {
                var arrayEdge = (i+1) * 9;
                var tempArr = this.smallPhotosArr.slice(arrayCounter, arrayEdge);
                this.galleriesArr.push(tempArr);
                arrayCounter += 9
            }
            console.log(this.galleriesArr.length);

            var lastTempArr = this.smallPhotosArr.slice (arrayLength - 9, arrayLength);
            this.galleriesArr.push(lastTempArr);
            console.info(this.galleriesArr.length);

            this.render(this.galleriesArr[this.galleryCounter]);

        },

        /**
         * sets new array to display on forwards click
         * triggers new http call on parent view when array is done
         */
        getNextGallery: function() {
            var maxLength = this.galleriesArr.length;
            console.info(maxLength);
            this.galleryCounter += 1;
            console.info(this.galleryCounter);
            if (this.galleryCounter < maxLength) {
                console.log(this.galleryCounter);
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
            //var prevPhoto = this.galleryCounter - 10;
            this.galleryCounter -= 1;
            if (this.galleryCounter > 0) {
                console.log(this.galleryCounter);
                this.render(this.galleriesArr[this.galleryCounter]);
            } else {
                this.trigger('prevPhotoPage')
            }
        },

        /**
         * executes when there are no more photos to display
         */
        alertFirstPhoto: function() {
            console.log('gallery knows its empty');
            var galleryEmpty = Dot.template(GalleryViewEmpty);
            this.$('#gallery-display').empty().prepend(galleryEmpty);
        },


        /**
         * @function setPhotoDisplay
         * retrieves id of clicked photo
         * passes id to parentView
         * @triggers parentView:gallerySetsPhoto
         * @param e  -target of event
         */
        setPhotoDisplay: function(e) {
            var clickedID = $(e.target).context.id;
            //console.log(clickedID);
            this.trigger('gallerySetsPhoto', clickedID);

        }

    });
});
