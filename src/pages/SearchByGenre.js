import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {Spinner} from 'react-bootstrap'
import {searchByGenre} from '../actions'
import MovieCard from "../components/MovieCard/MovieCard";

class SearchByGenre extends React.Component {
    state = {
        movies: [],
        currentPage: 1,
        totalPages: 0,
        loading: true
    };

    componentDidMount() {
        this.getMovies(this.state.currentPage)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.genre !== prevProps.match.params.genre) {
            this.getMovies(this.state.currentPage);
        }
    }

    getMovies = async (pageNumber) => {
        this.setState({
            loading: true
        });
        try {
            const data = await searchByGenre(this.props.match.params.genre, pageNumber);
            await this.setState({
                    movies: data.results,
                    totalPages: data.total_pages,
                    currentPage: pageNumber,
                    loading: false
                }
            )
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const isLoggedIn = this.state.loading;
        return (
            <div className='Page container-fluid'>
                <div className='Pagination'>
                    <Pagination onChange={this.getMovies} current={this.state.currentPage} className="ant-pagination"
                                defaultCurrent={this.state.currentPage} total={this.state.totalPages * 10}/>
                </div>
                <div className='PageFilm container-fluid'>
                    <h1>Genre movies</h1>
                    {isLoggedIn ? (
                        <Spinner animation="border" role="status"/>
                    ) : (
                        <div className='row'>
                            {
                                this.state.movies.map((movie) => {
                                    return <div key={movie.id} className='col-md-4'>
                                        <MovieCard movie={movie} updateMoviesAttrs={this.updateMoviesAttrs}/>
                                    </div>
                                })
                            }
                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default SearchByGenre

