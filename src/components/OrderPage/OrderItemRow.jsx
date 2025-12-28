import formatCurrency  from "./logic/FormatCurrency";
import imgdefault from "../../assets/image/mylogo.png";

export default function OrderItemRow({ item }) {
    return (
        <div className="flex gap-6 p-5 bg-white border-b">
            <img
                src={imgdefault}
                className="w-24 h-24 object-cover rounded-lg"
                alt=""
            />

            <div className="flex flex-col flex-grow">
                <span className="font-semibold">{item.productName}</span>
                <span className="text-sm text-gray-500">{item.description}</span>

                <div className="flex justify-between mt-2">
                    <span>{formatCurrency(item.unitPrice)}</span>
                    <span>SL: {item.quantity}</span>
                    <span className="font-bold text-red-500">
                        {formatCurrency(item.totalPrice)}
                    </span>
                </div>
            </div>
        </div>
    );
}
