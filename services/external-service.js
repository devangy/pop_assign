export const fetchExternalData = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
            throw new Error("Failed to fetch external data");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
