import useFetch from '../useFetch';
const Movies = () => {

    const {data,loading,error} = useFetch('http://localhost:3000/movies', []);
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>Movies List</h1>
            <ul>
                {data?.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                       </li>
                       
                        ))}

            </ul>
        </div>
    );
}

export default Movies;