import { useEffect, useState } from "react";
import { Navi } from "../Navi";
import { useNavigate } from "react-router-dom";

export const Title = () => {
    const page = "title";
    const [save, setSave] = useState(false);
    const navigate = useNavigate();
    const [img, setImg] = useState(undefined);
    const [title, setTitle] = useState("");
    const [button, setButton] = useState({
        start_button: "",
        continue_button: "",
        next_button: "",
        back_button: "",
        save_button: ""
    });

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
        //APIを使って画像を取得、表示する
        fetch('https://ramen-api.dev/shops/yoshimuraya')
        .then(response => response.json())
        .then(data => {
            setImg(data.shop.photos[0].url);
        })
        .catch(error => {
            console.error('リクエストエラー:', error);
        });
    },[]);

    //CMSをAPIを使って連携し、ボタンの名前を設定する
    useEffect(() => {
        fetch('https://rs202507.microcms.io/api/v1/get_content',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': `a7AcOGonywnBhzehhS2gQCbxoZDE4fnNWZ5F`
                },
        }
        )
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            setButton(res);
            setTitle(res.title_GameTitle);
        })
        .catch(() => {
            alert();
        });
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
                    <ul><li>{title}</li></ul>
                    {
                        img && (
                            <img src={img} width={200} height={150}/>
                        )
                    }
                    <ul>
                        <a href="https://www.irasutoya.com/">素材：いらすとや</a>
                    </ul>
                </div>
                <div>
                    <Navi button={button} page={page} save={save} startButton={startButton} continueButton={continueButton} />
                </div>
            </>
        );
    };
};