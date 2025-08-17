const API_KEY = '7f77c480d843ac2882e21edb709545e5'; // Replace with your key


const movieContainer = document.getElementById('movies');

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(movie => {
            fetchTrailer(movie.id).then(trailerKey => {
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <p>${movie.overview}</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
        `;
                movieContainer.appendChild(movieElement);
            });
        });
    })
    .catch(error => console.error('Error:', error));

function fetchTrailer(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            return trailer ? trailer.key : ''; // Returns YouTube trailer key
        })
        .catch(error => console.error('Error fetching trailer:', error));
}
