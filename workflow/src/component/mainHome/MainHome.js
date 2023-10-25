import React, {useEffect, useRef, useState} from 'react';
import boardService from "../service/BoardService";
import {useParams} from "react-router";
import colService from "../service/ColService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";
import cardService from "../service/CardService";

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
        const confirm = window.confirm("Bạn có muốn xóa bảng này?");
        if (confirm) {
            boardService.removeBoard(idBoard).then(res => {
                alert("Xóa bảng thành công")
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

    const [card, setCard] = useState({});
    const getCardById = (idCard) => {
        cardService.getCardById(idCard).then(res => {
            console.log(res)
            setCard(res);
        })
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
                        overflow-x: auto; 
                        width: 74vw;
                        height: 86vh;
                    }
                    
                    .kanban-card-container {
                        display: flex;
                        flex-direction: column;
                        width: 235px;
                        overflow-y: auto;
                        height: 75vh;
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
                        width: 12em;
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
                    
                    .brand-name {
                        color: black;
                        font-size: 3em;
                        font-weight: bold;
                       
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


                    <div className="modal fade" id="modalEditTask" tabIndex="-1" role="dialog"
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

                                        initialValues={card}

                                        enableReinitialize={true} // cho phep formik duoc khoi tao lai de gan lai gia tri ban dau

                                        onSubmit={
                                            (values) => {
                                                console.log(values)
                                                cardService.editCard(values).then(res => {
                                                    console.log(res)
                                                    alert("Update success")
                                                    // reload lai trang
                                                    window.location.reload();
                                                })
                                            }}>

                                        <Form>

                                            <div className="modal-footer">

                                                <Field type="text" className="form-control" name={'id'} id="id"
                                                ></Field>

                                                <Field type="text" className="form-control" name={'title'} id="title"
                                                ></Field>

                                                <Field as="select" name="colId">
                                                    <option value="">Chọn một tùy chọn</option>
                                                    {listCol.map((col) => (
                                                        <option key={col.id} value={col.id}>
                                                            {col.name}
                                                        </option>
                                                    ))}
                                                </Field>


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
                                                boardService.editNameBoard(values, board.id).then(res => {
                                                    toast.success("Update success")
                                                    window.location.reload();
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
                    <div className="modal fade" id="modalCreateCard" tabIndex="-1" role="dialog"
                         style={{position: "fixed", zIndex: 9999}}
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    Create Card   <h5 className="modal-title" id="exampleModalLabel"></h5>
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
                                                <Field type="text" className="form-control" name={'title'}
                                                       id="title"
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

                    <div>
                        <nav className="navbar navbar-light bg-light justify-content-between">
                            <a className="w-auto pl-0 ml-5" href="/index.html"
                               style={{display: "flex", alignContent: "center"}}>
                                <img src="../images/logo.png" alt="Mono" style={{marginRight: "10px"}}/>
                                <span className="brand-name">Hello</span>
                            </a>
                            <div className="d-flex">
                                <button className="btn btn-info mr-10"
                                        data-toggle="modal"
                                        data-target="#modalCreateCol"
                                >
                                    Create Column
                                </button>
                                <form className="form-inline">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                           aria-label="Search"/>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                        <div className="row no-gutters">
                            <div className="col-3 bg-white">
                                <div className="sidebar">
                                    <h3 className="all-board">
                                            ALL BOARDS
                                        <Link to={`/homeTeam`}>
                                            <button className=" btn btn-primary text-black mb-2 ml-5" type="button">Back</button>
                                        </Link>
                                    </h3>
                                    <div className="pl-2 overflow-auto" style={{height: "65vh"}}>
                                        {listBoard.map((board, index) => {
                                            return (
                                                <div>
                                                    <div className="btn-group m-2">
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
                                                            <button className="dropdown-item" data-toggle="modal"
                                                                    data-target="#modalEditBoard" onClick={() => {
                                                                findBoardById(board.id)
                                                            }}>Edit
                                                            </button>
                                                            <button className="dropdown-item"
                                                                     onClick={() => {
                                                                removeBoard(board.id)
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
                                    <div className="container-fluid mt-5">
                                        <div className="kanban-board-container">
                                            {listCol.map((col, index) => (
                                                <div className="kanban-column" key={index}>
                                                    <strong className="colName">{col.name}
                                                        <i style={{fontSize: "20px"}} type="button" className="fa ml-2" data-toggle="dropdown">
                                                            <span className="caret"></span>&#xf142;</i>
                                                        <div className="dropdown-menu">
                                                            <button className="dropdown-item" data-toggle="modal"
                                                                    data-target="#modalEditCol"
                                                                    onClick={() => {
                                                                setNewColumnName(col.name);
                                                                setColId(col.id);
                                                                    }}>
                                                                Edit Column
                                                            </button>
                                                            <button className="dropdown-item" data-toggle="modal" data-target="#modalCreateCard"
                                                                                onClick={() => {setCCard({colId: col.id})}}>
                                                                Create Card
                                                            </button>
                                                        </div>
                                                    </strong>
                                                    <div className="kanban-card-container">
                                                        {col.cards.map((card, cardIndex) => {
                                                            return (
                                                                    <div className="kanban-block mb-2" key={cardIndex} id="todo" onDrop={drop}
                                                                         onDragOver={allowDrop}>
                                                                        <div className="task" id="task1" draggable="true"
                                                                             onDragStart={drag}>
                                                                            <span data-target="#modalEditTask" data-toggle="modal"
                                                                                  onClick={() => {
                                                                                      getCardById(card.id)
                                                                                  }}
                                                                            >{card.title}</span>
                                                                        </div>
                                                                    </div>
                                                                )})}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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