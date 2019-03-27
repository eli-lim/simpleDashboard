$(document).ready(function(){
    // this hides news panel and sets stock-twits panel to be displayed first
    $("#news-panel").hide()

    $("#twitter-show").click(function () {
        $("#stock-twits-panel").show()
        $("#news-panel").hide()
        $("#news-show").removeClass("btn-news-active")
        $(this).addClass("btn-news-active")
    })

    $("#news-show").click(function () {
        $("#news-panel").show()
        $("#stock-twits-panel").hide()
        $("#twitter-show").removeClass("btn-news-active")
        $(this).addClass("btn-news-active")
    })

    //select twitter on page load
    $(function() {
        $("#twitter-show").trigger("click");
    })
})  