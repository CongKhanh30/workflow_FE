import React, {useEffect, useState} from 'react';
import boardsSlice from "../redux/boardsSlice";
import EmptyBoard from "./EmptyBoard";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import Home from "./Home";
import service from "./service/Service";
import boardService from "./service/BoardService";
import {useParams} from "react-router";

const Board = () => {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false); // khoi tao state isBoardModalOpen, state nay dung de mo modal
    const dispatch = useDispatch(); // khoi tao dispatch dung de dispatch action
    const {id} = useParams()
    // const boards = useSelector((state) => { // khoi tao state boards, state nay dung de lay du lieu tu store
    //     return state.boards
    // });

    // const boards = useSelector((state) => state.boards);
    // khoi tao state boards, state nay dung de lay du lieu tu store
    const [listBoard, setListBoard] = useState([]); // khoi tao state listBoard, state nay dung de lay du lieu tu store

    useEffect(() => { // useEffect dung de xu ly logic sau khi render
        boardService.getAllBoardByTeamId(id).then(res => {
            setListBoard(res)
        })
    }, []);


    const activeBoard = listBoard.find((board) => board.isActive);
    // const activeBoard = listBoard.find((board)=>board.isActive)
    if (!activeBoard && listBoard.length > 0)
        dispatch(boardsSlice.actions.setBoardActive({index: 0}));
    return (
            <div className=" overflow-hidden  overflow-x-scroll">
                <>
                    {listBoard.length > 0 ?
                        <>
                            <Header
                                setIsBoardModalOpen={setIsBoardModalOpen}
                                isBoardModalOpen={isBoardModalOpen}
                            />
                            <Home
                                setIsBoardModalOpen={setIsBoardModalOpen}
                                isBoardModalOpen={isBoardModalOpen}
                            />
                        </>
                        :
                        <>
                            <EmptyBoard type='add'/>
                        </>
                    }

                </>
            </div>
    );
};

export default Board;