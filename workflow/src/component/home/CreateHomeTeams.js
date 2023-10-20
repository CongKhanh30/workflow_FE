import React from 'react';
import {useNavigate} from "react-router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import teamService from "../service/TeamService";
import * as Yup from "yup";
import {toast} from "react-toastify";

const CreateHomeTeams = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Vui lòng nhập tên nhóm')
            .min(6, 'Tên nhóm phải có ít nhất 6 ký tự')
            .max(15, 'Tên nhóm không được quá 15 ký tự'),

    });


    return (

        <>
            <style>
                {`
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                
                .modal {
                    background: #CDDAF3;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1;
                    padding-top: 0px;
                }
                
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }
                
                h2 {
                    margin-top: 0;
                    font-weight: bold;
                    font-size: 1.5rem;
                }
                
                input {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                
                .button-container {
                    display: flex;
                    justify-content: center;
                }
                
                button {
                    padding: 10px 20px;
                    margin: 0 10px;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                }
                
                .add-button {
                    background: #4CAF50;
                    color: white;
                }
                
                .close-button {
                    background: #f44336;
                    color: white;
                }
                
                .add-button:hover, .close-button:hover {
                    background: #45a049;
                }
    
            `}
            </style>
                <>
                    <Formik
                        initialValues={{
                            name: ""
                        }}

                        validationSchema={validationSchema}

                        onSubmit={
                            (values) => {
                                teamService.createTeam(values).then(res => {
                                    toast.success("Tạo Nhóm Mới Thành Công !")
                                    navigate("/HomeTeam");
                                }, err => {
                                    console.log(err);
                                })
                            }
                        }>
                        <Form>
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>Thêm Nhóm</h2>
                                    <Field type="text" className="form-control" name={'name'} id="title"
                                           placeholder="Nhập tên nhóm"></Field>
                                    <ErrorMessage name={'name'} component={'div'} className={'text-danger'}></ErrorMessage>
                                    <div className="button-container">
                                        <button id="btn-form" className="add-button">Add</button>
                                        <Link to={'/HomeTeam'}>
                                            <button className="close-button">Close</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Form>

                    </Formik>
                </>

        </>

    );
};

export default CreateHomeTeams;