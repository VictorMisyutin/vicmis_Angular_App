import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-generator',
  templateUrl: './movie-generator.component.html',
  styleUrls: ['./movie-generator.component.css']
})
export class MovieGeneratorComponent {
  queryType: string = 'discoverMovie';
  query: string = '';
  genre: string = ''; // This will store the genre ID
  without_genres: string = '';
  releaseDateRange: string = ''; // Date range in the format 'YYYY-MM-DD - YYYY-MM-DD'
  sortBy: string = 'popularity.desc';
  movies: any[] = [];
  yearRange: number[] = [];
  startYear: number = 0;
  endYear: number = 0;

  movie_title: string = ''
  movie_overview: string = ''
  movie_image_path: string = ''
  movie_original_language: string = ''
  movie_release_date: string = ''

  constructor() {
    // Populate the year range from 1930 to 2000 in 5-year increments
    for (let year = 1935; year <= 2025; year += 5) {
      this.yearRange.push(year);
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
  
    let url = '';
    if (this.queryType === 'searchMovie') {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(this.query)}&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWZlMTNiMGJiMGI0N2Q3YTI5ZmU0MTEwMTU1NWQ1MiIsIm5iZiI6MTczNzA4NjE5OC4yNTcsInN1YiI6IjY3ODlkNGY2OTNmNzQyY2MyOWFkMDFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrDkQX2XVuVtd9Kk5H4JfVxEYSE1w0-YfjOq2xee5n4`;
    } else if (this.queryType === 'discoverMovie') {
      const releaseDateRange = this.releaseDateRange.split('-').map(item => item.trim());
  
      const startDate = new Date(this.startYear);
      const endDate = new Date(this.endYear);
  
      // Validate the date range
      if (startDate >= endDate || (endDate.getTime() - startDate.getTime()) < 13 * 24 * 60 * 60 * 1000) {
        console.error('Invalid date range: The range should be at least 13 days long');
        return;
      }
  
      // Generate random date range within the valid period
      const randomStartDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime() - 13 * 24 * 60 * 60 * 1000));
      const randomEndDate = new Date(randomStartDate.getTime() + 13 * 24 * 60 * 60 * 1000);
      const startDateFormatted = randomStartDate.toISOString().split('T')[0];
      const endDateFormatted = randomEndDate.toISOString().split('T')[0];
  
      // Prepare parameters for the API request
      const params = new URLSearchParams({
        with_genres: this.genre || '', // Set the genre ID here
        primary_release_date_gte: startDateFormatted,
        primary_release_date_lte: endDateFormatted,
        sort_by: this.sortBy,
        page: '1', // Fetch movies from page 1
        api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWZlMTNiMGJiMGI0N2Q3YTI5ZmU0MTEwMTU1NWQ1MiIsIm5iZiI6MTczNzA4NjE5OC4yNTcsInN1YiI6IjY3ODlkNGY2OTNmNzQyY2MyOWFkMDFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrDkQX2XVuVtd9Kk5H4JfVxEYSE1w0-YfjOq2xee5n4', // Use your actual API key here
      });
  
      url = `https://api.themoviedb.org/3/discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWZlMTNiMGJiMGI0N2Q3YTI5ZmU0MTEwMTU1NWQ1MiIsIm5iZiI6MTczNzA4NjE5OC4yNTcsInN1YiI6IjY3ODlkNGY2OTNmNzQyY2MyOWFkMDFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OrDkQX2XVuVtd9Kk5H4JfVxEYSE1w0-YfjOq2xee5n4&language=en-US&sort_by=${this.sortBy}&include_adult=true&page=1&primary_release_date.gte=${startDateFormatted}&primary_release_date.lte=${endDateFormatted}&with_genres=${this.genre}&without_genres=${this.without_genres}`;
      // https://image.tmdb.org/t/p/w500/dWfpvRi0xEWxup6B3lha5HzGAc9.jpg
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
        this.movies = [data.results[randomIndex]]; // Show a random movie
    
        const movie = this.movies[0]; 
        this.movie_title = movie.title;
        this.movie_overview = movie.overview;
        this.movie_original_language= movie.original_language
        this.movie_release_date= movie.release_date

        this.movie_image_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        // console.log(movie)
      } else {
        this.movies = [];
      }
    } catch (error: any) {
      console.error('Error fetching movies:', error.message);
    }
  }
}
