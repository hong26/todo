import React from 'react'
import ReactDOM from 'react-dom'
const Todos = React.createClass({
  getInitialState(){
    return {
      todos: [],
      // 定义一个title,主要用于监测输入框输入的内容然后把输入内容传导给
      // title,再将输入内容传导给todo数组里的title,todo数组在handleSubmit组件中定义
      title:'',
      completed: 0,
      alldone:false
    }
  },

//使网页每次刷新后会自动去获取浏览器localStorage里面的内容
  componentDidMount(){
    //使用Object.keys这个封装函数获取localStorage里面的所有key,获取后是一个数组赋值给todosKeys
    const todosKeys = Object.keys(localStorage)
    const todos = []
    const com=[]
    let all=false
   //let key of todosKeys遍历新写法,可以用来遍历对象属性
    for (let key of todosKeys){
      // 通过localStorage.getItem(key),获取每一个key对应的那个localStorage数组
      //JSON.parse()方法可以把一个json字符串解析成一个对象或者数组
      const todo = JSON.parse(localStorage.getItem(key))
      // 使用push方法将每个todo的值添加到数组todos中成为数组todos的一条数据
      //[数组].push(数据):push前面必须是一个数组
      todos.push(todo)
    }

      for(let i=0; i<todos.length; i++){
        while(todos[i].done===false){
             com.push(todos[i])
             break
        }
    }
    // console.log(todos.length)
    if (com.length===0 && todos.length!==0){
         all=true
    }
    else{
      all=false
    }

    // 改变state属性中的todos为当前的todos
    this.setState({
      todos:todos,
      completed: com.length,
      alldone:all
    })
    // console.log(todos)
  },

  // 监测输入框内容然后传导给title
  handleChange(event){
    this.setState({
      title:event.target.value
    })
  },
// 输入框回车键触发的事件,form标签独有的事件
  handleSubmit(event){
    event.preventDefault()  //event.preventDefault()取消事件的默认行为(阻止事件刷新)
    const todo = {
      title:this.state.title,
      done:false,
      //获取一个唯一的,以日期演变过来的值
      id:+new Date()
    }
    // 使用localStorage.setItem方法,将todo的id变成浏览器localStorage
    // 的key,再将todo整个数组通过JSON.stringify()方法转化成json字符串传递给浏览
    // 器的localStorage成为他的value.
    // JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
    localStorage.setItem('id:'+todo.id, JSON.stringify(todo))
    const completed=this.state.completed+1
    let all=false
    if(completed===0){
      all=true
    }else{
      all=false
    }

    this.setState({
      // concat() 方法用于连接两个或多个数组。
      todos:this.state.todos.concat([todo]),
      title:'',
      alldone:all,
      completed:completed
    })
  },
  // 清空按钮
  click(event){
    localStorage.clear()
    this.setState({
      todos:[],
      title:'',
      completed:0,
      alldone:false
    })
  },
  // 每一个title的删除按钮
  handleDelete(id,event) {
    // 删除 localStorage里面符合的条目
    localStorage.removeItem('id:'+id)
    // filter(x)函数目的是筛选数组,把数组里面的x(x为参数)单独提取出来变成一个新数组.
    // 加了!就是相反,把数组里面没有x的单独提取出来变成一个新数组
    const todos = this.state.todos.filter((item) => {
      return item.id !=id
    })

  const com=[]
  for(let i=0;i<todos.length;i++){
    while(todos[i].done===false){
      com.push(todos[i])
      break
    }
  }
  let all=false
  // console.log(com.length)
  if(com.length===0 && Object.keys(localStorage).length !== 0){
    all=true
  }else{
    all=false
  }

  this.setState({
    todos:todos,
    completed:com.length,
    alldone:all
  })
  },

handleClick(key,event){
  const todo = JSON.parse(localStorage.getItem('id:'+key))
  // console.log(todo)
  let all=false
  if(todo.done===false){
    todo.done=true;
  }else{
  todo.done = false
  all=false
  }
  // console.log(all)
  localStorage.setItem('id:'+todo.id, JSON.stringify(todo))
  //修改todos方法一:
  // const todosKeys = Object.keys(localStorage)
  // const todos = []
  // for (let key of todosKeys){
  //   const todo = JSON.parse(localStorage.getItem(key))
  //   todos.push(todo)
  // }
  // 修改todos方法2:
  const todos=this.state.todos
  for(let i=0;i<todos.length;i++){
    if(todos[i].id===todo.id){
      // .splice(i,1,todo)方法,为数组对象增加,删除或者替换原有项目,其中i表示需要修改或者
      // 删除的那个项目,1表示需要删除或者替换的原有羡慕数量(0表示不删除,只增加)
      // 第三个(todo)参数是增加的那个项目
      todos.splice(i,1,todo);
    }
  }
  const com=[]
  for(let i=0;i<todos.length;i++){
    while(todos[i].done===false){
      com.push(todos[i])
      break
    }
  }
  if(com.length===0){
    all=true
  }

  this.setState({
    todos:todos,
    completed:com.length,
    alldone:all
  })
},
selectAll(event){
  const todos = this.state.todos
  let all=this.state.alldone
  let count=0
  if(all===false && todos.length!==0){
    for(let i=0; i<todos.length; i++){
      while(todos[i].done===false){
        todos[i].done=true
        localStorage.setItem('id:'+todos[i].id, JSON.stringify(todos[i]))
        break//这里的break可以不写
      }
    }
    all=true
    count=0
  }
  else{
    for(let i=0; i<todos.length; i++){
      while(todos[i].done===true){
        todos[i].done=false
        localStorage.setItem('id:'+todos[i].id, JSON.stringify(todos[i]))
        break//这里的break可以不写
      }
    }
    all=false
    count=todos.length
  }
 // console.log(all)
  this.setState({
    todos:todos,
    completed:count,
    alldone:all
  })
},

  render(){
    return (<div style={{textAlign:'center'}} >
      <h1>备忘录</h1>
      <form onSubmit={this.handleSubmit}>
      <input type = 'text' value={this.state.title} onChange={this.handleChange} />
      <span style={{display:'inline-block', width:'2%'}}></span>
      <input type = 'button' value='全部清空' style={{color:'red', background:'#CCFFFF',cursor:'pointer'}} onClick={this.click}/>
      <p>
        未完成的事件:{this.state.completed}
        <input type='checkbox'  onChange={this.selectAll} checked={this.state.alldone}/>
        </p>
    </form>
          {this.state.todos.map((item,index) => {
         // bind(this,item.id)绑定this为当前的this(this不会改变),把当前的item.id传递为handleDelete里面的参数,this可以写为null
        return(<div key={index}>
          <input type='checkbox' onChange={this.handleClick.bind(this,item.id) } checked = {item.done}/>
          <span style={{fontSize:'20px', textDecoration:item.done?'line-through':'none'}}>{item.title} </span><button onClick={this.handleDelete.bind(null,item.id)} style={{color:'#CC3333', background:'#fff', cursor: 'pointer' }}>x</button></div>)
      })}
    </div>)
  }
})

ReactDOM.render(<Todos />,document.getElementById('app'))
