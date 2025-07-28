import type { FC } from "react";

type PageType = "title" | "setting" | "game";

type Button = {
  start_button: string;
  continue_button: string;
  enter_button: string;
  next_button: string;
  back_button: string;
  save_button: string;
};

type Props = {
    button: Button;
    page?: PageType;
    save?: boolean;
    startButton?: () => void;
    continueButton?: () => void;
    enterButton?: () => void;
    nextButton?: () => void;
    backButton?: () => void;
    saveButton?: () => void;
  };

export const Navi: FC<Props> = (props) => {
    const {button, page, save, startButton, continueButton, enterButton, nextButton, backButton, saveButton} = props;
  //ゲーム画面表示
  if(page === "title"){
    return (
      <>
        <button onClick={startButton}>{button.start_button}</button>
        {
          save && (
            <button onClick={continueButton}>{button.continue_button}</button>
          )
        }
      </>
    );
  }else if(page === "setting"){
    return(
      <button type="submit" onClick={enterButton}>{button.enter_button}</button>
    );
  }
  return (
    <>
        <button onClick={nextButton}>{button.next_button}</button>
        <button onClick={backButton}>{button.back_button}</button>
        <button onClick={saveButton}>{button.save_button}</button>
    </>
  );
};