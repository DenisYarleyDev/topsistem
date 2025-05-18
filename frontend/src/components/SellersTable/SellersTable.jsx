import { PenLine, Trash2 } from "lucide-react";

export default function SellersTable({ users = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto w-full">
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-slate-100 text-gray-700 text-sm">
            <th className="p-3 text-center">ID</th>
            <th className="p-3 text-center">Usuário</th>
            <th className="p-3 text-center">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) =>
            //verificação se usuário está ativo
            user.ativo == 1 ? (
              <tr
                key={user.id}
                className={`text-center text-gray-800 ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">
                  <div className="flex justify-center items-center gap-4">
                    <span
                      className={`text-white px-3 py-1 text-sm rounded-full bg-green-500`}
                    >
                      {user.rolename}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => onEdit(user)}
                      >
                        <PenLine size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => onDelete(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
}
