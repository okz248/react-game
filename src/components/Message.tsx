import type { FC } from "react";

type Props = {
    pageNum: number;
    txtlist: string[];
  };

export const Message: FC<Props> = (props) => {
    const {pageNum, txtlist} = props;
  //ゲーム画面表示
  return (
      <div>{txtlist[pageNum]}</div>
  );
};