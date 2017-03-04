import { computed, observable } from "mobx"

class Todo {
  @observable title
  @observable id
  @observable userId
  @observable body

  constructor(id, userId, title, body){
    this.id = id
    this.userId = userId
    this.title = title
    this.body = body
  }
}

export class TodoStore {
  @observable todos = ["react", "mobx"]
  @observable list = [];
  
  @computed get userList(){
    return this.list;
  }

  storeList(value) {
    // value.map(item => {
    //   this.list.push(new Todo(item))
    // })
    // this.list = this.list+value;
    this.list = value
  }

  updateList(value){
    console.log(this.list)
    // for(let i=0; i<this.list.length; i++){
    //   if(this.list[i].id == value[0] + 1){
    //     this.list[i] = value;
    //   }
    // }
  }
}

export default new TodoStore
// class Todo {
//   @observable value
//   @observable id
//   @observable complete

//   constructor(value) {
//     this.value = value
//     this.id = Date.now()
//     this.complete = false
//   }
// }

// export class TodoStore {
//   @observable todos = []
//   @observable filter = ""
//   @computed get filteredTodos() {
//     var matchesFilter = new RegExp(this.filter, "i")
//     return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
//   }

//   createTodo(value) {
//     this.todos.push(new Todo(value))
//   }

//   clearComplete = () => {
//     const incompleteTodos = this.todos.filter(todo => !todo.complete)
//     this.todos.replace(incompleteTodos)
//   }
// }

// export default new TodoStore

