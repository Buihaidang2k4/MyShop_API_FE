import useUserInfor from "@/hooks/user/useUserInfor";

export default function Form_change_password({ onclose }) {
    const { userInfo, setUserInfo, loading } = useUserInfor();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        gender: "",
        birthDate: "",
        mobileNumber: "",
    });

    

    return (
        <div>form_change_password</div>
    )
}
