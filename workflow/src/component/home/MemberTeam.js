import React, {useEffect, useState} from 'react';
import teamService from "../service/TeamService";
import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router";

const MemberTeam = () => {

    const [team, setTeam] = useState({
        name: '',
        members: []
    });
    const [load, setLoad] = useState(false);

    const {id} = useParams();

    useEffect(() => {
            teamService.findTeamById(id).then(res => {
                console.log(11, res);
                setTeam(res);
            }).catch(err => {
                console.log(err);
            });
        }, [load]
    );

    const removeMemBer = (id,username) => {
        teamService.removeMember(id,username).then(res => {
            console.log(res);
            setLoad(!load);
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <>

            <style>
                {`
                .member-team {
                    font-family: Arial, sans-serif;
                    background-color: #CDDAF3;
                    margin: 0;
                    padding: 0;
            }

                h3 {
                color: while;
                font-size: 44px;
                text-align: center;
                padding: 20px;
            }

               .c-member{
               max-width: 800px;          
               margin: 0 auto;            
               padding: 20px;             
               background-color: #fff;
               margin-top: 10px;    
            }

                ul {
                list-style: none;
                padding: 0;
            }

                li {
                border: 1px solid #ddd;
                margin: 10px 0;
                padding: 10px;
                background-color: #fff;
            }       

                h1 {
                color: black;
                font-weight: bold;
            }

                p {
                color: #777;
                
            }
            
            `}
            </style>
            <div className="member-team">
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="w-auto pl-0 ml-5" href="/index.html"
                       style={{display: "flex", alignContent: "center"}}>
                        <img src="../images/logo.png" alt="Mono" style={{marginRight: "10px"}}/>
                        <span className="brand-name" style={{color: "black", fontSize: "3em", fontWeight: "bold"}}>Hello</span>
                    </a>
                    <h3>MEMBERS TEAM</h3>
                    <div className="d-flex">
                        <Link to={`/homeTeam`} className="mr-8 mt-2">
                            <button className=" btn btn-primary text-black mb-2 ml-5" type="button">Back</button>
                        </Link>
                    </div>
                </nav>
                <div className="c-member">
                    <ul>
                        {team.members.map((member, index) => (
                            <li key={index}>
                                <h1>Member Name: {member.name}</h1>
                                <p>Permission: {member.permission}</p>

                                <button className="btn btn-pill btn-danger" style={{
                                    height: "2rem",
                                    padding: "0.4rem",
                                    fontSize: "0.8rem"
                                }} data-toggle="modal"
                                        data-target="#modalDeleteMember"
                                        onClick={() => {
                                            removeMemBer(team.id,member.username);
                                        }}>
                                    DELETE MEMBER
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>


        </>

    );
};
export default MemberTeam;