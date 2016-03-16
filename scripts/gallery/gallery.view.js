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
            this.galleryDisplay = Dot.template(GalleryViewTemplate);
            this.collection = new GalleryCollection;
            this.viewedCollection = new ViewedCollection;

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

        defaults: {
            galleryLength:  9
        },

        /**
         * @function setArray
         * populates the array to be iterated over
         * calls render
         * returns this.galleriesArr
         */
        setArray: function() {
            this.smallPhotosArr = [];
            this.galleriesArr = [];
            this.getViewed();

            var that = this,
                currentModels = this.collection.models;

            /**
             * populates temporary array of models
             */
            _.each(currentModels, function(item) {
                if(item.attributes.url_l && item.attributes.url_t) {
                    that.smallPhotosArr.push(item)
                }
            });

            /**
             * adds viewed attributes to photos in viewed collection
             */
            _.each(this.smallPhotosArr, function(item) {
                var photoID = item.id;
                var viewedPhoto = that.viewedCollection.findWhere({id: photoID});
                if(viewedPhoto){
                    item.viewed = true
                }

            });

            /**
             *populates galleriesArr with sub-arrays to display
             */
            var arrayLength = this.smallPhotosArr.length;
            var repeats = Math.floor(arrayLength/9);
            var leftover = arrayLength%9;
            var arrayEdge = this.defaults.galleryLength;

            if(repeats != 0){
                for (var i = 0; i < repeats; i++) {
                    var localStart = i * this.defaults.galleryLength;
                    var tempArr = this.smallPhotosArr.slice(localStart, arrayEdge);
                    this.galleriesArr.push(tempArr);
                    arrayEdge += this.defaults.galleryLength
                }
                this.limit = repeats -1;
            }

            if (leftover != 0) {
                var loStart = arrayLength - leftover;
                var lastArr = this.smallPhotosArr.slice(loStart, arrayLength);
                this.galleriesArr.push(lastArr);
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
                .fail(function(err){
                    console.log(err)
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

            if (this.favorites) {
                if(this.galleryCounter < maxLength) {
                    this.render(this.galleriesArr[this.galleryCounter])
                } else {
                    clickedElem.hide(0);
                }
            } else {
                if (this.galleryCounter < this.limit) {
                    this.render(this.galleriesArr[this.galleryCounter])
                } else {
                    this.trigger('nextPhotoPage')
                }
            }
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
