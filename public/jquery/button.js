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
        $("#dashboard-button").trigger("click");
    })

    $("#dashboard-button").click(function () {
        $("#MainChart").show()
        $("#portfolio-table").hide()
        $("#portfolio-display").hide()
        
        $("#portfolio-button").removeClass("profile-button-active")
        $(this).addClass("profile-button-active")

        //showing dashboard sidebar
        $("#stock-widget").show()
        $("#stock-twits-panel").show()
        $("#twitter-show").trigger("click");
        $("#news-buttons").show()
        $("#MainChart").show()
    })

    $("#portfolio-button").click(function () {
        $("#portfolio-table").show()
        $("#portfolio-display").show()
        // hiding dashboard sidebar
        $("#stock-widget").hide()
        $("#news-panel").hide()
        $("#stock-twits-panel").hide()
        $("#news-buttons").hide()
        $("#MainChart").hide()

        $("#dashboard-button").removeClass("profile-button-active")
        $(this).addClass("profile-button-active")
    })

    $(".stock-selector-button").click(function () {
        $("#stock-button").click()
    })

    $("#stock-widget").draggable()
})  