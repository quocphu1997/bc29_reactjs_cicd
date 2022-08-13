import "moment/locale/vi";
import { Space, Table, Tag, Button, notification } from "antd";
import { useAsync } from "hooks/useAsync";
import React, { useEffect } from "react";
import { deleteMovieApi, fetchMovieListApi } from "services/movie";
import { formatDate } from "utils/common";
import { useNavigate, useParams } from "react-router-dom";

export default function MovieTable() {
  const navigate = useNavigate();

  const { state: data = [] } = useAsync({
    service: () => fetchMovieListApi(),
    // dependancies: data,
  });

  const columns = [
    {
      title: "Tên phim ",
      dataIndex: "tenPhim",
      key: "tenPhim",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (text, record) => {
        return <span>{formatDate(text)}</span>;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <button
              onClick={() =>
                navigate(`/admin/movie-managerment/${record.maPhim}/update`)
              }
              className="btn btn-info"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteMovieApi(record.maPhim);
                notification.success({
                  description: "Delete Movie Success",
                });
                setInterval(() => {
                  navigate(0);
                }, 500);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </Space>
        );
      },
    },
  ];

  const App = () => (
    <Table rowKey="maPhim" columns={columns} dataSource={data} />
  );
  return (
    <>
      <div className="text-right mb-3">
        <Button
          onClick={() => navigate("/admin/movie-managerment/create-movie")}
          type="primary"
        >
          CREATE
        </Button>
      </div>
      {App()}
    </>
  );
}
