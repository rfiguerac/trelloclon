import { Board } from "../components/Board"


export const BoardPage = () => {
  return (
    <div>
        <div className="card bg-base-100 shadow-sm min-h-[60vh] opacity-90">
        <div className="card-body">
          <div className="flex justify-between items-center py-6 md:pl-4 md:pr-4">
            <h2 className="card-title text-2xl md:text-3xl">Mis tableros</h2>
            <button
              className="btn btn-outline btn-xs btn-primary text-xl py-6">
              + Añadir tablero
            </button>
          </div>
        <Board />
        </div>
      </div>
    </div>
  )
}
