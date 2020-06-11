const add = 'INSERT INTO tbl_user (id_role,id_tenant,fullname,username,password,created_on,updated_on) VALUES(?,?,?,?,?,?,?)'
const list = 'SELECT * FROM tbl_user'

module.exports = {add,list} 