import React, {useEffect, useState} from 'react';
import teamService from "../service/TeamService";
import {Link} from "react-router-dom";

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
                                        <button className="btn btn-danger" onClick={() => removeTeam(team.id)}>delete
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
    );
};

export default HomeTeams;