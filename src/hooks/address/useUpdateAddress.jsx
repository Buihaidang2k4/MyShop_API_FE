import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import addressService from "@/services/addressService.jsx"
import { notify } from '../../utils/notify';

export default function useUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationKey: ["update-address"],
            mutationFn: addressService.updateAddress(),

            onSuccess: () => {
                queryClient.invalidateQueries(["address"]);
                notify.success("Cập nhật địa chỉ thành công ");
            }
            , onError: (err) => {
                notify.error("Cập nhật địa chỉ không thành công ! ")
                console.error("Cập nhật địa chỉ  lỗi ! ", err)
            }
        }
    )
}
