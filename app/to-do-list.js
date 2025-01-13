"use client";

import { useState } from 'react';

export default function ToDoList() {
  const [todos, setToDos] = useState([]);

  function addToDo(todo){
    setToDos([...todos, {item:todo, isEditable: false}]);
  }

  function deleteToDo(index){
    setToDos(todos.toSpliced(index, 1));
  }

  function changeToDoEditability(index, isEditable) {
    const newToDos = [...todos];
    newToDos[index].isEditable = isEditable;
    setToDos(newToDos);
  } 

  function changeToDo(index, todo) {
    const newToDos = [...todos];
    newToDos[index].item = todo;
    setToDos(newToDos);
  }

  return (
  <>
    <form onSubmit={(e) => {
      e.preventDefault();
      const input = e.target.elements.todoInput;
      addToDo(input.value);
      input.value = "";
    }}>
      <button type="submit">Add ToDo</button>
      <input name="todoInput"/>
    </form>
    <table>
    <tbody>
      {todos.map((todo, index) => (
        <tr key={index}>
          <td>
          {todo.isEditable 
          ? <input 
          type="text"
          value={todo.item}
          onChange={(e) => changeToDo(index, e.target.value)}
          onBlur={(e) => changeToDoEditability(index, false)}
          onKeyDown={(e) => e.key==="Enter" && changeToDoEditability(index, false)}
          />
          : todo.item}
          </td>
          <td><button onClick={() => changeToDoEditability(index, true)}>Edit</button></td>
          <td><button onClick={() => deleteToDo(index)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  </>
  );
}