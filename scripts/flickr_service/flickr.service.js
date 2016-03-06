/**
 * Created by Netta.bondy on 03/03/2016.
 */
define(['backbone', 'flickr_service/flickr.service.collection'],
    function(Backbone, FlickrServiceCollection){

        return function() {
            return {

                //fired on search button click
                doSearch: function(searchVal, callback){
                    var rootUrl = 'https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key=346c2b5529f2926ea20aad4cc8c689fc&format=json&nojsoncallback=1&sort=relevance&per_page=5&extras=url_q,url_l&text=',
                    tags = String(searchVal),
                    fullUrl = rootUrl.concat(tags);

                    //init collection
                    this.flickrServiceCollection = new FlickrServiceCollection(fullUrl);

                    //populate collection
                    this.flickrServiceCollection.fetch()
                    .done(function(){
                            console.log('am done');
                            callback();
                        }.bind(this))
                        .fail(function(error){
                            console.log(error);
                        });
                }
            }

        }

    });