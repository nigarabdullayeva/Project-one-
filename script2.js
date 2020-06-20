var queryURL = "https://www.googleapis.com/youtube/v3/playlists" + "key=" + apiKey

apiKey = "AIzaSyCwTQ5femqWfTJs-WH8WSRY4DT56Eydb9Y"

$("input").val()

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  }


  var list = $("<div>" + snippet.title() + "</div>")
//   takes input and searches api
// creates a list of the video titles with links to the videos