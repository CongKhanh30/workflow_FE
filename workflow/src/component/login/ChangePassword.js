import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Service from '../service/Service';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();

    const changeInput = (event) => {
        const { name, value } = event.target;
        if (name === 'password') {
            setCurrentPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmNewPassword') {
            setConfirmNewPassword(value);
        }
    };

    const editPassword = () => {
        Service.editPassword(currentPassword, newPassword)
            .then(() => {
                toast.success('Thay đổi mật khẩu thành công');
                localStorage.removeItem("token");
                navigate('/login');

            })
            .catch(() => {
                toast.error('Không thể thay đổi mật khẩu');
            });
    };

    const validateSchema = Yup.object().shape({
        password: Yup.string()
            .required('Mật khẩu không được để trống')
            .matches(/^[a-zA-Z0-9]*$/, 'MK không được chứa ký tự đặc biệt'),
        newPassword: Yup.string()
            .required('Mật khẩu không được để trống')
            .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
            .max(32, 'Mật khẩu không dài quá 32 ký tự!')
            .matches(/^[a-zA-Z0-9]*$/, 'MK không được chứa ký tự đặc biệt'),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận phải giống với mật khẩu mới đã nhập')
            .required('Mật khẩu không được để trống')
            .matches(/^[a-zA-Z0-9]*$/, 'MK không được chứa ký tự đặc biệt')
    });

    return (
        <div>
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="d-flex flex-column justify-content-between">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-xl-5 col-md-10 ">
                            <div className="card card-default mb-0">
                                <div className="card-header pb-0">
                                    <div className="app-brand w-100 d-flex justify-content-center border-bottom-0">
                                        <a className="w-auto pl-0" href="/index.html">
                                            <img src="/images/logo.png" alt="Mono" />
                                            <span className="brand-name text-dark">HELLO</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body px-5 pb-5 pt-0">
                                    <h4 className="text-dark text-center mb-5">Change Password</h4>
                                    <Formik
                                        initialValues={{
                                            password: '',
                                            newPassword: '',
                                            confirmNewPassword: '',
                                        }}
                                        validationSchema={validateSchema}
                                        onSubmit={(values) => {
                                            editPassword();
                                            console.log(values);
                                        }}
                                    >
                                        <Form>
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <Field
                                                        type="password"
                                                        className="form-control input-lg"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        onInput={changeInput}
                                                    />
                                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <Field
                                                        type="password"
                                                        className="form-control input-lg"
                                                        id="newPassword"
                                                        name="newPassword"
                                                        placeholder="New Password"
                                                        onInput={changeInput}
                                                    />
                                                    <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <Field
                                                        type="password"
                                                        className="form-control input-lg"
                                                        id="confirmNewPassword"
                                                        name="confirmNewPassword"
                                                        placeholder="Confirm New Password"
                                                        onInput={changeInput}
                                                    />
                                                    <ErrorMessage name="confirmNewPassword" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-md-12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-pill mb-4"
                                                        style={{ marginLeft: '24%' }}
                                                    >
                                                        Change Password
                                                    </button>
                                                    <p>
                                                        You don't want to change the password.
                                                        <Link to="/login" className="text-blue" style={{ color: 'mediumpurple' }}>
                                                            Sign in
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

export default ChangePassword;
