import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/UseDarkMode";

import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import service from "./service/Service";

function Sidebar({isSideBarOpen, setIsSideBarOpen}) {
    const dispatch = useDispatch();
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const [colorTheme, setTheme] = useDarkMode();


    const [listBoard, setListBoard] = useState([]); // khoi tao state listBoard, state nay dung de lay du lieu tu store

    useEffect(() => { // useEffect dung de xu ly logic sau khi render
        service.getAllBoard().then(res => {
            setListBoard(res)

        })

    }, []);

    const boards = useSelector((state) => state.boards);

    return (
        <div>
            <div
                className={
                    `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
                }
            >
                <div>
                    {/* reWrite modal  */}
                    <div className=" bg-blue-300 h-[70%] w-full   py-4 rounded-xl ">
                        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                            ALL BOARDS ({listBoard?.length})
                        </h3>

                        <div className="  dropdown-borad flex flex-col h-[75vh] justify-between overflow-auto">
                            <div>
                                {listBoard.map((board, index) => (
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
                                        <p className=" text-lg font-bold ">{board.name}</p>
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
    );
}

export default Sidebar;
