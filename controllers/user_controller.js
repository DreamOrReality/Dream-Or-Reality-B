const mysql = require('mysql2');
const randomstring = require('randomstring');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dream',
  password: '1011',
  database: 'dream_or_reality_db'
});


// 로그인 라우터
exports.login = (req, res) => {
  const { id, pw } = req.body;

  const sql = 'SELECT id, UserId FROM user WHERE id = ? AND pw = ?';
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
    const userData = {
      UserId: result[0].UserId
    };
    res.status(200).json(userData);
  });
};

// 이름 불러오는 라우터
exports.getUserName = (req, res) => {
  const { UserId } = req.body;
  const sql = 'SELECT name FROM user WHERE UserId = ?';
  connection.query(sql, [UserId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    return res.status(200).json({
      name: result[0].name
    });
  });
};

// 프로젝트 저장 컨트롤러
exports.saveProjects = (req, res) => {
  const { UserId, title, deadline, content, recruit, tag } = req.body;
  const sql = 'INSERT INTO projects (UserId, title, deadline, content, recruit, tag) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(sql, [UserId, title, deadline, content, recruit, tag], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }
    return res.status(200).json({message:'프로젝트를 성공적으로 저장했습니다.'});
  });
};

// 프로젝트 불러오는 컨트롤러
exports.getProjects = (req, res) => {
  const userId = req.body.UserId;
  const sql = `
    SELECT p.title, DATE_FORMAT(p.deadline, "%Y-%m-%d") AS deadline, p.content, p.recruit, DATE_FORMAT(p.createdAt, "%Y-%m-%d") AS createdAt, p.tag, u.name AS username
    FROM projects p
    INNER JOIN user u ON p.UserId = u.UserId
    WHERE p.UserId = ?
  `;
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    return res.status(200).json(result);
  });
};


// 모든 프로젝트 불러오는 컨트롤러
exports.getAllProjects = (req, res) => {
  const sql = 'SELECT p.title, DATE_FORMAT(p.deadline, "%Y-%m-%d") AS deadline, p.content, p.recruit, DATE_FORMAT(p.createdAt, "%Y-%m-%d") AS createdAt, p.tag, u.name AS username FROM projects p INNER JOIN user u ON p.UserId = u.UserId';

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    return res.status(200).json(result);
  });
};


// 회고록 저장 컨트롤러
exports.saveMemoir = (req, res) => {
  const { UserId, date, content} = req.body;
  const sql = 'INSERT INTO Memoirs (UserId, date, content) VALUES (?, ?, ?)';

  connection.query(sql, [UserId, date, content], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }
    return res.status(200).json({message:'프로젝트를 성공적으로 저장했습니다.'});
  });
};

// 회고록 불러오는 컨트롤러
exports.getMemoir = (req, res) => {
  const { UserId, date } = req.body;
  const sql = 'SELECT content FROM Memoirs WHERE UserId = ? AND date = ?';
  connection.query(sql, [UserId, date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    return res.status(200).json(result);
  });
};

