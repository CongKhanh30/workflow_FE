import React from 'react';
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import boardService from "../service/BoardService";
import * as Yup from "yup";

const CreateBoard = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập tên đăng nhập')
            .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(15, 'Tên đăng nhập không được quá 15 ký tự'),

        description: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Mật khẩu không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập description')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .max(32, 'Mật khẩu không được quá 32 ký tự'),
    });

    return (
        <Formik

            initialValues={{
                name: "",
                description: "",
                isPublic: true
            }}

            validationSchema={validationSchema}

            onSubmit={
                (values) => {

                    boardService.createBoardByTeamId(values, id).then(res => {
                        alert("Create board success")
                        navigate("/board/" + id);
                    }, err => {
                        console.log(err);
                    })
                }
            }


        >

            <Form>
                <div className="container-post">
                    <div>
                        <h1 id="title-form" className="head">Create tour</h1>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Ten nhom</label>
                            <Field type="text" className="form-control" name={'name'} id="title"
                                   placeholder="Nhap ten nhom"

                            ></Field>
                            <ErrorMessage name="name" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">mieu ta nhom</label>
                            <Field type="text" className="form-control" name={'description'} id="price"
                                   placeholder="Nhap mieu ta nhom"
                            ></Field>
                            <ErrorMessage name="description" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <button id="btn-form" className="btn btn-primary">Save</button>
                            <Link to={'/'}>
                                <button className="btn btn-secondary">Close</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </Form>

        </Formik>
    );
};

export default CreateBoard;