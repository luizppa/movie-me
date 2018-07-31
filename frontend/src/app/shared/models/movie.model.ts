export class Movie {

  constructor(public id: number,
              public images: {
                backdrop: string,
                poster: string
              },
              public genres: any[],
              public original_language: string,
              public title: string,
              public original_title: string,
              public overview: string,
              public release_date: string,
              public vote_average: number,
              public type: string,
              public runtime?: number,
              public homepage?: string,
              public collection?: {
                id: number,
                name: string,
                images: {
                  backdrop: string,
                  poster: string
                }
              }
            ){}

  public static basic_constructor(
    id: number,
    images: {
      backdrop: string,
      poster: string
    },
    genres: any[],
    original_language: string,
    title: string,
    original_title: string,
    overview: string,
    release_date: string,
    vote_average: number
  ){
    return new Movie(
      id,
      images,
      genres,
      original_language,
      title,
      original_title,
      overview,
      release_date,
      vote_average,
      'basic'
    )
  }

  public static from_params(movie_data, size){
    let images
    if(movie_data.backdrop_path && movie_data.poster_path){
      images = {
        backdrop: 'http://image.tmdb.org/t/p/'+size+'/'+movie_data.backdrop_path,
        poster: 'http://image.tmdb.org/t/p/'+size+'/'+movie_data.poster_path
      }
    }
    else {
      images = {
        backdrop: null,
        poster: null
      }
    }
    let collection
    if(movie_data.belongs_to_collection){
      collection = {
        id: movie_data.belongs_to_collection.id,
        name: movie_data.belongs_to_collection.name,
        images: {
          backdrop: 'http://image.tmdb.org/t/p/'+size+'/'+movie_data.belongs_to_collection.backdrop_path,
          poster: 'http://image.tmdb.org/t/p/'+size+'/'+movie_data.belongs_to_collection.poster_path
        }
      }
    }
    else collection = null
    let movie: Movie = new Movie(
      movie_data.id,
      images,
      movie_data.genres,
      movie_data.original_language,
      movie_data.title,
      movie_data.original_title,
      movie_data.overview,
      movie_data.release_date,
      movie_data.vote_average,
      'complete',
      movie_data.runtime,
      movie_data.homepage,
      collection
    )
    return movie
  }

  public static from_info(movie_data, size){
    let images
    if(movie_data.backdrop_path && movie_data.poster_path){
      images = {
        backdrop: 'http://image.tmdb.org/t/p/'+size+'/'+movie_data.backdrop_path,
        poster: 'http://image.tmdb.org/t/p/'+size+'/'+movie_data.poster_path
      }
    }
    else {
      images = {
        backdrop: null,
        poster: null
      }
    }
    let movie: Movie = Movie.basic_constructor(
      movie_data.id,
      images,
      movie_data.genres,
      movie_data.original_language,
      movie_data.title,
      movie_data.original_title,
      movie_data.overview,
      movie_data.release_date,
      movie_data.vote_average
    )
    return movie
  }
}
