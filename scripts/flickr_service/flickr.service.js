/**
 * Created by Netta.bondy on 03/03/2016.
 */
define(['backbone', 'flickr_service/flickr.service.collection'],
    function(Backbone, FlickrServiceCollection){

        return function() {
            return {

                doSearch: function(searchVal, callback){
                    var rootUrl = 'https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key=346c2b5529f2926ea20aad4cc8c689fc&format=json&nojsoncallback=1&sort=relevance&per_page=5&extras=url_q,url_l&text=';
                    var tags = String(searchVal);
                    //console.log(tags);
                    var fullUrl = rootUrl.concat(tags);
                    //console.log(fullUrl);
                    this.flickrServiceCollection = new FlickrServiceCollection(fullUrl);
                    //console.log(this.flickrServiceCollection.url);
                    this.flickrServiceCollection.fetch()
                    .done(function(){
                            console.log('am done');
                            callback();
                            //console.log(flickrServiceCollection[0]);
                            //console.log(response);

                            //how do I make this data available to parent view???
                        }.bind(this))
                        .fail(function(error){
                            console.log(error);
                        });
                }
            }

        }

    });