export async function getAllProducts(token?: string) {

    const res = await fetch("http://localhost:5000/products", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}