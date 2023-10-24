import React, {useEffect, useState} from 'react';
import boardService from "../service/BoardService";
import {useParams} from "react-router";
import colService from "../service/ColService";

const MainHome = () => {

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    const {id} = useParams()
    const [listBoard, setListBoard] = useState([]);

    useEffect(() => {
            boardService.getAllBoardByTeamId(id).then(res => {
                if (res.length > 0) {
                    setListBoard(res)
                    console.log(res)
                }
            }).catch(err => {
                console.log(err);
            });
        }, []
    );

    const [listCol, setListCol] = useState([]);
    const getAllColByIdBoard = (idBoard) => {
        colService.getAllColByIdBoard(idBoard).then(res => {
            if (res.length > 0) {
                setListCol(res)
                console.log(res)
            }
        }).catch(err => {
            console.log(err);
        });
    }


    return (

        <>
            <style>
                {`
.container {
    width: 70%;
    min-width: 50%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.kanban-heading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: sans-serif;
}

.kanban-heading-text {
    font-size: 1.8rem;
    background-color: #CDDAF3;
    padding: 0.8rem 1.7rem;
    border-radius: 0.5rem;
    margin: 1rem;
    color: black;
    
}

.kanban-column {
   margin-right: 0;
}

.kanban-board {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: sans-serif;
}

.kanban-board-container {
    display: flex;
    overflow: auto; 
    width:1000px;
    height:700px;
}

.kanban-card-container {
    display: flex;
    flex-direction: column;
}

.kanban-card {
    margin: 5px 0;
}

.kanban-block {
    padding: 0.6rem;
    width: 30.5%;
    min-width: 14rem;
    min-height: 4.5rem;
    border-radius: 0.3rem;
    border: 1px solid #ddd;
}

#todo {
    background-color: #CDDAF3;
}

#inprogress {
    background-color: #ffaf00;
}

#done {
    background-color: #018b01;
}

.colName {
    display: block;
    width: 14em;
    color: black;
    font-size: 1.5em;
}

body {
    background-color: white;
}

.task {
    background-color: white;
    margin: 0.2rem 0rem 0.3rem 0rem;
    border: 0.1rem solid black;
    border-radius: 0.2rem;
    padding: 0.5rem 0.2rem 0.5rem 2rem;
    color: black;
}

#task-button {
    margin: 0.2rem 0rem 0.1rem 0rem;
    background-color: white;
    border-radius: 0.2rem;
    width: 100%;
    border: 0.25rem solid black;
    padding: 0.5rem 2.7rem;
    border-radius: 0.3rem;
    font-size: 1rem;
}

.sidebar {
    background-color: #CDDAF3;
}

.all-board {
    margin: 1em;
    margin-bottom: 1rem;
    color: black;
    font-size: 1.5em;
    font-weight: bold;
}
                    `}
            </style>

            <div>
                <>
                    <div>
                        <nav className="navbar navbar-light bg-light justify-content-between">
                            <a className="w-auto pl-0" href="/index.html" style={{display: "flex", alignContent: "center"}}>
                                <img src="../images/logo.png" alt="Mono" style={{marginRight: "10px"}} />
                                <span className="brand-name text-dark">HELLO</span>
                            </a>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search
                                    </button>
                            </form>
                        </nav>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-3 bg-white">
                            <div className="sidebar">
                                <h3 className="all-board">
                                    ALL BOARDS
                                </h3>

                                <div className="pl-2 overflow-auto" style={{height: "65vh"}}>
                                    {listBoard.map((board, index) => {
                                        return (
                                            <div>
                                                <div className="btn-group m-2">
                                                    <button type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => getAllColByIdBoard(board.id)}
                                                    >{board.name}</button>
                                                    <button type="button"
                                                            className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                                                            data-toggle="dropdown">
                                                        <span className="caret"></span>
                                                    </button>

                                                    <div className="dropdown-menu">
                                                        <button className="dropdown-item" data-toggle="modal"
                                                                data-target="#modalEditBoard" onClick={() => {
                                                        }}>Edit
                                                        </button>
                                                        <button className="dropdown-item" data-toggle="modal"
                                                                data-target="#modalEditBoard" onClick={() => {
                                                        }}>Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    <button className="btn btn-info m-4" onClick={() => {
                                        window.location.href = "/createBoard/" + id
                                    }}>Create Board
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-9">
                            <div className="container-fluid mt-10">
                                {/*<div className="kanban-heading row">*/}
                                {/*    <strong className="kanban-heading-text">Kanban Board</strong>*/}
                                {/*</div>*/}
                                <div className="kanban-board-container">
                                    {listCol.map((col, index) => (
                                        <div className="kanban-column" key={index}>
                                            <strong className="colName">{col.name}</strong>
                                            <div className="kanban-card-container">
                                                {col.cards.map((card, cardIndex) => (
                                                    <div className="kanban-card" key={cardIndex}>
                                                        <div className="kanban-block" id="todo" onDrop="drop(event)"
                                                             onDragOver="allowDrop(event)">
                                                            <div className="task" id="task1" draggable="true"
                                                                 onDragStart="drag(event)">
                                                                <span>{card.title}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </>

            </div>

        </>
    );
};

export default MainHome;