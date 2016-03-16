/**
 * Created by Netta.bondy on 03/03/2016.
 */
define(['backbone', 'underscore', 'photo.model'],
    function(Backbone, _, PhotoModel){

        return Backbone.Collection.extend({
            model: PhotoModel,
            initialize: function(fullUrl) {
                this.url = fullUrl;

            },
            /**
             * @param {Object} response Response from flickr
             * @returns {Array|*} Array of photo objects with necessary data - urls, photo sizes and ids
             */
            parse: function(response) {
                this.totalPages = response.photos.pages;
                var photoArr = response.photos.photo;
                var newModels = _.map(photoArr, function(item){
                    return {
                        id: item.id,
                        url_t: item.url_q,
                        url_l: item.url_l,
                        height_l: item.height_l,
                        width_l: item.width_l
                    }
                });
                return newModels;

                }

        })

});