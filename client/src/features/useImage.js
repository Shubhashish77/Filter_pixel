import { useQuery } from "@tanstack/react-query";
import { images } from "../services/apiGdrive";

export function useImage() {
    const { isLoading, data: imageList } = useQuery({ queryKey: ['images'], queryFn: images })

    return {
        isLoading, imageList
    }
};