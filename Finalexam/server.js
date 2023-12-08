// express 불러오기
const express = require("express")
// nunjucks 사용
const nunjucks = require('nunjucks')
const path = require('path')
// express 사용
const app = express()

app.set('view engine', 'html')
nunjucks.configure('public', {
    express: app,
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.html') //게시판 메인 페이지 html코드가 저장된 파일명(js코드 아래에 첨부함)
})
// localhost:3000(숫자는 아래에서 지정) = /
//이라는 주소에서는, view라는 폴더 안에 있는 index.html파일을 랜더하겠다.

let list = [
    {
        subject: 'test', //글제목
        username: 'test', //작성자
        date: 'test',  //날짜
        view: 0, //조회수
        cont: 'test', //글내용
        password: 'test' //글 비번
    },
]
//board

app.get('/board/list', (req, res) => {
    res.render('board/list.html', {
        content: list,
        //list, 라고 써도됨
    })
})
// localhost:3000/board/list라는 주소에서는
//public폴더 안에 있는 list.html이라는 파일을 랜더하겠다.

app.get('/board/write', (req, res) => {
    res.render('board/write.html')
})
//localhost/board/write라는 주소에서는
//public라는 폴더 안에 있는 write.html이라는 파일을 랜더하겠다.

app.use(express.urlencoded({ extended: true, })) //이거 안해놓고 post로 요청했는데 안돼요 금지. 필수임.

app.post('/board/write', (req, res) => {
    let board = { ...req.body } //req 콘솔 찍어보면, list가 json 형식으로 나옴
    console.log(list, board)
    list.push(board)
    console.log(list)
    res.redirect('/board/list')
})
//localhost/board/write라는 주소에서 form으로 넘겨받은 데이터를(내가 입력한 데이터를)
//게시판 글 리스트에 넣어준다.
//redirect는 글 작성이 끝나면, 다시 localhost/board/list라는 주소로 자동으로 넘어가겠다는 의미이다.

app.get('/board/view', (req,res)=>{
    console.log(list)
    res.render('board/view.html')
})

//localhost/board/view라는 주소를 입력하면, view라는 폴더 안에 있는 board_view.html이라는 파일을 랜더하겠다.

app.listen(3000, ()=>{
    console.log('서버가 성공적으로 실행되었습니다. 포트 번호 : 3000')
})

//뒤에 숫자 지정. 보통 3000, 8000 많이 쓴다.