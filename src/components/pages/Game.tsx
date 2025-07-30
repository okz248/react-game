import { useEffect, useState } from "react";
import { Image } from "../Image";
import { Message } from "../Message";
import { Navi } from "../Navi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { NameType } from "../../store";

// API（CMS）
const apiCmsUrl = import.meta.env.VITE_CMS_API_URL ?? "";
const apiCmsKey = import.meta.env.VITE_CMS_API_KEY ?? "";

//表示テキストリスト
const txtlist = [
    "「ここにセリフが表示されます。」", 
    "「2ページ目です」", 
    "「3ページ目です」", 
    "「4ページ目です」", 
    "「5ページ目です」", 
    "「6ページ目です」"
  ];
//画像リスト
const imglist = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwQ0Rt_D5XNRWZ9ml1fe39qosoTwotUwGotjtghs17btdS-iHGkU_2-05n56v3XRZoNfQ-FO7zNUNRDxdTkFvJhqvhlHwoaUyjrCyzEiOFPJ568w3PFs31k_z89fQ0eNppyrb93-26KTf1/s400/otaku_girl_fashion.png", 
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhrf9En3MJtd5ZzEa1Ky0jrp9rxFSTlwU30lzOToxwyVnSd7mprvlkTfhHuDDXFJfcAfF6o7oLbdQ_HL1OkA7n7M_rAVJTHOwg6pc-LO_QwoVEnqT1W3Lhk-KpbE62dvm_yvmu4qgDnass/s400/character_girl_normal.png", 
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKm1v1NZfQDYxjXhOJZxdGMzff1-pRVIojAUTzdapA4FySgjo0mcLaLhJ4fL1Q5BQmgp2_KDhbkx11TaNY3ijlMPkTbXnoWqfO6EzJzL6xnsuv8xYLXCe1NjUGccOIBO53FxX_HXXOkCM/s400/character_boy_normal.png", 
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicsNz4LlhjifPxVYeISh950p2y6_b1au73MPdpCyCq4GCNWl7br_fWbK1U1PlzkZDegkSwQjchr7lQ7Sj8MsGxlzG006V-3hF4p_yFvqWgeBWudWRT1b3okL7yFgksU-5OCSz5G40HmA1C/s400/book_yomu_mushimegane.png", 
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhU91omJhkrJHCMw0SnS_1heTTQFDxcc1CjU9R5t9G2ikvHaNLO3UcH3BjarlsB2uQgFNwINxKKGuTDGoJvgmUEBD-qK5msqJFhYWKDSwM3HAadmE_KqtAxa58Mm73zQFqSbSqNa-j92ck/s400/shinpai_ojiisan.png", 
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiljmxhlIubmxVqsfpcm_vD70vLWHarnZuAeZ3J8znAcYAN6arMIMiUkpALqXoXM4nXEy1v1Ja7WF0PhYXB3SYUC69PXZW2ZbTQL8cqxleAZTHx4ExflWfhwRdl0tPwbHbtk2Ds68UjQCM/s400/hige_chobihige.png"
];

export const Game = () => {
    const [pageNum, setPageNum] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [button, setButton] = useState({
        start_button: "",
        continue_button: "",
        enter_button: "",
        next_button: "",
        back_button: "",
        save_button: ""
    });
    const storeName = useSelector((state: NameType) => state.name);
    const storeGender = useSelector((state: NameType) => state.gender);
    const [userName, setUserName] = useState("");
    const [gender, setGender] = useState("");

    //初期設定
    useEffect(() => {
        console.log("location.state:", location.state);
        if(!location.state || location.state?.fromTitle !== true){
            //ボタンからでなければタイトルへ遷移
            navigate("/title", {replace:true});
            return;
        }
        
        if(location.state?.fromButton === "set"){
            //決定を押したら1ページ目を設定
            setPageNum(0);
            setUserName(storeName);
            setGender(storeGender);
            console.log(storeGender);
        }else{
            //つづきからを押したら保存ページを設定
            const cookies = document.cookie.split(";");
            for(let cookie of cookies){
                const [rawKey, rawValue] = cookie.split("=");
                //空白除去
                const key = rawKey.trim();
                //null|undefined対策
                const value = rawValue?.trim();
                if (key === "page"){
                    setPageNum(parseInt(value));
                }else if(key === "userName"){
                    setUserName(value);
                }else if(key === "gender"){
                    setGender(value);
                    console.log(value);
                }
            }
        }
    },[location.state, navigate]);

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
            console.log(res)
            setButton(res)
        })
        .catch(() => {
            alert();
        });
    },[]);

    //cookieを保存する
    const saveButton = () => {
        document.cookie = "page=" + pageNum;
        document.cookie = "userName=" + userName;
        document.cookie = "gender=" + gender;
    };

    //「次へ」ボタン押下でページ番号更新
    const nextButton = () => {
        if(pageNum < txtlist.length-1){
            setPageNum(pageNum + 1);
        }
    }

    //「戻る」ボタン押下でページ番号更新
    const backButton = () => {
        if(pageNum > 0){
            setPageNum(pageNum - 1);
        }
    }

    //ゲーム画面表示
    return (
        <div>
            <Image pageNum={pageNum} imglist={imglist} />
            {/* <!-- キャラクター名 --> */}
            <div>{userName}</div>
            {/* <!-- セリフ --> */}
            <Message pageNum={pageNum} txtlist={txtlist} />
            <Navi button={button} nextButton={nextButton} backButton={backButton} saveButton={saveButton}/>
        </div>
    );
};