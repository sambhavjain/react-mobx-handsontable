import React from "react"
import { observer } from "mobx-react"
import Handsontable from 'handsontable/dist/handsontable.full.js';
import TodoStore from './TodoStore'
var https = require('https');
@observer
export default class TodoList extends React.Component {

  constructor(props){
    super(props)
    this.getList = this.getList.bind(this)
    this.loadTable = this.loadTable.bind(this)
  }

  loadTable () {
    var
        $$ = function(id) {
          return document.getElementById(id);
        },
        container = $$('app'),
       
        hot;

      hot = new Handsontable(container, {
        startRows: 8,
        startCols: 6,
        rowHeaders: true,
        colHeaders: true,
        columns: [
          {data: 'userId'},
          {data: 'id'},
          {data: 'title'},
          {data: 'body'}
        ],

      afterChange: function(changes, source) {

          if (source === 'loadData') {
              return; //dont do anything as this is called when table is loaded
          }

          console.log(changes)
          
          changes.map(change => {
              TodoStore.updateList(change)
            // this.props.store.updateList(change)
          })
        }
      })
      https.get('https://jsonplaceholder.typicode.com/posts', (res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        res.on('data', (d) => {
          var str = String.fromCharCode.apply(null, d);
          // console.log(str)
          var data = JSON.parse(str);
          TodoStore.storeList(data)
          hot.loadData(data);
          // process.stdout.write(d);
        });

        }).on('error', (e) => {
          console.error(e);
      });
  }

  getList  ()  {
    var data
    https.get('https://jsonplaceholder.typicode.com/posts', (res) => {
   
      res.on('data', (d) => {
        var str = String.fromCharCode.apply(null, d);
       
        data = JSON.parse(str);

        this.props.store.storeList(data)
       
        
      });

      }).on('error', (e) => {
        console.error(e);
   });
      
  };
 
  render() {
   
    return (
        <div>
          <button onClick={this.loadTable}>load table</button>

          <button  onClick={this.getList}>Load list</button>
          <ul>{this.props.store.list.map(user =>{
            // for(let i=0; i<user.length; i++){
              return(
              <li key={user.id}>{user.title}</li>
              )
            // }
          })}</ul>
         
          <div ref='table' />
        </div>
      )
  }
}
// @observer
// export default class TodoList extends React.Component {
//   createNew(e) {
//     if (e.which === 13) {
//       this.props.store.createTodo(e.target.value)
//       e.target.value = ""
//     }
//   }

//   filter(e) {
//     this.props.store.filter = e.target.value
//   }

//   toggleComplete(todo) {
//     todo.complete = !todo.complete
//   }

//   render() {
//     const { clearComplete, filter, filteredTodos, todos } = this.props.store

//     const todoLis = filteredTodos.map(todo => (
//       <li key={todo.id}>
//        <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
//        <span>{todo.value}</span>
//       </li>
//     ))
//     return <div>
//       <h1>todos</h1>
//       <input className="new" onKeyPress={this.createNew.bind(this)} />
//       <input className="filter" value={filter} onChange={this.filter.bind(this)} />
//       <ul>{todoLis}</ul>
//       <a href="#" onClick={clearComplete}>Clear Complete</a>
//     </div>
//   }
// }
