var results; 

$(document).ready(function() {
    $("#search-bar").submit(function(e) {
        e.preventDefault();
        $.getJSON("https://en.wikipedia.org/w/api.php",
            {
                "action": "query",
                "generator": "search",
                "gsrsearch": $("#search").val(),
            	"prop": "pageimages|extracts",
                "titles": "Main Page",
	            "generator": "search",
                "piprop": "thumbnail|name",
	            "exchars": "150",
	            "exintro": 1,
	            "explaintext": 1,
                "format": "json",
                "origin": "*"
            },
            processSearchResult
        );
        $("#search").blur();
    });
});
  
function processSearchResult(data) {
    $(".collapse-box").css("height", "0");
    var pages = data.query.pages;
    console.log(pages);
    
    var resultObject = $(".result-object").first();
    $("#result-list").children().not(":first").remove();
    
    var numResult = 0;
    for (var index in pages) {
        var newResultObject = resultObject.clone();
        
        if (pages[index].thumbnail) {
            newResultObject.find(".result-thumbnail img").attr("src", pages[index].thumbnail.source);
        } else {
            newResultObject.find(".result-thumbnail img").remove();
            //newResultObject.css("margin-left", "50px");
        }
        
        newResultObject.find(".result-title h5").html(pages[index].title);
        newResultObject.find(".result-title").attr("href", "https://en.wikipedia.org/wiki/" + encodeURIComponent(pages[index].title));
        newResultObject.removeAttr("hidden");
        newResultObject.find(".result-extract").html(pages[index].extract);
        
        newResultObject.css("opacity", "0").animate({opacity:0}, numResult * 40 + 250).animate({opacity:1}, 600);
        $("#result-list").append(newResultObject);
        numResult++;
    }
}