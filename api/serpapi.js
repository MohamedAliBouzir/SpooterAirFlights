export default async function handler(request, response) {
    const { query } = request;
    const queryString = new URLSearchParams(query).toString();
    const url = `https://serpapi.com/search.json?${queryString}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch data' });
    }
}
