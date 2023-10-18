import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/UseDarkMode";

import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import boardService from "./service/BoardService";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";

function Sidebar({isSideBarOpen, setIsSideBarOpen}) {
    const dispatch = useDispatch();
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const [colorTheme, setTheme] = useDarkMode();

    const {id} = useParams()
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
            .required('Vui lòng nhập tên đăng nhập')
            .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
            .max(15, 'Tên đăng nhập không được quá 15 ký tự'),
    });



    const [listBoard, setListBoard] = useState([]); // khoi tao state listBoard, state nay dung de lay du lieu tu store

    useEffect(() => {
        boardService.getAllBoardByTeamId(id).then(res => {
            if (res.length> 0) {
            setListBoard(res)
            }
        })
    }, []);


    const removeBoard = (idBoard) => {
        const confirm = window.confirm("Are you sure you want to delete this board?");
        if (confirm) {
            boardService.removeBoard(idBoard).then(res => {
                alert("Delete board success")
                window.location.reload();
                navigate("/b/" + id)
            })
        }
    }

    // const [listCol, setListCol] = useState([]); // khoi tao state listBoard, state nay dung de lay du lieu tu store
    // useEffect(() => {
    //     boardService.getAllBoardByTeamId(id).then(res => {
    //         console.log(res)
    //         setListCol(res)
    //     })
    // });

    const [board, setBoard] = useState({});
    const findBoardById = (idBoard) => {
        boardService.findBoardById(idBoard).then(res => {
            setBoard(res);
        })
    };


    return (

        <>
            {/*modal edit board*/}
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
                                            window.location.reload();

                                        })
                                    }}>

                                <Form>

                                    <div className="modal-footer">
                                        <Field type="text" className="form-control" name={'name'} id="name"
                                        ></Field>
                                        <ErrorMessage name="name" component="div" className="text-danger"/>
                                        <button type="submit" className="btn btn-primary"
                                        >Luu lai
                                        </button>
                                    </div>
                                </Form>

                            </Formik>

                        </div>
                    </div>

                </div>
            </div>

            <div>

                <div
                    className={
                        `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
                    }>

                    <div>

                        <div className=" bg-blue-300 h-[70%] w-full py-4 rounded-xl overflow-x-auto">
                            <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                                ALL BOARDS ({listBoard?.length})
                            </h3>

                            <div className="  dropdown-borad flex flex-col h-[75vh] justify-between overflow-auto">
                                <div>
                                    {listBoard?.map((board, index) => (
                                        <div
                                            className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
                                                board.isActive &&
                                                " bg-[#635fc7] rounded-r-full text-white mr-8 "
                                            } `}
                                            key={index}
                                            onClick={() => {
                                                dispatch(boardsSlice.actions.setBoardActive({index}));
                                            }}
                                        >

                                            <img src={boardIcon} className="  filter-white  h-4 "/>{" "}

                                            {/*<p className=" text-lg font-bold ">{board.name}</p>*/}
                                            <div
                                                className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
                                                    board.isActive &&
                                                    " bg-[#635fc7] rounded-r-full text-white mr-8 "
                                                } `}
                                                key={index}
                                                onClick={() => {
                                                    dispatch(boardsSlice.actions.setBoardActive({index}));
                                                }}
                                            >
                                                <p className=" text-lg font-bold ">{board.name}</p>
                                            </div>

                                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                                    data-target="#modalEditBoard" onClick={() => {
                                                findBoardById(board.id)
                                            }}>
                                                Edit
                                            </button>



                                            <button className="btn btn-danger" onClick={() => {
                                                removeBoard(board.id)
                                            }}>Xoa
                                            </button>



                                        </div>



                                    ))}

                                    <div
                                        className=" flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white  "
                                        onClick={() => {
                                            setIsBoardModalOpen(true);
                                        }}
                                    >
                                        <img src={boardIcon} className="   filter-white  h-4 "/>
                                        <p className=" text-lg font-bold  ">Create New Board </p>

                                    </div>

                                    <Link to={"/createBoard/" + id}>
                                        <button className="btn btn-warning">Them</button>
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                {isBoardModalOpen && (
                    <AddEditBoardModal
                        type="add"
                        setIsBoardModalOpen={setIsBoardModalOpen}
                    />
                )}
            </div>

        </>
    );
}

export default Sidebar;
