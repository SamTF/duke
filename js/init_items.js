//// Reading items in items.json and initalising each one into the web page from a template

const images_dir = "images/items/";
const sold_out = '<img src="images/sold_out.svg" title="Sold Out" class="sold-out">';

$.getJSON("items.json", function(json) {
    $.each(json, function(key, value) {
        var image_file = key + ".webp";
        var image_path = images_dir + image_file;
        var is_sold_out = value.price == 0 ? true : false;                                      // item price of 0 means the item is sold out
        
        create_item_card(value.name, image_path, value.price, is_sold_out);
    });
});

// CREATE ITEM CARD
function create_item_card(name, image_path, price, is_sold_out) {
    var clone = $($("#template").html());                                                       // gets the template element's HTML code
    $(".img-container > img", clone).attr("src", image_path);                                   // gets the main image and changes its source to the desired image
    $("#item-img", clone).attr("title", name);                                                  // changes the image title to match the item
    $("#item-price", clone).text(price);                                                        // sets the item-price p tag's text equal to the item price

    
    if (is_sold_out) {
        clone.prepend(sold_out);                                                                // adds the HTML code for the "Sold Out" banner if the item is sold out
        $("#price-container > p, #price-container > img", clone).remove();                      // removes the price and coin icon, but keeps the hr like in the game
    }

    $(".cat-items").append(clone);
}