import axios from "axios";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function Register() {
    const navigate = useNavigate();
    const [checkUser, setCheckUser] = useState([]);
    const [user] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8080/account').then(response => {
            setCheckUser(checkExistUser(response.data));
        })
    }, []);

    const checkExistUser = (data) => {
        let email = [];
        for (let i = 0; i < data.length; i++) {
            email.push(data[i].email);
        }
        return email;
    }

    const handleButtonClick = (values) => {
        if(values !== null) {
            axios.post('http://localhost:8080/account/create', values)
                .then(() => {
                    toast.success('Đăng kí thành công', {autoClose : 700})
                    navigate('/login')
                })
        }else {
            toast.warning('Vui lòng điền đủ thông tin', {autoClose : 700})
        }
    };
    const onSubmit = (values) => {
        let user = {
            email : values.email ,
            password : values.password,
        }
        handleButtonClick(user) ;
    };

    return (
        <>
            <div>
                <Formik
                    initialValues={{
                        user
                }}
                    validationSchema={
                    require("yup").object().shape({
                        email: require("yup")
                            .string()
                            .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Tên tài khoản không hợp lệ")
                            .required("Vui lòng nhập tên tài khoản").test('unique', 'Tài khoản đã tồn tại', (value) => {
                                return !checkUser.includes(value);
                            }),
                        password: require("yup")
                            .string()
                            .matches(/^[a-zA-Z0-9]{6,8}$/, "Mật khẩu phải chứa 6-8 ký tự")
                            .required("Vui lòng nhập mật khẩu."),
                            })}
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    <Form>
                        <ErrorMessage style={{color: 'red'}} name="email" component="div"/>
                        <div className="wrap-input100 validate-input">
                            <Field type="text" name="email" placeholder="Tên tài khoản"/>
                        </div>
                        <ErrorMessage style={{color: 'red'}} name="password" component="div"/>
                        <div>
                            <Field  type="password" name="password" placeholder="Mật khẩu"/>
                        </div>
                        <div>
                            <button >Đăng ký </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}