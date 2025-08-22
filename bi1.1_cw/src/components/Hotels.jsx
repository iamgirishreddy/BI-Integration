import useFetch from '../useFetch';

const Hotels = () => {
    const {data, loading, error} = useFetch('http://localhost:3000/hotels', []);
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>All Hotels </h1>
            <ul>
                {data?.map((hotel) => (
                    <li key={hotel.id}>
                        <h2>{hotel.name}</h2>
                        </li>
                ))}
            </ul>
        </div>
    );
}
export default Hotels;