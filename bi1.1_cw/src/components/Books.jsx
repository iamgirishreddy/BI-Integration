import useFetch from '../useFetch';

const Books = () => {
    const {data, loading, error} = useFetch('http://localhost:3000/books', []);
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>Books List</h1>
            <ul>
                {data?.map((book) => (
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                        </li>
                ))}
            </ul>
        </div>
    );
}
export default Books;
