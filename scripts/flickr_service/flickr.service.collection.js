/**
 * Created by Netta.bondy on 03/03/2016.
 */
define(['backbone', 'underscore', 'flickr_service/flickr.service.model'],
    function(Backbone, _, FlickrServiceModel){

        return Backbone.Collection.extend({
            model: FlickrServiceModel,
            initialize: function(fullUrl) {
                this.url = fullUrl;

            },
            /**
             * @param {Object} response Response from flickr
             * @returns {Array|*} Array of photo objects with necessary data - urls, photo sizes and ids
             */
            parse: function(response) {
                console.log('Am parsing!');
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