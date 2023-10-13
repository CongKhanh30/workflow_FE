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
                                                        data-target="#modalEditBoard" onClick={() => {

                                                }}>
                                                    Edit
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