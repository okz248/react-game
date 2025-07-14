import type { FC } from "react";

type Props = {
    pageNum: number;
    imglist: string[];
  };

export const Image: FC<Props> = (props) => {
    const {pageNum, imglist} = props;
  //ゲーム画面表示
  return (
    <img src={imglist[pageNum]} />
  );
};