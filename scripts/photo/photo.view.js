/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'underscore', 'backbone', 'dot', 'text!photo/tmpl/photo.view.template.html',
'text!photo/tmpl/photo.view.empty.template.html'],
    function($, _, Backbone, Dot, PhotoViewTemplate, PhotoViewEmpty){

    return Backbone.View.extend({
        el: '#photo',
        initialize: function(){
            console.log('Photo view says hello world!');
            this.photoCounter = 0;
            console.log(this.photoCounter);
            this.largePhotos = [];
            this.photoDisplay = Dot.template(PhotoViewTemplate);

            //this.render();

            this.on('collectionFull', this.showPhoto, this)
        },

        render: function(){
            //var emptyPhotoSection = Dot.template(PhotoViewEmpty);
            //this.$el.append(emptyPhotoSection);

        },

        events: {
            'click #right-chevron': 'nextPhoto',
            'click #left-chevron': 'prevPhoto'
        },

        showPhoto: function() {
            //render photo view on collection creation.
            //triggered from Parent View
            console.log('photo view is rendered');

            //sort urls into array,
            //excluding ones that don't have a large or small url
            var sortLargePhotos =  function(modelObject){
                if (modelObject.attributes.url_l &&  modelObject.attributes.url_t){
                return modelObject.attributes.url_l;
                }
            };
            var largePhotosTemp = _.map(this.collection.models, sortLargePhotos);

            //test
            //console.log(largePhotosTemp);
            //console.log(largePhotosTemp.length);
            //end test

            //remove undefined from array
            for (var i = 0; i < 20; i++){
                if (largePhotosTemp[i] !== undefined) {
                    this.largePhotos.push(largePhotosTemp[i])
                }
            }

            //test
            //console.log("final array");
            //console.log(this.largePhotos);
            //test end

            //render first photo
            this.$el.empty().append(this.photoDisplay({
                url:this.largePhotos[this.photoCounter]}));
            //console.log(this.photoCounter);
            //return this.largePhotos
        },

        nextPhoto: function(){
            var maxLength = this.largePhotos.length;
            this.photoCounter +=1;
            console.log(this.photoCounter);
            this.$el.empty().append(this.photoDisplay({url: this.largePhotos[this.photoCounter]}))

        },

        prevPhoto: function(){
            this.photoCounter -=1;
            console.log(this.photoCounter);
            this.$el.empty().append(this.photoDisplay({
                url: this.largePhotos[this.photoCounter]}));

        }

    });
});
