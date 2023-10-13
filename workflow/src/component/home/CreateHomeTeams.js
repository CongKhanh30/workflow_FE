import React from 'react';
import {useNavigate} from "react-router";
import {Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import teamService from "../service/TeamService";

const CreateHomeTeams = () => {
    const navigate = useNavigate();

    return (
        <Formik initialValues={{

            name: ""

        }} onSubmit={
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
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field type="text" className="form-control" name ={'name'} id="title" placeholder="Enter name..."></Field>
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