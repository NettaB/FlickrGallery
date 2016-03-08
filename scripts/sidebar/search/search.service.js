/**
 * Created by Netta.bondy on 02/03/2016.
 */

//flickr api call
//&tags=waterfall
define(['jquery', 'backbone', 'localStorage'],function($, Backbone, LocalStorage){

    return Backbone.Collection.extend({

        //localStorage: new Backbone.LocalStorage('SearchService'),
        initialize: function(){
            this.searchTerm = 'waterfalls';

            this.on('newSearchDone', this.urlSet);

        },

        url: this.fullUrl,

        urlSet: function(searchVal){
            this.searchTerm = searchVal;
            var rootUrl = 'https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key=346c2b5529f2926ea20aad4cc8c689fc&format=json&nojsoncallback=1&sort=relevance&per_page=5&extras=url_t,url_l&tags=';
            this.fullUrl = rootUrl.concat(this.searchTerm);
            console.log(this.fullUrl);
            return this.fullUrl
        },




//;
            /*console.log('shots fired!');
            var searchResultsArr = [];
            //flickrAPI = "https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key=346c2b5529f2926ea20aad4cc8c689fc&format=json&nojsoncallback=1&sort=relevance&per_page=5&extras=url_t,url_l&tags=waterfall";

            $.getJSON('https://api.flickr.com/services/rest?&method=flickr.photos.search&api_key=346c2b5529f2926ea20aad4cc8c689fc&format=json&nojsoncallback=1&sort=relevance&per_page=5&extras=url_t,url_l&tags=waterfall',
                {
                    tags: this.searchTerm
                }
            )
                .done(function(data){
                    console.log('I am done');
                    console.log(data);
                    //var response = data,
                    //parsedData = JSON.parse(response);
                    //console.log('parsed data ' + parsedData);
                    for (var i = 0; i < 5; i++){
                        searchResultsArr.push(data.photos.photo[i]);
                    }
                    console.log(searchResultsArr);
                })
                .fail(function(err){
                    console.log(err)
                });
        }*/
    })
});


