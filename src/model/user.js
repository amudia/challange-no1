const add = 'INSERT INTO tbl_user (id_role,id_tenant,fullname,username,password,created_on,updated_on) VALUES(?,?,?,?,?,?,?)'
const edit = `UPDATE tbl_user SET id_tenant=?, fullname=?, updated_on=? WHERE id_user=?`

module.exports = {add,edit} 