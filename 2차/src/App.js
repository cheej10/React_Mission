import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/Lists';
import Form from './components/Form';

export default function App() {
  // state 선언 => [변수 이름, state를 정하는 함수] = userState(초기화)
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState('');

  // 컴포넌트 마운트 시, localStorage의 데이터 가져와서 todoData에 담기
  useEffect(() => {
    let todoList = [];

    for (let i = 0; i < localStorage.length; i++) {
      let todo = {
        id: localStorage.key(i),
        title: JSON.parse(localStorage.getItem(localStorage.key(i))).title,
        completed: JSON.parse(localStorage.getItem(localStorage.key(i)))
          .completed,
      };

      todoList.push(todo);
    }

    setTodoData(todoList);
  }, []);

  // 할일 추가
  const handleSubmit = (e) => {
    e.preventDefault(); // 버튼 클릭 시 새로고침 방지

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo]);

    // localStorage에 key값으로 id, value값으로 {할일, 완료여부} 객체 넣기
    localStorage.setItem(
      newTodo.id,
      JSON.stringify({
        title: newTodo.title,
        completed: newTodo.completed,
      })
    );

    setValue('');
  };

  // 할일 모두 삭제
  const removeAll = () => {
    setTodoData([]);
    localStorage.clear();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl font-bold">할 일 목록</h1>
            <input
              className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
              type="button"
              value="모두 지우기"
              onClick={removeAll}
            />
          </div>
        </div>
        <List todoData={todoData} setTodoData={setTodoData}></List>
        <Form
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
        ></Form>
      </div>
    </div>
  );
}
