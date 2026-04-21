import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../_services/auth.service";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["user", localStorage.getItem("userId")],
        queryFn: getCurrentUser,
    });
}