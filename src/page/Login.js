import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function Login () {
    const navigate = useNavigate();
    const Login =(value) =>{
        axios.post(`http://localhost:8080/login`,value).then((res)=>{
            if (res.data) {
                toast.success('Đăng nhập thành công', {
                    autoClose: 700
                });
                navigate("/home");
            }
        }).catch(() => {
                toast.error('Đăng nhập không thành công', {
                    autoClose: 700
                });
                navigate("/login");
        })
    }

    return (
        <>
            <Formik initialValues={{
                    email: "",
                    password: ""
            }} enableReinitialize = {true} onSubmit={(value) => {
                Login(value);
            }}>
                <Form>
                    <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
                    <Field name="email" type="text" placeholder="Email đăng nhập"/>
                    <Field name="password" type="password" placeholder="Nhập mật khẩu"/>
                    <button type="submit">Đăng nhập</button>
                </Form>
            </Formik>
        </>
    )
}

