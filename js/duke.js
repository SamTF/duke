//// Changes the item image preview and item stats panel when hovering over an item
//// Hides the stats panel is the item has no stats


// https://stackoverflow.com/questions/5439394/using-children-to-get-an-img-element/5439411 and https://stackoverflow.com/questions/29195050/get-src-of-child-image and https://stackoverflow.com/questions/2186096/retrieve-child-img-src-jquery
// https://www.geeksforgeeks.org/how-to-change-the-src-attribute-of-an-img-element-in-javascript-jquery/
///// CHANGE IMAGE PREVIEW ON HOVER
$(document).ready(function() {
    $(".item").mouseenter(
        function() {
            var source = $('#item-img', this).prop("src")   // gets the source of the selected image

            console.log(get_file_name(source))
            
            change_preview(get_preview(source))         // updates the big preview to match the selected image

            get_stats(source)                           // updates the item info and stats
        }
    )
});

// Changes image src attribute of the img with id=preview-image
function change_preview(source) {
    $('#preview-image').attr("src", source)
}

// Gets the Big HD Preview version of any image - or shows no image if the item is sold out
function get_preview(source) {
    var position = (source.length - 5)  // appends the _HD suffix at the -4th index : before the .png
    return source.substring(0, position) + "_HD" + source.substring(position);
}

// Getting only the file name of any image
function get_file_name(source) {
    var file_name = /[^/]*$/.exec(source)[0];   // regex from https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-last-slash-in-javascript
    file_name = file_name.slice(0, -5)          // removes the .png
    return file_name
}


//// CHANGE ITEM STATS USING JSON
// Getting item stats from JSON file
function get_stats(source) {

    var item = get_file_name(source);           // gets the item's name

    // loads the items.json file
    $.getJSON("items.json", function(json) {

        // checks if the specified item exists in the json file
        if (json.hasOwnProperty(item)) {
            change_info(json[item]);            // changes current info box to display values of the selected item
        }
        // item doesn't exist: error message
        else {
            console.log('Key "' + item + '" does not exist in items.json');
        }
    });
}

// Updates the info box and stats to reflect the currently selected item
function change_info(item) {
    //  Item Info
    $('#info-item-name').text(item.name);
    $('#info-item-type').text(item.type);
    $('#info-item-desc').text(item.description);

    // Item Stats
    $('#item-stats-power').text(item.stats[0])
    $('#item-stats-rof').text(item.stats[1])
    $('#item-stats-reload').text(item.stats[2])
    $('#item-stats-ammo').text(item.stats[3])

    // Toggling Stats Box - !!value converts value into boolean - https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/
    toggle_stats_box(!!item.stats[0]);
}


// TOGGLING STATS BOX
// Hardcoded Grid Layout
var grid_original       = '9% 57% 34%';
var grid_hidden_stats   = '9% 1fr 0%';
var grid_layouts        = [grid_hidden_stats, grid_original];

var visibility = ['hidden', 'visible']

var stats_visible = true;

// Function to toggle between showing and hiding the stats box
function toggle_stats_box(show) {
    // Does nothing if current display status already matches desired status
    if (stats_visible == show) {
        return
    }

    // Converts to int to get the desired grid layout from the array
    var i = show ? 1 : 0;

    // Changes the 'grid-template-rows' css property of the Preview div
    $('.preview').css('grid-template-rows', grid_layouts[i]);
    // Toggles the visibility of the stats-box
    $('.stats-box').css('visibility', visibility[i]);

    // Inverts the value of the bool
    stats_visible = !stats_visible;
}