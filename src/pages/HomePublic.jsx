import { useState } from "react";
import Banner from "../components/layout/Banner"
import Category from "../components/layout/Category";
import ProductList from "../components/product-list/ProductList";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/utils/ConfirmDialog.jsx";

export default function HomePublic() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);


  const handleLogin = () => {
    setShowDialog(false);
    navigate("/login");
  };
  const handleCloseDialog = () => setShowDialog(false);

  return (
    <>
      <Banner />
      <Category />
      <ProductList />

      {/* Confirm Dialog */}
      {showDialog && (
        <ConfirmDialog
          isOpen={showDialog}
          onClose={handleCloseDialog}
          onConfirm={handleLogin}
          title="Bạn chưa đăng nhập"
          message="Bạn cần đăng nhập để tiếp tục mua hàng. Bạn có muốn đi tới trang đăng nhập không?"
          confirmText="Đăng nhập"
          cancelText="Hủy"
        />
      )}
    </>
  );
}
