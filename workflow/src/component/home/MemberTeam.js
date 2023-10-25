import React, {useEffect, useState} from 'react';
import teamService from "../service/TeamService";
import {useNavigate} from "react-router-dom";
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
                   
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
            }

                h3 {
                background-color: #333;
                color: #fff;
                 font-size: 44px;
                text-align: center;
                padding: 20px;
            }

                .c-member{
               max-width: 800px;          
               margin: 0 auto;            
                padding: 20px;             
               background-color: #fff;    
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

                h2 {
                color: #333;
            }

                p {
                color: #777;
            }
            
            `}
            </style>
            <div className="member-team">
                <div className="h-member">
                    <h3>MEMBER TRONG TEAM</h3>
                </div>
                <div className="c-member">

                    <ul>
                        {team.members.map((member, index) => (
                            <li key={index}>
                                <h2>{member.name}</h2>
                                <p>{member.permission}</p>

                                <button className="btn btn-pill btn-smoke" style={{
                                    height: "2rem",
                                    padding: "0.4rem",
                                    fontSize: "0.8rem"
                                }} data-toggle="modal"
                                        data-target="#modalDeleteMember"
                                        onClick={() => {
                                            removeMemBer(team.id,member.username);
                                        }
                                        }>
                                    DELETE Member
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