const movies = [
    {
        name: 'Movie 1',
        type: 'horror',
        id: 1,
    },
    {
        name: 'Movie 2',
        type: 'comedy',
        id: 2,
    },
    {
        name: 'Movie 3',
        type: 'triller',
        id: 3,
    },
    {
        name: 'Movie 4',
        type: 'comedy',
        id: 4,
    }
]

const getAllMovie = () => {
    return movies;
}

const getMovieById = (id) => {
    const findById = movies.find((item) => item.id == id);
    return findById
}

const deleteMovieById = (id) => {
    const index = movies.findIndex((item) => item.id === +id);
    movies.splice(index, 1);
    return movies;
}

const addMovie = (data) => {
    movies.push(data);
    return movies;
}

module.exports = {
    getAllMovie,
    getMovieById,
    deleteMovieById,
    addMovie
}