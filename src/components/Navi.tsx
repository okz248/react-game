import type { FC } from "react";

type PageType = "title" | "game";

type Props = {
    page?: PageType;
    save?: boolean;
    startButton?: () => void;
    continueButton?: () => void;
    nextButton?: () => void;
    backButton?: () => void;
    saveButton?: () => void;
  };

export const Navi: FC<Props> = (props) => {
    const {page, save, startButton, continueButton, nextButton, backButton, saveButton} = props;
  //ゲーム画面表示
  if(page === "title"){
    return (
      <>
        <button onClick={startButton}>はじめから</button>
        {
          save && (
            <button onClick={continueButton}>つづきから</button>
          )
        }
      </>
    );
  }
  return (
    <>
        <button onClick={nextButton}>次へ</button>
        <button onClick={backButton}>戻る</button>
        <button onClick={saveButton}>セーブ</button>
    </>
  );
};