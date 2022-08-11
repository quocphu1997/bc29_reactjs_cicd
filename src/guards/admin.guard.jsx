import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { MaLoaiNguoiDung } from "../enums/common";

export default function AdminGuard() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  // console.log(userState.userInfo.maLoaiNguoiDung);

  useEffect(() => {
    if (!userState.userInfo) {
      return navigate("/login");
    }
    if (
      userState.userInfo &&
      userState.userInfo.maLoaiNguoiDung !== MaLoaiNguoiDung.Quantri
    ) {
      notification.warning({
        message: "Khách hàng không thể vào trang admin",
      });
      return navigate("/");
    }
  }, [userState]);

  return <Outlet />;
}
