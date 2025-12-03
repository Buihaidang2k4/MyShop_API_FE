import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  Divider,
} from "@mui/material";

export default function OrderPage() {
  const [orderItems] = useState([
    { id: 1, name: "Sản phẩm A", price: 200000, quantity: 1 },
    { id: 2, name: "Sản phẩm B", price: 150000, quantity: 2 },
  ]);

  const [shippingFee] = useState(30000);
  const [address, setAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = discountCode === "SALE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shippingFee - discount;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trang đặt hàng
      </Typography>

      {/* Order Items */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Danh sách sản phẩm</Typography>
        <List>
          {orderItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.name} (x${item.quantity})`}
                secondary={`Giá: ${item.price.toLocaleString()}đ`}
              />
            </ListItem>
          ))}
        </List>
        <Typography>Phí ship: {shippingFee.toLocaleString()}đ</Typography>
      </Paper>

      {/* Address */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Địa chỉ nhận hàng</Typography>
        <TextField
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ..."
          sx={{ mt: 1 }}
        />
      </Paper>

      {/* Discount Code */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Mã giảm giá</Typography>
        <TextField
          fullWidth
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Nhập mã giảm giá..."
          sx={{ mt: 1 }}
        />
      </Paper>

      {/* Payment Method */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Phương thức thanh toán</Typography>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="cash" control={<Radio />} label="Tiền mặt" />
          <FormControlLabel value="bank" control={<Radio />} label="Chuyển khoản" />
        </RadioGroup>
      </Paper>

      {/* Summary */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Tóm tắt đơn hàng</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography>Tạm tính: {subtotal.toLocaleString()}đ</Typography>
        <Typography>Giảm giá: {discount.toLocaleString()}đ</Typography>
        <Typography>Phí ship: {shippingFee.toLocaleString()}đ</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Tổng cộng: {total.toLocaleString()}đ
        </Typography>
      </Paper>

      <Button variant="contained" color="primary" fullWidth>
        Đặt hàng
      </Button>
    </Container>
  );
}
