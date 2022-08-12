import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { GROUP_ID } from "constants/common";
import React, { useState } from "react";
import { addMovieUploadImageApi } from "services/movie";

export default function MovieForm() {
  const [component, setComponent] = useState("default");
  const [image, setImage] = useState("");
  const [sendfile, setSendfile] = useState();

  const onFormLayoutChange = (event) => {
    setComponent(event.target.value);
    // console.log(component);
  };

  const handleSave = async (value) => {
    value.ngayKhoiChieu = value.ngayKhoiChieu.format("DD/MM/YYYY");
    value.maNhom = GROUP_ID;
    const formData = new FormData();
    // const {
    //   tenPhim,
    //   trailer,
    //   moTa,
    //   dangChieu,
    //   sapChieu,
    //   ngayKhoiChieu,
    //   danhGia,
    //   hot,
    // } = value;
    // formData.append("Tên phim", tenPhim);
    // formData.append("Tên phim", trailer);
    // formData.append("Mô tả", moTa);
    // formData.append("Ngày khởi chiếu", ngayKhoiChieu);
    // formData.append("Sắp chiếu", sapChieu);
    // formData.append("Đang chiếu", dangChieu);
    // formData.append("Hot", hot);
    // formData.append("Đánh giá", danhGia);

    for (const key in value) {
      formData.append(key, value[key]);
      sendfile && formData.append("File", sendfile, sendfile.name);
    }

    const result = await addMovieUploadImageApi(formData);
    console.log(result);
  };
  const hanldeChangeImage = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
      setSendfile(file);
      // console.log(event.target.result);
    };
    // console.log(file);
  };
  return (
    <Form
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
      <Form.Item label="Hình ảnh" onChange={hanldeChangeImage}>
        <Input type="file" />
      </Form.Item>
      <Image src={image} />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
