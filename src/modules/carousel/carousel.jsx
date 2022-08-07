import React from "react";
import { Carousel as CarouselAntd } from "antd";

const contentStyle = {
  width:"100%",
  height: "700px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Carousel() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <CarouselAntd afterChange={onChange}>
      <div>
        <img style={contentStyle} src="https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2017/07/26020212/poster-phim-hanh-dong.jpg" alt="" />
      </div>
      <div>
        <img style={contentStyle} src="https://statics.vincom.com.vn/xu-huong/chi_tiet_xu_huong/phim/chia-khoa-tram-ty-phim-viet-nam-chieu-rap-moi.jpg" alt="" />
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </CarouselAntd>
  );
}
