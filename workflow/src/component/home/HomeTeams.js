import React, { useEffect, useState } from 'react';
import teamService from "../service/TeamService";
import { Link } from "react-router-dom";

const HomeTeams = () => {
    const [listTeam, setListTeam] = useState([]);

    useEffect(() => {
        teamService.getAllTeam().then(res => {
            setListTeam(res);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const removeTeam = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this team?");
        if (confirmDelete) {
            teamService.removeTeam(id).then(res => {
                alert("Delete success");
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        }
    };

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

            <div className="container">
                <Link to="/createTeam">
                    <button className="btn btn-primary">Add Team</button>
                </Link>
            </div>

            <div>
                {listTeam.map((team, index) => {
                    return (
                        <div className="product" key={index}>
                                <h2>{team.name}</h2>
                            <div>
                                <span>
                                    <Link to={"/b/" + team.id}>
                                      <button className="btn btn-warning">Detail</button>
                                    </Link>
                                </span>
                                <span>
                                    <button className="btn btn-danger" onClick={() => removeTeam(team.id)}>
                                      Delete
                                    </button>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default HomeTeams;
