// import axios from "axios";
import { GROUP_ID } from "constants/common";
import { request } from "../configs/axios";

const fetchMovieListApi = () => {
  // request
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
    method: "GET",
  });
};
const fetchMovieDetailApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};

const addMovieUploadImageApi = (data) => {
  return request({
    url: `/QuanLyPhim/ThemPhimUploadHinh`,
    method: "POST",
    data: data,
  });
};

const updateMovieUploadImageApi = (data) => {
  return request({
    url: `/QuanLyPhim/CapNhatPhimUpload`,
    method: "POST",
    data: data,
  });
};

const deleteMovieApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/XoaPhim?MaPhim=${movieId}`,
    method: "DELETE",
  });
};
export {
  fetchMovieListApi,
  fetchMovieDetailApi,
  addMovieUploadImageApi,
  updateMovieUploadImageApi,
  deleteMovieApi,
};
