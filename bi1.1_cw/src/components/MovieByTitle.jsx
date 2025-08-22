import useFetch from '../useFetch';

const MovieByTitle = ({title}) => {

    const {data, loading, error} = useFetch(`http://localhost:3000/movies?title=${title}`, []);
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>Movie Details</h1>
            {data.length > 0 ? (
                <ul>    
                    {data.map((movie) => (
                        <li key={movie.id}>
                            <h2>{movie.title}</h2>
                            </li>
                    ))}
                </ul>
            ) : (
                <div>No movie found with the title "{title}"</div>
            )}
        </div>
    );
}

export default MovieByTitle;