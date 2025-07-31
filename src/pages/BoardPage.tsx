import { Link, useNavigate } from "react-router-dom";
import { Board } from "../components/board/Board";
import { useEffect, useState } from "react";
import { CreateBoard } from "../components/board/CreateBoard";

import { ModalDelete } from "../components/ModalDelete";
import { useBoardStore } from "../store/boardStore";

export const BoardPage = () => {
  const { selectedBoard } = useBoardStore();

  const navigate = useNavigate();

  const [showCreateColumn, setShowCreateColumn] = useState(false);
  const [showUpdateBoard, setShowUpdateBoard] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseModal = () => {
    setShowCreateColumn((prev) => !prev);
  };

  useEffect(() => {
    if (!selectedBoard?.Id) {
      navigate("/", { replace: true });
    }
  }, [selectedBoard, navigate]);

  const handleDeleteBoard = () => {
    handleShowModal();
  };

  const handleEditBoard = () => {
    setShowUpdateBoard((prev) => !prev);
  };

  const handleShowModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  return (
    <div>
      <div className="card bg-base-100 shadow-sm min-h-[60vh] opacity-90">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center  md:pl-4 md:pr-4">
            <div className="flex justify-between items-center w-full md:mb-0">
              <Link to={"/"} className="flex items-center">
                <h2 className="card-title text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="lucide lucide-arrow-left-icon lucide-arrow-left">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Tableros
                </h2>
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCloseModal}
                  className="btn btn-outline btn-xs text-xl py-6 rounded-lg px-4">
                  + Lista
                </button>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-outline m-1 btn-xs text-xl py-6 rounded-lg px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="lucide lucide-menu-icon lucide-menu">
                      <path d="M4 12h16" />
                      <path d="M4 18h16" />
                      <path d="M4 6h16" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <button className="text-lg" onClick={handleEditBoard}>
                        Editar tablero
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-error text-lg"
                        onClick={handleDeleteBoard}>
                        Eliminar tablero
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>

          <h2 className="card-title text-3xl md:text-5xl font-bold w-full text-center mt-4 md:w-auto md:text-left md:mt-0">
            {selectedBoard && selectedBoard.Title}
          </h2>

          <div className="overflow-x-auto">
            <Board
              showCreateColumn={showCreateColumn}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
        {showUpdateBoard && (
          <CreateBoard
            isEditMode={true}
            handleAddBoard={() => setShowUpdateBoard(false)}
          />
        )}

        {showDeleteModal && selectedBoard && (
          <ModalDelete
            handleShowModal={handleShowModal}
            title={selectedBoard.Title}
            typeToDelete={"board"}></ModalDelete>
        )}
      </div>
    </div>
  );
};
