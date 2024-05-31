### socket ki functionality hai ki socket ko front end pe bhi setup karo aur backend pe bhi setup karo jisse socket front end wala socket backend wale se connecy ho payga 

```
io.on('connection',(uniqueSocket)=>{
    console.log('connected')
})
```

```
io.on('connection',(uniqueSocket)=>{
    console.log('connected')
    // backend pe recieve ho raha hai
    uniqueSocket.on('churan',()=>{
        //  isse sabko data bhej sakte hai
        console.log('chuuuuran')
        // front end pe bheja hai jo backend pe recieve ho raha hai
        io.emit('churan papdi')

        // disconnect
        uniqueSocket.on('disconnect',()=>{
            console.log('disconnected')
        })
    })
})
```

```
// If your front is served on the same domain as your server, you can simply use: iss line se jab js load hogi jab js load hogi frontend pe to iss line se request automatic chali jaygi tumhare backend pe jo abhi k liye hamare app.js ke io.on('connection pe hai)
const socket = io();

// front end se bheja hai jo backend pe recieve ho raha hai
socket.emit('churan')
socket.on('churan papdi',()=>{
    console.log('churan papad recieve')
})
```