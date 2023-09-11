var inputElement = document.getElementById("search-input")
var movieWrapper = document.getElementById("movie-cards")
var Status = document.getElementById("status")

function search() {
    movieWrapper.innerHTML = " "
    Status.innerHTML = "Loading..."
    var value = inputElement.value
    console.log(value)
    $.get("https://www.omdbapi.com/?apikey=45f0782a&s=" + value, function (response) {
        Status.innerHTML = ""
        if (inputElement.value == "") {
            alert("Enter movie name!!")
        }
        if (response.Response == "True") {
            var movieData = response
            for (var i = 0; i < movieData.Search.length; i++) {
                var id = movieData.Search[i].imdbID
                $.get("https://www.omdbapi.com/?apikey=8ad164ad&i="+id,function(response){
                    var movieData = response
                    console.log(movieData)
                    movieWrapper.innerHTML +=  `
        <div class="card">
            <img src="${movieData.Poster}" alt="Poster" width="300px" height="300px" />
            <br>
            <div class="movie-decription">
                <span class="movie-title"><b>Title</b> <span>${movieData.Title}</span></span>
                <span class="movie-title"><b>IMDb Rating</b> <span>${movieData.imdbRating}</span></span>
                <span class="movie-title"><b>Director</b> <span>${movieData.Director}</span></span>
                <span class="movie-title"><b>Release Date</b> <span>${movieData.Released}</span></span>
                <span class="movie-title"><b>Genre</b> <span>${movieData.Genre}</span></span>
            </div>
        </div>
    `;
                    })
                }
        } else {
            Status.innerText = "---404 Error Movie Not found---"
        }


    })
}