import React from 'react';
import MovieCards from "../components/MovieCards/MovieCards";
import axios from "axios";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {Spinner} from 'react-bootstrap';
import Store from "../stores";

const API_KEY = "ac24c5f255eb805f019fbfdd3539c068";

class TopRatedMovies extends React.Component {
    state = {
        movies: {},
        currentPage: 1,
        totalPages: 0,
        loading: true,
        selectedMovies: {}
    };

    componentDidMount() {
        //this.DownloadSelectedFilms();
        this.getMovies(this.state.currentPage);
        Store.addFilmsListener(this.DownloadSelectedFilms)
    }

    componentWillUnmount() {
        Store.removeFilmsListener(this.DownloadSelectedFilms)
    }

    DownloadSelectedFilms = () => {
        this.setState({
            selectedMovies: Store.getMovies()
        })
    };
    getMovies = async (pageNumber) => {
        this.setState({
            loading: true
        });
        try {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
            await this.setState({
                    movies: data.results,
                    totalPages: data.total_pages,
                    currentPage: pageNumber,
                    loading: false
                }
            )
        } catch {
            console.log('error')
        }
    };
    updateMoviesAttrs = newMovie => {
        this.setState({
            movies: this.state.movies.map(oldMovie => oldMovie.id === newMovie.id ? newMovie : oldMovie)
        })
    };

    render() {
        console.log(this.state.movies);
        const isLoggedIn = this.state.loading;
        return (
            <div className='Page container-fluid'>
                <div className='Pagination'>
                    <Pagination onChange={this.getMovies} current={this.state.currentPage} className="ant-pagination"
                                defaultCurrent={this.state.currentPage} total={this.state.totalPages * 10}/>
                </div>
                <div className='PageFilm container-fluid'>
                    <h1>Top rated movies</h1>
                    {isLoggedIn ? (
                        <Spinner animation="border" role="status"/>
                    ) : (
                        <MovieCards movies={this.state.movies} updateMoviesAttrs={this.updateMoviesAttrs}/>
                    )}
                </div>

            </div>
        )
    }
}

export default TopRatedMovies