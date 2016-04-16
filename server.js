const express = require('express')
const server = express()
server.use('/assets', express.static('assets'));
server.use(express.static('static'))
server.get('/',(request,response)=>{
  response.sendFile(__dirname+'/static/index.html')
})
server.listen(3000,()=>{
  console.log("server is running on:localhost:3000")
})
function* gen(x){
  var y = yield x + 2;
  return y;
  var j=yield y+2;
  return j;
}
