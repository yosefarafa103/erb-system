import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../_services/products.service";

export function useAllProducts(token?: string) {
    return useQuery({
        queryKey: ["products", token],
        queryFn: () => getAllProducts(token),
    });
}