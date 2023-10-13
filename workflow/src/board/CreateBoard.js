import React from 'react';
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import boardService from "../component/service/BoardService";

const CreateBoard = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    return (
        <Formik initialValues={{
            name: "",
            description: "",
            is_Public: true
        }}
                onSubmit={
            (values) => {

                boardService.createBoardByTeamId(values, id).then(res => {
                    alert("Create board success")
                    navigate("/b/" + id);
                }, err => {
                    console.log(err);
                })
            }
        }>

            <Form>
                <div className="container-post">
                    <div>
                        <h1 id="title-form" className="head">Create tour</h1>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Ten nhom</label>
                            <Field type="text" className="form-control" name={'name'} id="title"
                                   placeholder="Nhap ten nhom"

                            ></Field>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">mieu ta nhom</label>
                            <Field type="text" className="form-control" name={'description'} id="price"
                                   placeholder="Nhap mieu ta nhom"

                            ></Field>
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