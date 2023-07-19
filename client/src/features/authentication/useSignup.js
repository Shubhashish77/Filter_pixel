import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({ email, password }) => signupApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            navigate("/home", { replace: true })
            toast.success("Account successfully created")
        },
        onError: err => {
            console.log('ERROR', err);
            toast.error("ERROR!!")
        }
    });
    return { signup, isLoading }
}