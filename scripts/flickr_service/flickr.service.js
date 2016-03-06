/**
 * Created by Netta.bondy on 03/03/2016.
 */
define(['backbone', 'flickr_service/flickr.service.collection'],
    function(Backbone, FlickrServiceCollection){

        return function() {
            return {
                rootUrl: 'https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key=0affe632606ef9d2bef8d03065994c47&format=json&nojsoncallback=1&sort=relevance&per_page=5&extras=url_q,url_l',
                //fired on search button click
                doSearch: function(searchVal, callback){
                    var tags = '&text=' + String(searchVal),
                        fullUrl = this.rootUrl.concat(tags);

                    //init collection
                    this.flickrServiceCollection = new FlickrServiceCollection(fullUrl);

                    //populate collection
                    this.flickrServiceCollection.fetch()
                    .done(function(){
                            //console.log('am done');
                            callback();
                        }.bind(this))
                        .fail(function(error){
                            console.log(error);
                        });
                },

                //method to move on to next results page
                setPage: function(pageNo){
                    var newPage = '&page=' + String(pageNo);
                    this.rootUrl.concat(newPage);

                }

            }

        }

    });