import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Home() {

   const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => { // handleWindowResize là hàm để lấy kích thước của cửa sổ trình duyệt
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  // const boards = useSelector((state) => {
  //   return state.boards
  // });

  // khởi tạo columns là một mảng các cột = useSelector để lấy dữ liệu từ store
  const columns = useSelector((state) => {
    for (const b of state.boards) { // duyệt qua mảng boards trong store
      if (b.isActive) { // nếu isActive = true
        console.log("b", b)
        return b.cols // trả về mảng các cột của board đó
      }
    }
    return [];
  });

  // khi click vào tên bảng sẽ thay đổi thuộc tính isActive của bảng đó thành true và các bảng còn lại thành false
    // const activeBoard = boards.find((board) => board.isActive);


  const [isSideBarOpen, setIsSideBarOpen] = useState(true);


  return (
      <>
        <Header/>
      <div
          className={`${
              windowSize[0] >= 768 && isSideBarOpen
                  ? "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]"
                  : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6"
          }`}
      >
        {windowSize[0] >= 768 && (
            <Sidebar
                setIsBoardModalOpen={setIsBoardModalOpen}
                isBoardModalOpen={isBoardModalOpen}
                isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen}

            />
        )}

        {/* Columns Section */}
        {columns.length > 0 ? (
            <>
              {columns.map((col, index) => (
                  <Column key={index} colIndex={index} dataSidebar={columns} />              ))}
              {/* trong colum key={index} là key của mỗi cột, colIndex={index} là index của mỗi cột,
               dataSidebar={columns} là mảng các cột */}
              <div
                  onClick={() => {
                    setIsBoardModalOpen(true);
                  }}
                  className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg"
              >
                + New Column
              </div>
            </>
        ) : (
            <>
              <EmptyBoard type="new" />
            </>
        )}
        {isBoardModalOpen && (
            <AddEditBoardModal
                type="edit"
                setIsBoardModalOpen={setIsBoardModalOpen}
            />
        )}
      </div>
      </>
  );
}

export default Home;
