import useFetch from '../useFetch';

const BooksbyTitle = ({title}) => {

    const {data, loading, error} = useFetch(`http://localhost:3000/books?title=${title}`, []);
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            {/* <h1>Book Details</h1> */}
            {data.length > 0 ? (
                <ul>
                    {data.map((book) => (
                        <li key={book.id}>
                            <h1>{book.title}</h1>
                            <p>{book.author}</p>
                            <p>{book.year}</p>

                        </li>
                    ))}
                </ul>
            ) : (
                <div>No book found with the title "{title}"</div>
            )}
        </div>
    );
}   

export default BooksbyTitle;