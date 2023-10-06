import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Vui lòng nhập tên đăng nhập')
        .min(4, 'Tên đăng nhập phải có ít nhất 6 ký tự')
        .max(15, 'Tên đăng nhập không được quá 15 ký tự'),

    password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(4, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(15, 'Mật khẩu không được quá 15 ký tự'),
});

const Login = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {

        axios.post('http://localhost:8080/login', values)
            .then(function (response) {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                console.log("dang nhap thanh cong");
                navigate("/homeTeam");
            }).catch((error) => {
            console.log(error)
            alert("Sai Username/Password")
        });
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <div className="container d-flex align-items-center justify-content-center"
                     style={{minHeight: 100, paddingTop: 50}}>
                    <div className="d-flex flex-column justify-content-between">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-10">
                                <div className="card card-default mb-0">
                                    <div className="card-header pb-0">
                                        <div className="app-brand w-100 d-flex justify-content-center border-bottom-0">
                                            <a className="w-auto pl-0" href="/index.html">
                                                <img src="images/logo.png" alt="Mono"/>
                                                <span className="brand-name text-dark">MONO</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body px-5 pb-5 pt-0">

                                        <h4 className="text-dark mb-6 text-center">Sign in for free</h4>

                                        <Form action="/index.html">
                                            <div className="row">
                                                <div className="form-group col-md-12 mb-4">
                                                    <ErrorMessage name="username"  component="div" className="text-danger" />
                                                    <Field type="username" className="form-control input-lg"
                                                           id="username"
                                                           name="username"
                                                           aria-describedby="emailHelp"
                                                           placeholder="Username"/>

                                                </div>
                                                <div className="col-md-12"><ErrorMessage name="password"  component="div" className="text-danger"  /></div>
                                                <div className="form-group col-md-12 ">

                                                    <Field type="password" className="form-control input-lg"
                                                           id="password"
                                                           name="password"
                                                           placeholder="Password"/>

                                                </div>
                                                <div className="col-md-12">

                                                    <div className="d-flex justify-content-between mb-3">

                                                        <div className="custom-control custom-checkbox mr-3 mb-3">
                                                            <input type="checkbox" className="custom-control-input"
                                                                   id="customCheck2"/>
                                                            <label className="custom-control-label"
                                                                   htmlFor="customCheck2">Remember me</label>
                                                        </div>

                                                        <a className="text-color" href="#"> Forgot password? </a>

                                                    </div>

                                                    <button type="submit" className="btn btn-primary btn-pill mb-4">
                                                        Sign
                                                        In
                                                    </button>

                                                    <p>Don't have an account yet?
                                                        <Link className="text-blue" to={"/register"}>   Sign Up</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    );
};

export default Login;