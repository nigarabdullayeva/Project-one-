$("button").on("click", function (event) {
  event.preventDefault();
  $("#titles").text("");
  $("#vid").text("");
  var apiKey = "AIzaSyCwTQ5femqWfTJs-WH8WSRY4DT56Eydb9Y";

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
      "https://www.googleapis.com/youtube/v3/playlists?part=player&part=snippet&part=contentDetails&id=" +
      playlistId +
      "&key=" +
      apiKey;
    // fix limit
    // "maxResults="+
    $.ajax({
      url: vidURL,
      method: "GET",
    }).then(function (playlistVid) {
      $("#vid").append(playlistVid.items[0].player.embedHtml);
      var playlistLength = playlistVid.items[0].contentDetails.itemCount;
    });

    var songListURL =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&&maxResults=25&part=contentDetails&playlistId=" +
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
});
