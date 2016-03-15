/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore','backbone', 'dot', 'gallery/gallery.collection',
    'text!gallery/tmpl/gallery.view.template.html', 'viewed/viewed.collection'],
    function($, _, Backbone, Dot, GalleryCollection, GalleryViewTemplate, ViewedCollection){

    return Backbone.View.extend({
        el: '#gallery',

        /**s
         * @returns {Array} smallPhotoArr to render in view
         */
        initialize: function(){
            console.log('Gallery view says hello world!');
            this.galleryDisplay = Dot.template(GalleryViewTemplate);
            this.collection = new GalleryCollection;
            this.viewedCollection = new ViewedCollection;

            this.galleryCounter = 0;
            this.favorites = 0;

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
            //console.log(this.galleryCounter);
            this.smallPhotosArr = [];
            this.galleriesArr = [];
            this.getViewed();

            var currentModels = this.collection.models;
            var cMLength = currentModels.length;
            /**
             * populates temporary array of models
             */
            for( var j = 0; j < cMLength; j++) {
                if (currentModels[j].attributes.url_l &&  currentModels[j].attributes.url_t){
                    this.smallPhotosArr.push(currentModels[j]);
                }
                if (this.smallPhotosArr[j]) {
                    var photoID = this.smallPhotosArr[j].id;
                    var thisPhoto = this.viewedCollection.findWhere({id: photoID});
                    if(thisPhoto){
                        this.smallPhotosArr[j].viewed = true;
                    }
                }
            }
            //console.log(this.smallPhotosArr);

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

        getViewed: function(){
            var that = this;
            this.viewedCollection.fetch()
                .done(function(response){
                    var viewedLength = response.length;
                    if (viewedLength > 50) {
                        var responseDiff = viewedLength - 20;
                        for (var i = 0; i < responseDiff; i++) {
                            that.viewedCollection.at(i).destroy();
                        }
                    }
                })
        },

        /**
         * sets new array to display on forwards click
         * triggers new http call on parent view when array is done
         */
        getNextGallery: function(e) {
            var maxLength = this.galleriesArr.length;
            this.galleryCounter += 1;
            var clickedElem = $(e.target);

            //if (this.favorites) {
              //  if (this.galleryCounter < maxLength) {
           //         this.render(this.galleriesArr[this.galleryCounter])
             //   } else {
               //     clickedElem.addClass('hidden')
               // }
           // } else {
                if (this.galleryCounter < maxLength) {
                    this.render(this.galleriesArr[this.galleryCounter]);
                } else {
                    this.trigger('nextPhotoPage');
                    console.log(this.id);
                }
           // }
        },

        /**
         * sets new array to display on backwards click
         * triggers new http call on parent view when array is done
         */
        getPrevGallery: function(e) {
            this.galleryCounter -= 1;
            if (this.galleryCounter >= 0) {

                this.render(this.galleriesArr[this.galleryCounter]);
            } else {
                $(e.target).addClass("hidden");
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
            var clicked = $(e.target);
            clicked.siblings('.eyee-hidden').css("opacity", "1");

            var otherImg = clicked.parent().siblings().children('img');

            clicked.addClass("gallery-clicked");
            otherImg.removeClass('gallery-clicked');

            var clickedID = clicked.context.id;

            this.trigger('gallerySetsPhoto', clickedID);

        }

    });
});
