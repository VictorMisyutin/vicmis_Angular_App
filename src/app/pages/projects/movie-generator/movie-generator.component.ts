import { Component } from '@angular/core';
// https://www.omdbapi.com/


@Component({
  selector: 'app-movie-generator',
  templateUrl: './movie-generator.component.html',
  styleUrls: ['./movie-generator.component.css']
})
export class MovieGeneratorComponent {
  queryType: string = 'discoverMovie';
  query: string = '';
  genre: string = '';
  without_genres: string = '';
  releaseDateRange: string = '';
  sortBy: string = 'popularity.desc';
  movies: any[] = [];
  yearRange: number[] = [];
  startYear: number = 2000;
  endYear: number = 2025;

  loading: boolean = false

  movie_title: string = ''
  movie_release_date: string = ''
  movie_actors: string = '';
  movie_awards: string = '';
  movie_boxoffice: string = '';
  movie_director: string = '';
  movie_genres: string = '';
  movie_languages: string = '';
  movie_ratings: any[] = []
  movie_runtime: string = '';
  movie_poster_link: string = '';
  movie_overview: string = '';
  movie_IMDB_votes: string = '';

  constructor() {
    for (let year = 1935; year <= 2025; year += 5) {
      this.yearRange.push(year);
    }
  }

  async handleSubmit(event: Event) {
    this.loading = true
    event.preventDefault();
    
    let url = '';
    if (this.queryType === 'searchMovie') {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(this.query)}&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWZlMTNiMGJiMGI0N2Q3YTI5ZmU0MTEwMTU1NWQ1MiIsIm5iZiI6MTczNzA4NjE5OC4yNTcsInN1YiI6IjY3ODlkNGY2OTNmNzQyY2MyOWFkMDFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrDkQX2XVuVtd9Kk5H4JfVxEYSE1w0-YfjOq2xee5n4`;
    } else if (this.queryType === 'discoverMovie') {
      const startDate = new Date(this.startYear + '');
      const endDate = new Date(this.endYear + '');

      if (startDate >= endDate || (endDate.getTime() - startDate.getTime()) < 13 * 24 * 60 * 60 * 1000) {
        console.error('Invalid date range: The range should be at least 13 days long');
        return;
      }
  
      const randomStartDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime() - 13 * 24 * 60 * 60 * 1000));
      const randomEndDate = new Date(randomStartDate.getTime() + 13 * 24 * 60 * 60 * 1000);
      const startDateFormatted = randomStartDate.toISOString().split('T')[0];
      const endDateFormatted = randomEndDate.toISOString().split('T')[0];
      url = `https://api.themoviedb.org/3/discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWZlMTNiMGJiMGI0N2Q3YTI5ZmU0MTEwMTU1NWQ1MiIsIm5iZiI6MTczNzA4NjE5OC4yNTcsInN1YiI6IjY3ODlkNGY2OTNmNzQyY2MyOWFkMDFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrDkQX2XVuVtd9Kk5H4JfVxEYSE1w0-YfjOq2xee5n4&language=en-US&sort_by=${this.sortBy}&include_adult=true&page=1&primary_release_date.gte=${startDateFormatted}&primary_release_date.lte=${endDateFormatted}&with_genres=${this.genre}&without_genres=${this.without_genres}`;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWZlMTNiMGJiMGI0N2Q3YTI5ZmU0MTEwMTU1NWQ1MiIsIm5iZiI6MTczNzA4NjE5OC4yNTcsInN1YiI6IjY3ODlkNGY2OTNmNzQyY2MyOWFkMDFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrDkQX2XVuVtd9Kk5H4JfVxEYSE1w0-YfjOq2xee5n4'

      }
    };
  
    try {
      const response = await fetch(url, options);
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        this.movies = [data.results[randomIndex]];  
        const movie = this.movies[0]; 
        this.movie_title = movie.title;
        this.movie_release_date = movie.release_date
        this.fetchMovieDetails(event)
      } else {
        this.movies = [];
      }
    } catch (error: any) {
      console.error('Error fetching movies:', error.message);
    }
  }

  async fetchMovieDetails(event: Event) {
    const omdbUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=62e52fe6&t=${this.movie_title}&y=${this.movie_release_date}`;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
  
    const fetchWithTimeout = (url: string, timeout: number) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout)),
      ]);
    };
  
    try {
      const response: any = await fetchWithTimeout(omdbUrl, 1000); // 1-second timeout
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      this.movie_release_date = data.Released;
      this.movie_actors = data.Actors;
      this.movie_awards = data.Awards;
      this.movie_boxoffice = data.BoxOffice;
      this.movie_director = data.Director;
      this.movie_genres = data.Genre;
      this.movie_languages = data.Language;
      this.movie_ratings = data.Ratings;
      this.movie_runtime = data.Runtime;
      this.movie_poster_link = data.Poster;
      this.movie_overview = data.Plot;
      this.movie_IMDB_votes = data.imdbVotes;
      console.log(data)
    } catch (error: any) {
      if (error.message === 'Timeout') {
        console.warn('FetchMovieDetails timed out. Retrying...');
      } else {
        console.error('Error fetching movie details:', error.message);
      }
      this.handleSubmit(event)
      return
    }
    this.loading = false;

  }
}
