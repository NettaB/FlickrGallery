/**
 * Created by Netta.bondy on 03/03/2016.
 */
define(['backbone', 'flickr_service/flickr.service.collection'],
    function(Backbone, FlickrServiceCollection){

        /**
         * @file service to retrieve data from flickr
         */
        return function(apiKey) {
            return {
                /**
                 * @property {string} base url
                 */
                rootUrl:  'https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key='
                        .concat(apiKey)
                        .concat('&format=json&nojsoncallback=1&sort=relevance&per_page=50&extras=url_q,url_l'),

                //'0affe632606ef9d2bef8d03065994c47'


                /**
                 * @param {string} searchVal user-input for search term
                 * @param {function} callback callback function generated by parent view
                 * @returns {Object} flickrServiceCollection new flickr collection
                 */
                doSearch: function(searchVal, callback){
                    var tags = '&text=' + String(searchVal),
                        fullUrl = this.rootUrl.concat(tags);

                    /**
                     * @exports flickrServiceCollection
                     */
                    this.flickrServiceCollection = new FlickrServiceCollection(fullUrl);

                    //populate collection
                    this.flickrServiceCollection.fetch()
                    .done(function(){
                            callback();
                        }.bind(this))
                        .fail(function(error){
                            console.log(error);
                        });
                },

                /**
                 * @param {number} pageNo page to request from api
                 * @returns {string} rootUrl with new argument for page no.
                 */
                setPage: function(pageNo){
                    var newPage = '&page=' + String(pageNo);
                    this.rootUrl =  this.rootUrl.concat(newPage)
                }
            }
        }
    });