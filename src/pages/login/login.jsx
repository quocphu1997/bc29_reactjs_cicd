import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/user.action";
import { USER_INFO_KEY } from "../../constants/common.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginAPI(state);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(result.data.content)); // lưu localStorage
    dispatch(setUserInfoAction(result.data.content));
    navigate("/");
    console.log(result);
  };


  return (
    <form className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
      <div className="formgroup">
        <label>Tài Khoản</label>
        <input
          name="taiKhoan"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
      </div>
      <div className="formgroup my-3">
        <label>Mật Khẩu</label>
        <input
          name="matKhau"
          onChange={handleChange}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-success w-100 my-3">Login</button>
    </form>
  );
}
