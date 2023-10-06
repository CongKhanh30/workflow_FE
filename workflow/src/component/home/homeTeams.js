import React, {useEffect, useState} from 'react';
import service from "../service/Service";

const HomeTeams = () => {
    const [listTeam, setListTeam] = useState([]);

    useEffect(() => {
            service.getAllTeam().then(res => {
                console.log(res);
                setListTeam(res);
            }).catch(err => {
                console.log(err);
            });
        }, []
    );

    return (
        <div>
            <div className="cotainer">
                <h1 className="head">List Team</h1>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>

                        <th colSpan="2" className="action">Action</th>

                    </tr>
                    </thead>

                    <tbody>

                    {listTeam.map((team, index) => {
                            return (

                                <tr key={index}>
                                    <td>{team.id}</td>
                                    <td>{team.name}</td>

                                    <td>
                                        <button className="btn btn-danger">detail</button>
                                    </td>

                                    <td>
                                        <button className="btn btn-danger">Delete</button>
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