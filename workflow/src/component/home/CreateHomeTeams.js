import React from 'react';
import {useNavigate} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import teamService from "../service/TeamService";
import * as Yup from "yup";

const CreateHomeTeams = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập tên')
            .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(15, 'Tên đăng nhập không được quá 15 ký tự'),

    });


    return (
        <Formik
            initialValues={{

            name: ""

        }}

            validationSchema={validationSchema}

                onSubmit={
            (values) => {
                teamService.createTeam(values).then(res => {
                    alert("Create success")
                    navigate("/HomeTeam");
                }, err => {
                    console.log(err);
                })
            }
        }>
            <Form>
                <div className="container-post">
                    <div >
                        <h1 id="title-form" className="head">Create Product</h1>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">name</label>
                            <Field type="text" className="form-control" name ={'name'} id="title" placeholder="nhap ten"></Field>
                            <ErrorMessage name={'name'} component={'div'} className={'text-danger'}></ErrorMessage>
                        </div>

                        <div className="mb-3" >
                            <button id="btn-form" className="btn btn-primary">Save</button>
                            <Link to={'/'}><button className="btn btn-secondary">Close</button></Link>
                        </div>

                    </div>
                </div>
            </Form>

        </Formik>
    );
};

export default CreateHomeTeams;