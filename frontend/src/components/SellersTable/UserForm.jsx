export default function UserForm({
  user,
  password,
  isAdmin,
  onUserChange,
  onPasswordChange,
  onAdminToggle,
  onSubmit,
  isEditing,
  onCancelEdit,
}) {
  return (
    <form className="flex flex-wrap md:flex-nowrap justify-between items-end p-6  bg-white shadow rounded-xl w-full gap-4">
      <div className="flex flex-col w-full md:w-1/3">
        <label className="text-sm text-gray-700 mb-1">Usuário</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user}
          placeholder="Digite o usuário"
          onChange={(e) => onUserChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full md:w-1/3">
        <label className="text-sm text-gray-700 mb-1">Senha</label>
        <input
          type="password"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          placeholder="Digite a senha"
          onChange={(e) => onPasswordChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full md:w-auto items-start h-[66px] ">
        <label className="text-sm text-gray-700 mb-1">Admin</label>
        <input
          type="checkbox"
          className="w-5 h-5 mt-1 accent-green-500"
          checked={isAdmin}
          onChange={onAdminToggle}
        />
      </div>

      <div className="flex flex-col w-full md:w-auto items-center">
        <label className="invisible mb-1 ">.</label>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          {isEditing ? "Editar" : "Cadastrar"}
        </button>
      </div>

      {isEditing && (
        <div className="flex flex-col w-full md:w-auto items-start">
          <label className="invisible mb-1">.</label>
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cancelar
          </button>
        </div>
      )}
    </form>
  );
}
