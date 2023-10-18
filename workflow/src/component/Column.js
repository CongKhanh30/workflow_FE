import {shuffle} from "lodash";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";
import colService from "./service/ColService";
import teamService from "./service/TeamService";
import {useParams} from "react-router";

function Column({colIndex, dataSidebar}) {
    const [dataCol, setDataCol] = useState(dataSidebar);

    console.log(dataCol, "dataCol")


    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-green-500",
        "bg-indigo-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-sky-500",
    ];


    const dispatch = useDispatch();
    const [color, setColor] = useState(null)
    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [dispatch]);


    const handleOnDrop = (e) => {
        const {prevColIndex, taskIndex} = JSON.parse(
            e.dataTransfer.getData("text")
        );

        if (colIndex !== prevColIndex) {
            dispatch(
                boardsSlice.actions.dragTask({colIndex, prevColIndex, taskIndex})
            );
        }
    };

    const handleOnDragOver = (e) => {
        e.preventDefault();
    };




    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
        >

            {dataCol?.map((col, index) => (
                colIndex === index ? <>
                    <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                        <div className={`rounded-full w-4 h-4 ${color} `}/>
                        {col.name} ({col.position})
                    </p>

                    {col.cards.map((task, index) => (
                        <Task key={index} taskIndex={index} task={task} colIndex={colIndex}/>
                    ))})
                    </>

                    : null

            ))}



        </div>
    );
}

export default Column;
