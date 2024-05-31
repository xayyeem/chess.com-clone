const express = require('express')
const socket = require('socket.io')
const http = require('http')
const {Chess} = require('chess.js')
const path = require('path')

const app = express()


// socket ko chahiye hota hai http server jo ki express k server pe based hona chahiye
// link http server with express server jisse socket chalega
const server = http.createServer(app) 
const io = socket(server)

//  Create Chess object instance (chess.js)

const chess = new Chess()
let players = {}
let currentPlayer = 'w'


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render('index',{title:'chess game with khalid'})
})


// socket functionality

// (uniqueSocket--> unique information about the person who connected with our server) 👇 
// .id ye socket provide karta hai jo ki har bande ki unique hoti hai
io.on('connection',(uniqueSocket)=>{
    if(!players.white){
        players.white = uniqueSocket.id
        uniqueSocket.emit('playerRole','w')
    }
    else if(!players.black){
        players.black = uniqueSocket.id
        uniqueSocket.emit('playerRole','b')
    }else{
        uniqueSocket.emit('spectatorRole')
    }
    uniqueSocket.on('disconnect',()=>{
        if(uniqueSocket.id===players.white){
           delete players.white
        }else if(uniqueSocket.id===players.black){
            delete players.black
        }
    })
    uniqueSocket.on('move',(move)=>{
        try {
            if(chess.turn()==='w' && uniqueSocket.id!==players.white ){
                return
            }
            if(chess.turn()==='b' && uniqueSocket.id!==players.black ){
                return
            }
            const result = chess.move(move)
            if(result){
                currentPlayer = chess.turn()
                // sabko bhej rahe hai
                io.emit('move',move)
                io.emit('boardState',chess.fen())
            }
            else{
                console.log('invalid move',move)
                uniqueSocket.emit('invalid move' , move)
            }
        } catch (error) {
            console.log(error.message)
            uniqueSocket.emit('invalid move',move)
        }
    })
})

server.listen(3000,()=>{console.log('running on poert')})