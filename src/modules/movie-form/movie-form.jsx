import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { GROUP_ID } from "constants/common";
import { useAsync } from "hooks/useAsync";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMovieUploadImageApi,
  fetchMovieDetailApi,
  updateMovieUploadImageApi,
} from "services/movie";

export default function MovieForm() {
  const [component, setComponent] = useState("default");
  const [image, setImage] = useState("");
  const [sendfile, setSendfile] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const [form] = Form.useForm();
  const { state: movieDetail } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
    dependancies: [params.movieId],
    condition: !!params.movieId, //ép kiểu true hoặc false
  });

  useEffect(() => {
    if (movieDetail) {
      form.setFieldsValue({
        ...movieDetail,
        ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
      });
      setImage(movieDetail.hinhAnh);
      console.log(movieDetail.hinhAnh);
      console.log(image);
    }
  }, [movieDetail]);

  // console.log(movieDetail);
  const onFormLayoutChange = (event) => {
    setComponent(event.target.value);
    // console.log(component);
  };
  const formData = new FormData();

  const handleSave = async (value) => {
    value.ngayKhoiChieu = value.ngayKhoiChieu.format("DD/MM/YYYY");
    value.maNhom = GROUP_ID;
    console.log(value);
    sendfile && formData.append("File", sendfile, sendfile.name);
    params.movieId && formData.append("Mã phim", params.movieId);
    for (const key in value) {
      formData.append(key, value[key]);
    }
    if (params.movieId) {
      await updateMovieUploadImageApi(formData);
    } else {
      await addMovieUploadImageApi(formData);
    }
    notification.success({
      description: "Successfully",
    });
    navigate("/admin/movie-managerment");
  };
  const hanldeChangeImage = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
      // console.log(image);
      setSendfile(file);
      // console.log(event.target.result);
    };
    // console.log(file);
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="vertical"
      initialValues={{
        tenPhim: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        trailer: "",
        danhGia: "",
        File: "",
      }}
      size={component}
      onFinish={handleSave}
    >
      <Form.Item label="Form Size">
        <Radio.Group defaultValue={component} onChange={onFormLayoutChange}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim" name="tenPhim">
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={hanldeChangeImage} />
      </Form.Item>
      <Image
        src={image}
        alt="pic"
        name="hinhAnh"
        onChange={hanldeChangeImage}
      />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
