import { apiRegister } from "@/apis/register/apiRegister";
import { useMutation } from "@tanstack/react-query";


const useMutateRegister = () =>
  useMutation({
    mutationFn: apiRegister
  });

export default useMutateRegister;
