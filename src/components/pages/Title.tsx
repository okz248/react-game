import { useEffect, useState } from "react";
import { Navi } from "../Navi";
import { useNavigate } from "react-router-dom";

export const Title = () => {
    const [, setPageNum] = useState(0);
    const [page,] = useState("title");
    const [flag, setFlag] = useState(false);
    const [save, setSave] = useState(false);
    const navigate = useNavigate();

    //cookieの存在確認
    //cookieを取得して存在するならsaveをtrueにする
    useEffect(() => {
        const cookies = document.cookie.split("; ");
        for(let cookie of cookies){
            const [key] = cookie.split("=");
            if (key === "page"){
                setSave(true);
            }
        }
    },[]);

    //「はじめから」ボタン押下でgame1ページに遷移
    const startButton = () => {
        navigate('/game', {state: {fromTitle: true, fromButton: "start"}});
    };

    //cookieを取得する
    //「つづきから」ボタン押下で保存したgameページに遷移
    const continueButton = () => {
        navigate('/game', {state: {fromTitle: true, fromButton: "cont"}});
    };
    
    //タイトル画面表示
    if(page === "title"){
        return (
            <>
                <div>
                    <ul><li>ゲームタイトル</li></ul>
                    <ul>
                        <a href="https://www.irasutoya.com/">素材：いらすとや</a>
                    </ul>
                </div>
                <div>
                    <Navi page={page} save={save} startButton={startButton} continueButton={continueButton} />
                </div>
            </>
        );
    };
};