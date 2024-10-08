// 实现连接数据库的功能
// 导入模块
const mysql = require('mysql2/promise')
const { database } = require('../config/index.js')

// 创建连接池，设置连接池的参数
const pool = mysql.createPool(database)

// 可以连接数据库的方法
const allService = {
  async query(sql) {
    try {
      // 通过连接池连接数据库
      const conn = await pool.getConnection()
      // 对该连接进行某些操作
      // rows是查询到的数据，err是错误信息
      const [rows, err] = await conn.query(sql)
      // 释放连接
      pool.releaseConnection(conn)
      // 返回查询到的数据
      return Promise.resolve(rows)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

// 登录
const userLogin = (username, password) => {
  const _sql = `select * from users where username="${username}" and password="${password}"`
  return allService.query(_sql)
}

// 查找账号
const userFind = (username) => {
  const _sql = `select * from users where username="${username}"`
  return allService.query(_sql)
}

// 注册
const userRegister = (values) => {
  const { username, password, nickname } = values
  const _sql = `insert into users (username, password, nickname) values ("${username}", "${password}", "${nickname}")`
  return allService.query(_sql)
}

// 根据分类查找数据
const findNoteListByType = (note_type, id) => {
  const _sql = `select * from note where note_type="${note_type}" and userId="${id}"`
  return allService.query(_sql)
}

// 根据id查找笔记
const findNoteById = (id) => {
  const _sql = `select * from note where id="${id}"`
  return allService.query(_sql)
}

// 新建笔记
// 注册
const notePublish = (values) => {
  const { userId, nickname, title, head_img, note_type, note_content, c_time, m_time } = values
  const _sql = `insert into note (userId, nickname, title, head_img, note_type, note_content, c_time, m_time) values ("${userId}", "${nickname}", "${title}", "${head_img}", "${note_type}", "${note_content}", "${c_time}", "${m_time}")`
  return allService.query(_sql)
}

module.exports = {
  userLogin,
  userFind,
  userRegister,
  findNoteListByType,
  findNoteById,
  notePublish
}