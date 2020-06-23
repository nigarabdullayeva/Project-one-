// Shannon S.
// Scroll down for Michael's portion

$("button").on("click", function (event) {
  event.preventDefault();
  $(".title").text("");
  $("#vid").text("");
  $("#songs").text("");
  var apiKey = "AIzaSyDdGdXoEqADclmem8-3rtqWYNqdFpxvOnQ";

  var input = $(".searcharea").val();

  var playlistIdURL =
    "https://www.googleapis.com/youtube/v3/search?order=viewcount&part=snippet&q=" +
    input +
    "movie%20soundtrack&type=playlist&key=" +
    apiKey;

  $.ajax({
    url: playlistIdURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var playlistId = response.items[0].id.playlistId;
    $(".title").append(response.items[0].snippet.title);

    var vidURL =
      "https://www.googleapis.com/youtube/v3/playlists?part=player&part=contentDetails&id=" +
      playlistId +
      "&key=" +
      apiKey;
    // &part=snippet
    $.ajax({
      url: vidURL,
      method: "GET",
    }).then(function (playlistVid) {
      $("#vid").append(playlistVid.items[0].player.embedHtml);
      var playlistLength = playlistVid.items[0].contentDetails.itemCount;
    });

    var songListURL =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&part=contentDetails&playlistId=" +
      playlistId +
      "&key=" +
      apiKey;

    $.ajax({
      url: songListURL,
      method: "GET",
    }).then(function (playlistResponse) {
      var length = playlistResponse.pageInfo.totalResults;
      for (var i = 0; i < length; i++) {
        $("#songs").append(
          "<li>" + playlistResponse.items[i].snippet.title + "</li>"
        );
      }
      console.log(playlistResponse);
    });
  });

  // Michael Z.
  $("#movie-result").text("");
  $("#movie-pic").text("");
  $(".mainTitle").text("");
  $("#year").text("");
  $("#genre").text("");
  $("#actors").text("");
  $("#rating").text("");
  $("#length").text("");

  var queryURL = "http://www.omdbapi.com/?apikey=777b0d38&t=" + input;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#movie-result").append('<p class = "light"> ' + response.Plot + "</p>");
    var imgUrl = response.Poster;
    var imgPoster = $("<img>");
    imgPoster.attr("src", imgUrl);
    $("#movie-pic").append(imgPoster);
    console.log(response);
    $(".mainTitle").append(response.Title);
    $("#year").append("Year: " + response.Year);
    $("#genre").append("Genre: " + response.Genre);
    $("#actors").append("Actors: " + response.Actors);
    $("#rating").append("Rated: " + response.Rated);
    $("#length").append("Length:" + response.Runtime);
  });
});
