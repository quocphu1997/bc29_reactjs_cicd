import React, { useState } from "react";
import { LoaiGhe } from "../../enums/common";
import "./index.scss";

export default function Chair(props) {
  const [isSelected, setIsSelected] = useState(false);
  const populateClass = () => {
    let defaultClass = "ghe";

    if (isSelected) {
      defaultClass += " dangDat";
    }

    if (props.item.loaiGhe === LoaiGhe.Vip) {
      defaultClass += " gheVip";
    }

    if (props.item.daDat) {
      defaultClass += " daDat";
    }
    return defaultClass;
  };
  return (
    <button
      disabled={props.item.daDat}
      onClick={() => {
        setIsSelected(!isSelected);
        props.handleSelect(props.item);
      }}
      key={props.item.tenGhe}
      className={populateClass()}
    >
      {props.item.tenGhe}
    </button>
  );
}
