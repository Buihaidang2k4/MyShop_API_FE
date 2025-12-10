import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import addressService from "@/services/addressService";
import axios from "axios";
import { notify } from "../../../utils/notify";
import Loading from "../../../utils/Loading";
import useCreateAddress from "../../../hooks/address/useCreateAddress";
import Error from "../../../utils/Error";
import useUpdateAddress from "@/hooks/address/useUpdateAddress.jsx"

export default function Form_address({ onClose, onSave, addresses = [], mode = "add" }) {
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useUserInfor();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        street: "",
        ward: "",
        district: "",
        province: "",
        postalCode: "",
        additionalInfo: "",
        isDefault: false,
        type: ""
    });


    // Load dữ liệu user vào form
    useEffect(() => {
        if (!user) return;

        const address = user.userProfile.addressResponse;

        setFormData({
            fullName: address.fullName || "",
            phone: address.phone || "",
            street: address.street || "",
            ward: address.ward || "",
            district: address.district || "",
            province: address.province || "",
            postalCode: address.postalCode || "",
            additionalInfo: address.additionalInfo || "",
            isDefault: address.isDefault || false,
            type: address.type || ""
        });
    }, [user]);



    // Handle input change and valid 
    const handleChange = (e) => {
        const { name, value } = e.target;


        if (name === "fullName") {
            const regexFullName = /^[A-Za-zÀ-ỹ\s]*$/;
            if (regexFullName.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === "phone") {
            const regexPhone = /^\d{10}$/;
            if (regexPhone.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    //  Lấy địa chỉ từ api quận huyện , xã, thành phố 
    const [data, setData] = useState([]);
    const [province, setProvince] = useState("");
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            .then(res => setData(res.data));
    }, []);

    const handleProvinceChange = (e) => {
        const selected = data.find(p => p.Name === e.target.value);
        setProvince(selected.Name);
        setDistricts(selected.Districts);
        setWards([]);
        setFormData({ ...formData, province: selected.Name })
    };

    const handleDistrictChange = (e) => {
        const selected = districts.find(d => d.Name === e.target.value);
        setWards(selected.Wards);
        setFormData({ ...formData, district: selected.Name })
    };

    const handleWardChange = (e) => {
        setFormData({ ...formData, ward: e.target.value })
    }

    const handleTypeAddressChange = (e) => {
        setFormData({ ...formData, type: e.target.value })
    }


    //  Set địa chỉ mặc định 
    const TypeAddress = ["HOME", "WORK", "SCHOOL", "OTHER"];
    const { mutate: createAddress, isError: createAddressError, isLoading: createAddressLoading } = useCreateAddress();
    const { mutate: updateAddress, isError: updateAddressError, isLoading: updateAddressLoading } = useUpdateAddress();

    // Click thêm địa chỉ // update 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === "add") {
                const profileId = user?.userProfile?.profileId;
                if (profileId == null) {
                    console.error("profileId null");
                    return;
                }
                createAddress({ profileId, formData });
            } else if (mode == "update") {
                const addressId = addresses?.addressId;
                if (addressId == null) {
                    console.error("addressId null")
                    return;
                }
                updateAddress({ addressId, formData });
            }

            await queryClient.invalidateQueries(["address"]);
            await queryClient.invalidateQueries(["userInfo"]);
            notify.success("Cập nhật địa chỉ thành công")
            onClose();
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            notify.error("Cập nhật địa chỉ thất bại !")
        }
    };

    const handleClickOverLay = (e) => {
        if (e.target.id === "overlay") {
            onClose();
        }
    }


    // Loading
    if (isLoading || !user.userProfile || createAddressLoading || updateAddressLoading) return <Loading />;
    if (createAddressError || updateAddressError) {
        return <Error />;
    }
    return (
        <div
            id="overlay"
            onClick={handleClickOverLay}
            className="absolute inset-0 z-50 flex">
            {/* Nền mờ */}
            <div
                className="inset-0 backdrop-blur-sm bg-opacity-40 transition-opacity duration-500"
                onClick={onClose}
            ></div>

            {/* Sidebar form */}
            <div className="ml-auto w-full max-w-md h-full bg-white  z-50 p-8 overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
                    {mode === "add" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
                </h3>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Họ tên / SĐT */}
                    <div className="flex gap-1">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Họ và tên"
                            onChange={handleChange}
                            value={formData.fullName}
                            required
                            className="flex-1 border border-gray-300 rounded-lg px-[2px] py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Số điện thoại"
                            onChange={handleChange}
                            value={formData.phone}
                            required
                            className="flex-1 border border-gray-300 rounded-lg px-[2px] py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Tỉnh/Thành phố */}
                    <select
                        onChange={handleProvinceChange}
                        value={formData.province}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={""}>Chọn tỉnh/thành phố</option>
                        {data.map((p) => (
                            <option key={p.Id}>{p.Name}</option>
                        ))}
                    </select>

                    {/* Quận/Huyện */}
                    <select
                        onChange={handleDistrictChange}
                        value={formData.district}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={""}>Chọn quận/huyện</option>
                        {districts.map((d) => (
                            <option key={d.Id}>{d.Name}</option>
                        ))}
                    </select>

                    {/* Phường/Xã */}
                    <select
                        onChange={handleWardChange}
                        value={formData.ward}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={""}>Chọn phường/xã</option>
                        {wards.map((w) => (
                            <option key={w.Id}>{w.Name}</option>
                        ))}
                    </select>

                    {/* Số nhà / Đường */}
                    <input
                        type="text"
                        name="street"
                        placeholder="Số nhà / Đường"
                        onChange={handleChange}
                        value={formData.street}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Mã bưu chính */}
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Mã bưu chính (Nếu có)"
                        onChange={handleChange}
                        value={formData.postalCode}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Loại địa chỉ  */}
                    <select
                        onChange={handleTypeAddressChange}
                        value={formData.type}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option>Chọn Loại địa chỉ </option>
                        {TypeAddress.map((t) => (
                            <option key={t}>{t}</option>
                        ))}

                    </select>

                    {/* Thông tin bổ sung */}
                    <textarea
                        name="additionalInfo"
                        placeholder="Thông tin địa chỉ bổ sung"
                        onChange={handleChange}
                        value={formData.additionalInfo}
                        rows={3}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>

                    {/* Đặt làm mặc định */}
                    <div className="py-3">
                        <input type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
                        ></input>
                        <span className="p-2">Đặt địa chỉ làm mặc định</span>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            {mode === "add" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
