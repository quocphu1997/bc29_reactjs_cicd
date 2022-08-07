import { request } from "../configs/axios";

const fetchRoomListAPI = (showTimeId) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeId}`,
    method: "GET",
  });
};
const bookingTicketApi = (data) => {
  return request({
    url: "/QuanLyDatVe/DatVe",
    method: "POST",
    data: data,
  });
};
export { fetchRoomListAPI, bookingTicketApi };
