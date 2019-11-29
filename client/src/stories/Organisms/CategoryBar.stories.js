import React from "react";

import CategoryIcon from "../../components/Organisim/CategoryBar/CategoryIcon"
import TextIcon from "../../components/Organisim/CategoryBar/CategoryIcon/TextIcon";
import ImageIcon from "../../components/Organisim/CategoryBar/CategoryIcon/ImageIcon";

export default {
  title: "Atoms|Category"
};

export const texticon = () => {
  return (
    <div style={{ width: 200, height: 100 }}>
      <TextIcon color="yellow">{"Hello World"}</TextIcon>
    </div>
  );
};

export const imageicon = () => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <ImageIcon
        img={
          "https://post-phinf.pstatic.net/MjAxNzA1MzFfOTAg/MDAxNDk2MjMwNTkyMTI3.TJR2yRakRXPx9UYAcp78nvQCXhAbIzJN-jbqBSWK6AQg.Y82yrzYZa33Z27SxcK5wkx5htM2NJphC6-QzjrEgSLog.PNG/%EC%8B%9C%EA%B3%B5.png?type=w1200"
        }
      />
    </div>
  );
};

export const categoryIcon = () => {
  return (
    <div style={{ width: 50, height: 50 }}>
      <CategoryIcon
        img={
          "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png"
        }
        text="게임"
        active={false}
      />
    </div>
  );
};
