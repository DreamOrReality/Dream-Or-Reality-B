const mysql = require('mysql2');
const randomstring = require('randomstring');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1011',
  database: 'dream_or_reality_db'
});

exports.getUserName = (req, res) => {
  const { id } = req.body;
  
  const sql = 'SELECT name FROM user WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    // 클라이언트에 응답 전송
    return res.status(200).json({
      name: result[0].name
    });
  });
};

