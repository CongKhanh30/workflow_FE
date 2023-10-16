import React, {useEffect, useState} from 'react';
import teamService from "../service/TeamService";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import boardService from "../service/BoardService";

const HomeTeams = () => {
    const [listTeam, setListTeam] = useState([]);

    useEffect(() => {
            teamService.getAllTeam().then(res => {
                setListTeam(res);
            }).catch(err => {
                console.log(err);
            });
        }, []
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

    return (

        <>
            <style>
                {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F9F9F9;
            }
        
        .head {
        font-weight: bold;
        }
        p {
         color: black;
        }
        p:hover{
        color: #5279cb;
        }
        h1 {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            color: black;
        }
        #sidebar {
            width: 250px;
            height: 100%;
            background: #CDDAF3;
            position: fixed;
        }

        #sidebar ul {
            list-style-type: none;
            padding: 0;
        }

        #sidebar ul li {
            padding: 10px;
        }

        #sidebar ul li a {
            color: black;
            text-decoration: none;
        }

        #content {
            margin-left: 250px;
            padding: 20px;
        }

        #content h1 {
            font-size: 24px;
        }

        .group-list { 
           
            margin-top: 20px;
            max-height: 550px; /* Chiều cao tối đa cho danh sách nhóm */
            overflow-y: auto; /* Thanh cuộn dọc */
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }   
        ::-webkit-scrollbar-thumb {
        background: #84abfa; 
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #5279cb; 
        }
        .group-item {
            display: flex;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            padding: 10px;
            background-color: #CDDAF3;
        }

        .group-item a {
            
            text-decoration: none;
            color: #333;
        }

        .group-item .group-actions {
            margin-top: 10px;
        }
        .group-actions {
            width : 50%;
        }
        
        member-list {
            width : 50%;
            margin-top: 10px;
            border: 1px solid #ddd;
            padding: 10px;
            background-color: #f9f9f9;
        }

        .member-list a {
            text-decoration: none;
            color: #333;
        }
        `}
            </style>

            <>

                <div>
                    <div className="cotainer">
                        <h1 className="head">DANH SÁCH NHÓM</h1>

                        {/*<table className="table table-striped">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>Id</th>*/}
                        {/*        <th>name</th>*/}
                        {/*        <th>danh sach thanh vien</th>*/}

                        {/*        <th colSpan="2" className="action">Action</th>*/}

                        {/*    </tr>*/}
                        {/*    </thead>*/}

                        {/*    <tbody>*/}

                        {/*    {listTeam.map((team, index) => {*/}
                        {/*            return (*/}

                        {/*                <tr key={index}>*/}
                        {/*                    <td>{team.id}</td>*/}
                        {/*                    <td>{team.name}</td>*/}

                        {/*                    <td>{team.members.map((member, index) => {*/}
                        {/*                        return (*/}
                        {/*                            <div key={index}>*/}
                        {/*                                <p>{member}</p>*/}
                        {/*                            </div>*/}
                        {/*                        )*/}
                        {/*                    })}</td>*/}

                        {/*                    <td>*/}
                        {/*                        <Link to={"/b/" + team.id}>*/}
                        {/*                            <button className="btn btn-warning">Detail</button>*/}
                        {/*                        </Link>*/}
                        {/*                    </td>*/}

                        {/*                    <td>*/}
                        {/*                        <button className="btn btn-danger"*/}
                        {/*                                onClick={() => removeTeam(team.id)}>delete*/}
                        {/*                        </button>*/}
                        {/*                    </td>*/}

                        {/*                    <td>*/}
                        {/*                        <button type="button" className="btn btn-primary" data-toggle="modal"*/}
                        {/*                                data-target="#modalEditBoard" onClick={() => {*/}

                        {/*                        }}>*/}
                        {/*                            Edit*/}
                        {/*                        </button>*/}
                        {/*                    </td>*/}
                        {/*                </tr>*/}


                        {/*            )*/}
                        {/*        }*/}
                        {/*    )}*/}

                        {/*    </tbody>*/}
                        {/*</table>*/}
                        <div id="sidebar">
                            <ul>
                                <li><a href="#">Đổi thông tin cá nhân</a></li>
                                <Link to={"/changePassword/:id"}>
                                    <li><p>Đổi mật khẩu</p></li>
                                </Link>
                            </ul>
                        </div>
                        <div id="content">
                            <Link to={"/createTeam"}>
                                <button className="btn btn-info">Thêm Nhóm Mới</button>
                            </Link>
                            <div className="group-list">
                                <div className="group-item">
                                    <div className="group-actions">
                                        <a href="group_detail.html">Nhóm 1</a><br/>
                                        <a href="#">Edit</a> | <a href="#">Delete</a>
                                    </div>
                                    <div className="member-list">
                                        <h2>Danh sách thành viên của Nhóm 1:</h2> <p>Thành viên 1</p>
                                        <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 2</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 3</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 4</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 5</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 6</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 7</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>
                                <div className="group-item">
                                    <a href="group_detail.html">Nhóm 8</a>
                                    <div className="group-actions">
                                        <a href="#">Edit</a> | <a href="#">Delete</a> | <a href="#">Add Member</a>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default HomeTeams;