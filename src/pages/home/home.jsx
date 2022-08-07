import React from "react";
import Carousel from "../../modules/carousel/carousel";
import MoveList from "../../modules/move-list/move-list";

export default function Home() {
  return (
    <div className="py-5">
      <Carousel/>
      <MoveList />
    </div>
  );
}
