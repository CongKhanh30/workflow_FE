import React, {useEffect, useState} from 'react';
import teamService from "../service/TeamService";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import permissionService from "../service/PermissionService";

const HomeTeams = () => {

    const validationSchema = Yup.object({
        teamId: Yup.string()
            .required('Vui lòng nhập id')
            .min(0, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(10, 'Tên đăng nhập không được quá 15 ký tự'),

        username: Yup.string()
            .required('Vui lòng nhập tên đăng nhập')
            .min(3, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(15, 'Tên đăng nhập không được quá 15 ký tự'),

        permissionId: Yup.string()
            .required('Vui lòng chon')
            .min(0, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(10, 'Tên đăng nhập không được quá 15 ký tự'),
    });

    const [listTeam, setListTeam] = useState([]);

    useEffect(() => {
            teamService.getAllTeam().then(res => {
                setListTeam(res);
            }).catch(err => {
                console.log(err);
            });
        }, []
    );

    const [listPermission, setPermission] = useState([]);
    useEffect(() => {
            permissionService.getAllPermission().then(res => {
                setPermission(res);
            }).catch(err => {
                console.log(err);
            });
        }
    );

    const removeTeam = (id) => {
        const confirm = window.confirm("Are you sure delete this tour?");
        if (confirm === true) {
            teamService.removeTeam(id).then(res => {
                alert("Delete success");
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const [idAddMember, setIdAddMember] = useState('');
    const addMember = (id) => {
        setIdAddMember(id);
    }

    return (

        <>
            <style>
                {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px 0;
          }
          h2 {
            margin: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between; 
          }
          .product {
            background-color: #fff;
            border: 5px solid black;
            padding: 20px;
            width: calc(20% - 20px); 
            margin-bottom: 20px;
            border-radius: 15%;
            position: relative;
            left: 250px;
            
           }
        `}
            </style>

            <>
                <div className="modal fade" id="modalAddMember" tabIndex="-1" role="dialog"
                     style={{position: "fixed", zIndex: 9999}}
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">

                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Student</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>


                            </div>

                            <div className="modal-body">

                                <Formik

                                    initialValues={{
                                        // teamId: '',
                                        teamId: idAddMember,
                                        username: '',
                                        permissionId: ''
                                    }}

                                    enableReinitialize={true} // cho phep formik duoc khoi tao lai de gan lai gia tri ban dau

                                    validationSchema={validationSchema}

                                    onSubmit={
                                        (values) => {
                                            // values = {...values, teamId: idAddMember}
                                            console.log(values)
                                            teamService.addMember(values).then(res => {

                                                alert("Update success")
                                                window.location.reload();
                                            }).catch(err => {
                                                console.log(err);
                                            });
                                        }}>

                                    <Form>

                                        <div className="modal-footer">
                                            <Field type="text" className="form-control" name={'teamId'} id="teamId"
                                            ></Field>
                                            <ErrorMessage name="teamId" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'username'} id="username"
                                            ></Field>
                                            <ErrorMessage name="username" component="div" className="text-danger"/>

                                            <Field as="select" name="permissionId">
                                                <option value="">Chọn một tùy chọn</option>
                                                {listPermission.map((permission) => (
                                                    <option key={permission.id} value={permission.id}>
                                                        {permission.name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="permissionId" component="div" className="text-danger"/>

                                            <button type="submit" className="btn btn-primary"
                                            >Luu lai
                                            </button>
                                        </div>
                                    </Form>

                                </Formik>

                            </div>
                        </div>

                    </div>
                </div>


                <div>
                    <div className="cotainer">
                        <h1 className="head">List Team</h1>

                        <Link to={"/createTeam"}>
                            <button className="btn btn-primary">Add Team</button>
                        </Link>


                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>name</th>
                                <th>danh sach thanh vien</th>

                                <th colSpan="2" className="action">Action</th>

                            </tr>
                            </thead>

                            <tbody>

                            {listTeam.map((team, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{team.id}</td>
                                            <td>{team.name}</td>

                                            <td>{team.members.map((member, index) => {
                                                return (
                                                    <div key={index}>
                                                        <p>{member}</p>
                                                    </div>
                                                )
                                            })}</td>

                                            <td>
                                                <Link to={"/b/" + team.id}>
                                                    <button className="btn btn-warning">Detail</button>
                                                </Link>
                                            </td>

                                            <td>
                                                <button className="btn btn-danger"
                                                        onClick={() => removeTeam(team.id)}>delete
                                                </button>
                                            </td>

                                            <td>

                                                <button type="button" className="btn btn-primary" data-toggle="modal"
                                                        data-target="#modalAddMember"
                                                        onClick={() => {
                                                            addMember(team.id)
                                                        }
                                                        }>
                                                    Them Nguoi
                                                </button>

                                            </td>
                                        </tr>


                                    )
                                }
                            )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        </>
    );
};

export default HomeTeams;