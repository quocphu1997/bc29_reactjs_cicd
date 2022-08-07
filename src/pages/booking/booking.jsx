import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chair from "../../modules/chair/chair";
import { bookingTicketApi, fetchRoomListAPI } from "../../services/booking";

export default function Booking() {
  const navigate = useNavigate();
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [roomList, setRoomList] = useState();
  const params = useParams();
  useEffect(() => {
    fetchRoomList();
  }, []);
  const fetchRoomList = async () => {
    const result = await fetchRoomListAPI(params.maLichChieu);
    setRoomList(result.data.content);
    console.log("booking", result);
  };
  const handleSelect = (selectedChair) => {
    const data = [...danhSachGhe];
    const indx = data.findIndex((ele) => ele.tenGhe === selectedChair.tenGhe);
    if (indx !== -1) {
      data.splice(indx, 1);
    } else {
      data.push(selectedChair);
    }
    setDanhSachGhe(data);
    // console.log(selectedChair);
  };

  const handleBookingTicket = async () => {
    const danhSachVe = danhSachGhe.map((ele) => {
      return {
        maGhe: ele.maGhe,
        giaVe: ele.giaVe,
      };
    });
    console.log(danhSachVe);
    const submitData = {
      maLichChieu: params.maLichChieu,
      danhSachVe: danhSachVe,
    };

    await bookingTicketApi(submitData);

    alert("Đặt vé thành công");
    navigate("/");
  };

  return roomList ? (
    <div className="row w-75 mx-auto my-5">
      <div className="col-8">
        {roomList.danhSachGhe.map((ele, index) => {
          return (
            <React.Fragment key={ele.tenGhe}>
              <Chair handleSelect={handleSelect} item={ele} />
              {/* một hàng tối đa 16 ghế */}
              {(index + 1) % 16 === 0 && <br />}
            </React.Fragment>
          );
        })}
      </div>
      <div className="col-4">
        <img
          className="img-fluid"
          src={roomList.thongTinPhim.hinhAnh}
          alt="image"
        />
        <h4>Tên Phim:{roomList.thongTinPhim.tenPhim}</h4>
        <h5>Mô tả:{roomList.thongTinPhim.moTa}</h5>
        <p>
          Ghế:{" "}
          {danhSachGhe.map((ele) => (
            <span key={ele.tenGhe} className="badge badge-success">
              {ele.tenGhe}
            </span>
          ))}
        </p>
        <p>
          Tổng tiền:{" "}
          {danhSachGhe
            .reduce((pre, curr) => {
              pre += curr.giaVe;
              return pre;
            }, 0)
            .toLocaleString()}
          {/* toLocaleString laf format theo dang tien te */} VNĐ
        </p>
        <button onClick={handleBookingTicket} className="btn btn-info">
          Đặt vé
        </button>
      </div>
    </div>
  ) : (
    "Loading..."
  );
}
