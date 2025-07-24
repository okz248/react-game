import { useLocation, useNavigate } from "react-router-dom";
import { Navi } from "../Navi";
import { useEffect, useState } from "react";

// API（CMS）
const apiCmsUrl = import.meta.env.VITE_CMS_API_URL ?? "";
const apiCmsKey = import.meta.env.VITE_CMS_API_KEY ?? "";

export const Setting = () => {
    const page = "setting";
    const navigate = useNavigate();
    const location = useLocation();
    const [button, setButton] = useState({
        start_button: "",
        continue_button: "",
        enter_button: "",
        next_button: "",
        back_button: "",
        save_button: ""
    });

    //初期設定
    useEffect(() => {
        if(!location.state || location.state?.fromTitle !== true){
            //ボタンからでなければタイトルへ遷移
            navigate("/title", {replace:true});
        }
    },[]);

    //CMSをAPIを使って連携し、ボタンの名前を設定する
    useEffect(() => {
        fetch(apiCmsUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-MICROCMS-API-KEY': apiCmsKey
                },
        }
        )
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            setButton(res);
        })
        .catch(() => {
            alert();
        });
    },[]);

    //「enterButton」ボタン押下でgame1ページに遷移
    const enterButton = () => {
        navigate('/game', {state: {fromTitle: true, fromButton: "set"}});
    };

    return(
        <>
            <div>
                <ul><input type="text" placeholder="名前を入力してください" /></ul>
                <label><input type="radio" name="gender" />男性</label>
                <label><input type="radio" name="gender" />女性</label>
            </div>
            <div>
                <Navi button={button} page={page} enterButton={enterButton} />
            </div>
        </>
    );
};