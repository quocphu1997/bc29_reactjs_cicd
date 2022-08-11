// import axios from "axios";
import { request } from "../configs/axios";

const fetchMovieListApi = () => {
  // request
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`,
    method: "GET",
  });
};
const fetchMovieDetailApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};
export { fetchMovieListApi, fetchMovieDetailApi };
