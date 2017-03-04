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
