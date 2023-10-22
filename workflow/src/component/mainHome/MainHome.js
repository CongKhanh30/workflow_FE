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
    background-color: tomato;
    padding: 0.8rem 1.7rem;
    border-radius: 0.5rem;
    margin: 1rem;
}

.kanban-board {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: sans-serif;
}

.kanban-block {
    padding: 0.6rem;
    width: 30.5%;
    min-width: 14rem;
    min-height: 4.5rem;
    border-radius: 0.3rem;
}

#todo {
    background-color: #fec6d1;
}

#inprogress {
    background-color: #ffaf00;
}

#done {
    background-color: #018b01;
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

                    
                    `}
            </style>

            <div>
                <>
                    <div className="row">

                        <div className="col-3 bg-white">
                            <div className="">
                                <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                                    ALL BOARDS
                                </h3>

                                <div style={{textAlign: "center"}}>
                                    {listBoard.map((board, index) => {
                                        return (
                                            <div>
                                                <div className="btn-group">
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
                                                        <a className="dropdown-item" href="#">Edit</a>
                                                        <a className="dropdown-item" href="#">Delete</a>
                                                    </div>

                                                    <button className="menu-board-1" data-toggle="modal"
                                                            data-target="#modalEditBoard" onClick={() => {
                                                    }}>Edit</button>

                                                    <button className="menu-board-2" onClick={() => {
                                                    }}>Delete</button>
                                                </div>

                                                {/*{*/}
                                                {/*    board.cols.map((column, index) => {*/}
                                                {/*        return <div key={index}>{column.name}</div>*/}

                                                {/*    })}*/}
                                            </div>
                                        )

                                    })}

                                    {/*<br>*/}
                                    {/*    <div>*/}
                                    {/*        <div className="btn-group">*/}
                                    {/*            <button type="button" className="btn btn-primary">Bảng 2</button>*/}
                                    {/*            <button type="button"*/}
                                    {/*                    className="btn btn-primary dropdown-toggle dropdown-toggle-split"*/}
                                    {/*                    data-toggle="dropdown">*/}
                                    {/*                <span className="caret"></span>*/}
                                    {/*            </button>*/}
                                    {/*            <div className="dropdown-menu">*/}
                                    {/*                <a className="dropdown-item" href="#">Edit</a>*/}
                                    {/*                <a className="dropdown-item" href="#">Delete</a>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    */}
                                    {/*    */}
                                    {/*    <br>*/}
                                    {/*        <div>*/}
                                    {/*            <div className="btn-group">*/}
                                    {/*                <button type="button" className="btn btn-primary">Bảng 3</button>*/}
                                    {/*                <button type="button"*/}
                                    {/*                        className="btn btn-primary dropdown-toggle dropdown-toggle-split"*/}
                                    {/*                        data-toggle="dropdown">*/}
                                    {/*                    <span className="caret"></span>*/}
                                    {/*                </button>*/}
                                    {/*                <div className="dropdown-menu">*/}
                                    {/*                    <a className="dropdown-item" href="#">Edit</a>*/}
                                    {/*                    <a className="dropdown-item" href="#">Delete</a>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        */}
                                    {/*        */}
                                    {/*        <br>*/}
                                    {/*            <div>*/}
                                    {/*                <div className="btn-group">*/}
                                    {/*                    <button type="button" className="btn btn-primary">Bảng 4</button>*/}
                                    {/*                    <button type="button"*/}
                                    {/*                            className="btn btn-primary dropdown-toggle dropdown-toggle-split"*/}
                                    {/*                            data-toggle="dropdown">*/}
                                    {/*                        <span className="caret"></span>*/}
                                    {/*                    </button>*/}
                                    {/*                    <div className="dropdown-menu">*/}
                                    {/*                        <a className="dropdown-item" href="#">Edit</a>*/}
                                    {/*                        <a className="dropdown-item" href="#">Delete</a>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*    */}
                                    {/*            <br>*/}
                                    {/*                <div>*/}
                                    {/*                    <div className="btn-group">*/}
                                    {/*                        <button type="button" className="btn btn-primary">Bảng 5*/}
                                    {/*                        </button>*/}
                                    {/*                        <button type="button"*/}
                                    {/*                                className="btn btn-primary dropdown-toggle dropdown-toggle-split"*/}
                                    {/*                                data-toggle="dropdown">*/}
                                    {/*                            <span className="caret"></span>*/}
                                    {/*                        </button>*/}
                                    {/*                        <div className="dropdown-menu">*/}
                                    {/*                            <a className="dropdown-item" href="#">Edit</a>*/}
                                    {/*                            <a className="dropdown-item" href="#">Delete</a>*/}
                                    {/*                        </div>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <button className="btn btn-info" onClick={() => {
                                        window.location.href = "/createBoard/" + id

                                    }}>Create Board
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="col-9">

                            <div className="container">

                                <div className="kanban-heading">
                                    <strong className="kanban-heading-text">Kanban Board</strong>
                                </div>

                                {listCol.map((col, index) => {
                                    console.log(col)
                                    return (
                                        <>
                                            <strong>{col.name}</strong>
                                            {col.cards.map((card, index) => {
                                                return (

                                                    <div className="kanban-board">
                                                        <div className="kanban-block" id="todo" onDrop="drop(event)"
                                                             onDragOver="allowDrop(event)">

                                                            <div className="task" id="task1" draggable="true"
                                                                 onDragStart="drag(event)">
                                                                <span>{card.title}</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </>
                                    )
                                })}


                            </div>
                        </div>

                    </div>

                </>

            </div>

        </>
    );
};

export default MainHome;