import React from 'react';
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import boardService from "../component/service/BoardService";
import * as Yup from "yup";
import {toast} from "react-toastify";

const CreateBoard = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên bảng không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập tên bảng')
            .min(6, 'Tên bảng phải có ít nhất 6 ký tự')
            .max(15, 'Tên bảng không được quá 15 ký tự'),

        description: Yup.string()
            .required('Vui lòng nhập miêu tả bảng')
    });

    return (
        <>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                }

                .container {
                    background: #fff;
                    max-width: 400px;
                    margin-top: 150px;
                    padding: 20px;
                }

                h2 {
                    text-align: center;
                }

                label {
                    display: block;
                    margin-top: 10px;
                }

                input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    margin-top: 5px;
                    margin-bottom: 10px;
                }

            `}
            </style>
            <>
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
                                toast.success("Tạo Bảng Thành Công")
                                navigate("/board/" + id);
                            }, err => {
                                console.log(err);
                            })
                        }
                    }
                >
                    <Form>
                        <div className="container">
                            <h2 style={{fontWeight :"bold", fontSize:"25px"}}>Thêm Bảng Mới</h2>
                                <label htmlFor="tableName">Tên bảng</label>
                                <Field type="text" className="form-control" name={'name'}
                                       placeholder="Nhập tên bảng"
                                ></Field>
                                <ErrorMessage name="name" component="div" className="text-danger"/>
                                <label htmlFor="tableDescription">Miêu tả bảng</label>
                                <Field type="text" className="form-control" name={'description'}
                                       placeholder="Nhập miêu tả bảng"
                                ></Field>
                                <ErrorMessage name="description" component="div" className="text-danger"/>
                                <button type="submit" className="btn btn-success bg-green-500" style={{color:"black"}} >Save</button>
                                <Link to={`/board/${id}`}>
                                    <button className=" btn btn-warning bg-red-500 ml-2" type="button" >Close</button>
                                </Link>
                        </div>
                    </Form>

                </Formik>
            </>
        </>
    );
};

export default CreateBoard;