// set up collection for storing products in the database
Products = new Mongo.Collection('products');

if (Meteor.isClient) {

  // products helper for the fridge
  Template.fridge.helpers({
    products: function(){
      return Products.find({
        place: 'fridge'
      });
    }
  });

  // products helper for the supermarket
  Template.productList.helpers({
    products: function(){
      return Products.find({
        place: 'supermarket'
      });
    }
  });

  // add jQuery event listener focusing just on elements in the template
  Template.fridge.onRendered(function(){

    // provide local variable for clarity
    var templateInstance = this;

    // limit jQuery scope to just this template instance
    templateInstance.$('#fridge').droppable({
      drop: function(evt, ui){
        //do something
      }
    });
  });

}

if (Meteor.isServer) {

  // bootstrapping a few things
  Meteor.startup(function () {

    // remove all products
    Products.remove({});

    // populate the database with some products
    Products.insert({
      name: 'Milk',
      img: '/milk.png',
      place: 'fridge'
    });
    Products.insert({
      name: 'Bread',
      img: '/bread.png',
      place: 'supermarket'
    });

  });

}
