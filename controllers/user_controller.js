const mysql = require('mysql2');
const randomstring = require('randomstring');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1011',
  database: 'dream_or_reality_db'
});


// 로그인 컨트롤러
exports.login = (req, res) => {
  const { id, pw } = req.body;
  const sql = 'SELECT * FROM user WHERE id = ? AND pw = ?';
  connection.query(sql, [id, pw], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ error: '잘못된 자격 증명' });
      return;
    }
    return res.status(200).json({
      userid: result[0].id
    });
  });
};

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

