/**
 * Created by Netta.bondy on 29/02/2016.
 */

define(['backbone', 'localStorage', 'history.model'],
    function(Backbone, LocalStorage, HistoryModel){
        return Backbone.Collection.extend ({
            model: HistoryModel,
            localStorage: new Backbone.LocalStorage('HistoryCollection'),
            initialize: function(){
                //var that = this;
                //var localStorageItems = this.localStorage.records;
                //console.log(localStorageItems.length);

                //this.pop();
                //if(localStorageItems.length > 150) {
                    //for (var i = 150; i < localStorageItems.length; i++) {
                    //    var j = localStorageItems[i].id;
                     //   that.localStorage.removeItem(j)
                   // }
               // }
                //console.log(localStorageItems.length);
                //this.localStorage.clear();
                //console.log(this.localStorage.records.length);
                //var historyLength = this.localStorage.length;
                //console.log(historyLength);
                //var storedCollection = this.localStorage;
                //if (storedCollection.length > 20) {
                   // var i = storedCollection.length - 20;
                   // for (var j = 0; j < i; j++) {
                   //     storedCollection.pop();
                  //  }
              //  }
               // this.render()
                //this.localStorage.removeItem(/*****byID*/)
            }
            //render: function() {

//                }

        });
});
