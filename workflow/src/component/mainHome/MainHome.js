import React, {useEffect, useRef, useState} from 'react';
import boardService from "../service/BoardService";
import {useParams} from "react-router";
import colService from "../service/ColService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";
import Service from "../service/Service";

const MainHome = () => {

    const navigate = useNavigate();
    const [newColumnName, setNewColumnName] = useState('');
    const [boardId, setBoardId] = useState(0);
    const [colId, setColId] = useState(0);

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
    const [cCard, setCCard] = useState();
    const [listBoard, setListBoard] = useState([]);
    const [load, setLoad] = useState(false);

    const changeInput = (event) => {
        let {name, value} = event.target;
        setCCard({...cCard, [name]: value});
    }

    useEffect(() => {
            boardService.getAllBoardByTeamId(id).then(res => {
                if (res.length > 0) {
                    setListBoard(res)
                    console.log(res)
                }
            }).catch(err => {
                console.log(err);
            });
        }, [load]
    );

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập nội dung')
            .min(1, 'Tên phải có ít nhất 1 ký tự')
            .max(15, 'Tên không được quá 15 ký tự'),
    });


    const [listCol, setListCol] = useState([]);
    const getAllColByIdBoard = (idBoard) => {
        colService.getAllColByIdBoard(idBoard).then(res => {
            if (res.length > 0) {
                setListCol(res)
                console.log(res)
            } else {
                setListCol([]);
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

    const createColumn = (newColumnName, id) => {
        colService.createCol(newColumnName, id)
            .then((res) => {
                toast.success(res);
                setLoad(!load);
                document.getElementById('modalCreateCol').classList.remove('show');
                document.body.classList.remove('modal-open');
                const modalBackdrop = document.getElementsByClassName('modal-backdrop');
                if (modalBackdrop[0]) {
                    modalBackdrop[0].remove();
                }
                getAllColByIdBoard(id);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const renameColumn = () => {
        const columnData = {
            newName: newColumnName,
            colId: id,
        };
        colService.renameCol(columnData)
            .then((res) => {
                toast.success(res);
                setLoad(!load);
                document.getElementById('modalEditCol').classList.remove('show');
                document.body.classList.remove('modal-open');
                const modalBackdrop = document.getElementsByClassName('modal-backdrop');
                if (modalBackdrop[0]) {
                    modalBackdrop[0].remove();
                }
                getAllColByIdBoard(id);
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    const [cardForm, setCardForm] = useState({
        title: '',
        description: '',
        dueDate: '',
    });

    const resetCardForm = () => {
        setCardForm({
            title: '',
            description: '',
            dueDate: '',
        });
    };
    const createCard = () => {
        colService.createCard(cCard)
            .then((response) => {
                toast.success(response);
                setLoad(!load);
                document.getElementById('modalCreateCard').classList.remove('show');
                document.body.classList.remove('modal-open');
                const modalBackdrop = document.getElementsByClassName('modal-backdrop');
                if (modalBackdrop[0]) {
                    modalBackdrop[0].remove();
                }
                resetCardForm();
                getAllColByIdBoard(id);
            })
            .catch((error) => {
                toast.error(error);
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
                    <div className="modal fade" id="modalCreateCol" tabIndex="-1" role="dialog"
                         style={{position: "fixed", zIndex: 9999}}
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create Column</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>


                                </div>

                                <div className="modal-body">

                                    <Formik

                                        initialValues={{}}

                                        enableReinitialize={true}

                                        validationSchema={validationSchema}

                                        onSubmit={
                                            (values) => {
                                                createColumn(newColumnName, boardId);
                                            }}>

                                        <Form>

                                            <div className="modal-footer">
                                                <Field type="text" className="form-control" name={'name'} id="name"
                                                       onInput={(e) => setNewColumnName(e.target.value)}
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
                    <div className="modal fade" id="modalEditCol" tabIndex="-1" role="dialog"
                         style={{position: "fixed", zIndex: 9999}}
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Column</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>


                                </div>

                                <div className="modal-body">

                                    <Formik

                                        initialValues={{name: newColumnName}}

                                        enableReinitialize={true}

                                        validationSchema={validationSchema}

                                        onSubmit={
                                            (values) => {
                                                renameColumn();
                                            }}>

                                        <Form>

                                            <div className="modal-footer">
                                                <Field type="text" className="form-control" name={'name'} id="name"
                                                       onInput={(e) => setNewColumnName(e.target.value)}
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
                    <div className="modal fade" id="modalCreateCard" tabIndex="-1" role="dialog"
                         style={{position: "fixed", zIndex: 9999}}
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create Card</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>


                                </div>

                                <div className="modal-body">

                                    <Formik

                                        initialValues={cardForm}

                                        enableReinitialize={true}


                                        onSubmit={
                                            (values) => {
                                                setCardForm(values);
                                                createCard();
                                            }}>

                                        <Form>

                                            <div className="modal-footer">
                                                <Field type="text" className="form-control" name={'title'} id="title"
                                                       onInput={changeInput}
                                                ></Field>
                                                <Field type="text" className="form-control" name={'description'}
                                                       id="description"
                                                       onInput={changeInput}
                                                ></Field>
                                                <Field type="date" className="form-control" name={'dueDate'}
                                                       id="dueDate"
                                                       onInput={changeInput}
                                                ></Field>
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
                    <div className="modal fade" id="modalEditBoard" tabIndex="-1" role="dialog"
                         style={{position: "fixed", zIndex: 9999}}
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Board</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>


                                </div>

                                <div className="modal-body">

                                    <Formik

                                        initialValues={board}

                                        enableReinitialize={true}

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
                                <Link to={`/homeTeam`}>
                                    <button className=" btn btn-primary bg-blue-500 text-black" type="button">Back
                                    </button>
                                </Link>

                                <div style={{textAlign: "center"}}>
                                    {listBoard.map((board, index) => {
                                        return (
                                            <div>
                                                <div className="btn-group">
                                                    <button type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                getAllColByIdBoard(board.id)
                                                                setBoardId(board.id)
                                                            }}
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
                                                    }}>Edit
                                                    </button>

                                                    <button className="menu-board-2" onClick={() => {
                                                        removeBoard(board.id)
                                                    }}>Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )

                                    })}

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
                                <button className="btn btn-pill btn-smoke"
                                        style={{height: "2rem", padding: "0.4rem", fontSize: "0.8rem", width: "15%"}}
                                        data-toggle="modal"
                                        data-target="#modalCreateCol"
                                >
                                    Create Column
                                </button>

                                {listCol.map((col, indexCol) => {
                                    return (
                                        <>

                                            <strong>{col.name}</strong>
                                            <button className="btn btn-pill btn-smoke" style={{
                                                height: "2rem",
                                                padding: "0.4rem",
                                                fontSize: "0.8rem",
                                                width: "15%"
                                            }}
                                                    data-toggle="modal"
                                                    data-target="#modalEditCol"
                                                    onClick={() => {
                                                        setNewColumnName(col.name);
                                                        setColId(col.id);
                                                    }}
                                            >
                                                Edit Column
                                            </button>
                                            <button className="btn btn-pill btn-smoke" style={{
                                                height: "2rem",
                                                padding: "0.4rem",
                                                fontSize: "0.8rem",
                                                width: "15%"
                                            }}
                                                    data-toggle="modal"
                                                    data-target="#modalCreateCard"
                                                    onClick={() => {
                                                        setCCard({ colId: col.id });
                                                    }}
                                            >
                                                Create Card
                                            </button>

                                            {col.cards.map((card, index) => {
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