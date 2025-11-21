import React, { useEffect, useState } from 'react'
import userService from '@/services/userService'
export default function useUserInfor() {
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
         userService.getMyInfo()
            .then(res => {
                setUserInfo(res.data.data || []);
                console.log(res.data.data)
                setError(null);
            })
            .catch((err) => {
                console.error("Error get all products: ", err)
                setError(err);
            }
            )
            .finally(
                () => setLoading(false)
            )
    }, [])

    

    return { userInfo, loading, error }
}
