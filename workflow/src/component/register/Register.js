import React, {useState} from 'react';
import Service from "../service/Service.js";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

const Register = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const register = () => {
        let data = new FormData();
        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        data.append('name', name);
        data.append('username', username);
        data.append('password', password);


        Service.register(data).then((response) => {
            toast.success("Đăng Ký Thành Công !")
            console.log(response)
            setIsLoggedIn(true);
            navigate('/login');
        }).catch((error) => {
            console.log(error)
            toast.error("Đăng Ký Thất Bại. Hãy Thử Lại !")
        })
    }

    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên không được chứa ký tự đặc biệt')
            .min(6, "Tên người dùng có ít nhất 6 ký tự!")
            .required("Tên người dùng không được để trống"),
        username: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
            .min(6, "Tên tài khoản có ít nhất 6 ký tự!")
            .required("Tên tài khoản không được để trống"),
        password: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'MK không được chứa ký tự đặc biệt')
            .min(6, "Mật khẩu có ít nhất 6 ký tự!")
            .max(32, "Mật khẩu không dài quá 32 ký tự!")
            .required("Mật khẩu không được để trống"),
        cpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải giống với mật khẩu')
            .matches(/^[a-zA-Z0-9]*$/, 'MK không được chứa ký tự đặc biệt')
            .min(6, "Mật khẩu có ít nhất 6 ký tự!")
            .max(32, "Mật khẩu không dài quá 32 ký tự!")
            .required("Mật khẩu không được để trống")
    });

    return (
        <div>
            <div className="container d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                <div className="d-flex flex-column justify-content-between">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-xl-5 col-md-10 ">
                            <div className="card card-default mb-0">
                                <div className="card-header pb-0">
                                    <div className="app-brand w-100 d-flex justify-content-center border-bottom-0">
                                        <a className="w-auto pl-0" href="/index.html">
                                            <img src="./images/logo.png" alt="Mono"/>
                                            <span className="brand-name text-dark">HELLO</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body px-5 pb-5 pt-0">
                                    <h4 className="text-dark text-center mb-5">Sign Up</h4>
                                    <Formik initialValues={{
                                        name: '',
                                        username: '',
                                        password: '',
                                        cpassword: ''
                                    }}
                                            validationSchema={validateSchema}
                                            onSubmit={(values) => {
                                                register();
                                        console.log(values);
                                    }}>
                                        <Form>
                                            <div className="row">
                                                <div className="form-group col-md-12 ">
                                                    <Field type="text" className="form-control input-lg" id="name"
                                                           name={'name'}  required="required"
                                                           placeholder="Name"/>
                                                    <ErrorMessage name="name"  component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-md-12 ">
                                                    <Field type="text" className="form-control input-lg" id="username"
                                                           name={'username'} placeholder="Username"/>
                                                    <ErrorMessage name="username"  component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-md-12 ">
                                                    <Field type="password" className="form-control input-lg"
                                                           id="password" name={'password'} placeholder="Password"/>
                                                    <ErrorMessage name="password"  component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-md-12 ">
                                                    <Field type="password" className="form-control input-lg"
                                                           id="cpassword" name={'cpassword'}
                                                           placeholder="Confirm Password"/>
                                                    <ErrorMessage name="cpassword"  component="div" className="text-danger" />
                                                </div>
                                                <div className="col-md-12">

                                                    <button type="submit" className="btn btn-primary btn-pill mb-4"
                                                            style={{marginLeft: '37%'}}
                                                            >Sign Up
                                                    </button>

                                                    <p>Already have an account?
                                                        <Link to={"/login"}>
                                                            <a className="text-blue">Sign in</a>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;