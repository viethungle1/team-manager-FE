import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useState} from "react";
import {Modal} from "antd";
import {IoCloseOutline} from "react-icons/io5";
import {Register} from "./Register";

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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCheck = (isCheck) => {
        setIsModalVisible(isCheck);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div>
                <Formik initialValues={{
                    email: "",
                    password: ""
                }} enableReinitialize={true} onSubmit={(value) => {
                    Login(value);
                }}>
                    <Form>
                        <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
                        <Field name="email" type="text" placeholder="Email đăng nhập"/>
                        <Field name="password" type="password" placeholder="Nhập mật khẩu"/>
                        <button type="submit">Đăng nhập</button>
                    </Form>
                </Formik>
            </div>
            <div>
                <div className="h-[40px] p-2 " onClick={showModal}>
                    <div className="flex-row">
                        <div className="items-center ml-2 text-slate-300 text-f">
                            Đăng ký tài khoản
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Modal width={350} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}
                    closeIcon={<IoCloseOutline size={24} style={{color: 'white'}}/>}>
                    <Register handler={handleCheck}/>
                </Modal>
            </div>
        </>
    )
}

