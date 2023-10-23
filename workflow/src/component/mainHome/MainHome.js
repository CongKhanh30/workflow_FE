import React, {useEffect, useState} from 'react';
import boardService from "../service/BoardService";
import {useParams} from "react-router";
import colService from "../service/ColService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";

const MainHome = () => {

    const navigate = useNavigate();

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

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập tên đăng nhập')
            .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(15, 'Tên đăng nhập không được quá 15 ký tự'),
    });


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

    const [board, setBoard] = useState({});
    const findBoardById = (idBoard) => {
        boardService.findBoardById(idBoard).then(res => {
            setBoard(res);
        })
    };

    const removeBoard = (idBoard) => {
        const confirm = window.confirm("Are you sure you want to delete this board?");
        if (confirm) {
            boardService.removeBoard(idBoard).then(res => {
                alert("Delete board success")
                window.location.reload();
                navigate("/board/" + id)
            })
        }
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
                    <div className="modal fade" id="modalEditBoard" tabIndex="-1" role="dialog"
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

                                        initialValues={board}

                                        enableReinitialize={true} // cho phep formik duoc khoi tao lai de gan lai gia tri ban dau

                                        validationSchema={validationSchema}

                                        onSubmit={
                                            (values) => {
                                                console.log(values)
                                                boardService.editNameBoard(values, board.id).then(res => {
                                                    alert("Update success")
                                                })
                                            }}>

                                        <Form>

                                            <div className="modal-footer">
                                                <Field type="text" className="form-control" name={'name'} id="name"
                                                ></Field>
                                                <ErrorMessage name="name" component="div" className="text-danger"/>
                                                <button type="submit" className="btn btn-primary"
                                                >Lưu lại
                                                </button>
                                            </div>
                                        </Form>

                                    </Formik>

                                </div>
                            </div>

                        </div>
                    </div>


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
                                                        findBoardById(board.id)
                                                    }}>Edit</button>

                                                    <button className="menu-board-2" onClick={() => {
                                                        removeBoard(board.id)
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

                                {listCol.map((col, indexCol) => {
                                    console.log(col)
                                    return (
                                        <>
                                            <strong>{col.name}</strong>

                                            {col.cards.map((card, index) => { // index la gi
                                                return (

                                                    <div className="kanban-board">
                                                        <div className="kanban-block" id="todo" onDrop={drop}
                                                             onDragOver={allowDrop}>

                                                            <div className="task" id={indexCol} draggable="true"
                                                                 onDragStart={drag}>
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