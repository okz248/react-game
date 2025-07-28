import { useLocation, useNavigate } from "react-router-dom";
import { Navi } from "../Navi";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { action } from "../../actions/Action";

// API（CMS）
const apiCmsUrl = import.meta.env.VITE_CMS_API_URL ?? "";
const apiCmsKey = import.meta.env.VITE_CMS_API_KEY ?? "";

const Setting = () => {
    const page = "setting";
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
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
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

    const onChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

    //「enterButton」ボタン押下でgame1ページに遷移
    const enterButton = () => {
        dispatch(action());
        navigate('/game', {state: {fromTitle: true, fromButton: "set"}});
    };

    return(
        <div>
            <form onSubmit={enterButton}>
                <input type="text" placeholder="名前を入力してください" onChange={onChange} /><br/>
                <label><input type="radio" name="gender" onChange={onChange} />男性</label>
                <label><input type="radio" name="gender" onChange={onChange} />女性</label><br/>
                <Navi button={button} page={page} enterButton={enterButton} />
            </form>
        </div>
    );
};

export default connect()(Setting)