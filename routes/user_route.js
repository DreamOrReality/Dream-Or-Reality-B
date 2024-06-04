const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller'); // 사용자 컨트롤러 가져오기

// 이름 가져오기 라우트
router.post('/getUserName', userController.getUserName);

// 로그인 라우트
router.post('/login', userController.login);

// 프로젝트 저장, 불러오기 라우트
router.post('/saveProjects', userController.saveProjects);
router.post('/getProjects', userController.getProjects);

// 회고록 저장 라우트
router.post('/saveMemoir', userController.saveMemoir);

module.exports = router;