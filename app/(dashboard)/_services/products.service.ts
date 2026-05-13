export async function getAllProducts(token?: string) {

    const res = await fetch("http:///products", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await res.json();
}