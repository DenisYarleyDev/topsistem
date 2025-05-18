import db from "../config/db.js";

export async function sellersMD() {
  const sql =
    'select users.id as id, users.username as username, roles.rolename as  rolename, users.ativo as ativo from users join roles on users.cargo = roles.id WHERE roles.rolename = "VENDEDOR";';
  const result = await db.query(sql).then((res) => {
    return res[0];
  });

  return result;
}

export async function sellersInactive(id) {
  const sql = "update users set ativo = 0 where id = ? ";

  const result = await db.query(sql, [id]).then((res) => {
    return res;
  });

  return result;
}
