import React, { useCallback, useState } from 'react';

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    const [editMode, setEditMode] = useState(false);
    const [inputText, setInputText] = useState(title); // inputText를 현재 할일(title)로 초기화

    // 할일 체크박스 토글
    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });

      setTodoData(newTodoData);

      localStorage.setItem(
        id,
        JSON.stringify({ title: title, completed: !completed })
      );
    };

    // 할일 삭제
    const handleClick = useCallback(
      (id) => {
        let newTodoData = todoData.filter((data) => data.id !== id);
        localStorage.removeItem(id);
        setTodoData(newTodoData);
      },
      [todoData, setTodoData]
    );

    // 할일 수정
    const editTodo = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = inputText;
        }
        return data;
      });

      setTodoData(newTodoData);
      setEditMode(false);

      localStorage.setItem(
        id,
        JSON.stringify({ title: inputText, completed: completed })
      );
    };

    // inputText를 입력받은 값으로 변경
    const handleChange = (e) => {
      setInputText(e.target.value);
    };

    // 삼항연산자 이용 => editMode에 따라 UI 변경
    return !editMode ? (
      // 일반모드
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
      >
        <div className="items-center">
          <input
            className="mr-2"
            type="checkbox"
            defaultChecked={completed}
            onChange={() => handleCompleteChange(id)}
          />
          <span className={completed ? 'line-through' : undefined}>
            {title}
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <button onClick={() => setEditMode(true)}>수정</button>
          </div>
          <div>
            <button onClick={() => handleClick(id)}>X</button>
          </div>
        </div>
      </div>
    ) : (
      // 수정모드
      <div className="flex items-center justify-between px-4 py-1 my-2 w-full text-gray-600 border bg-gray-100">
        <input
          className="focus:outline-none bg-gray-100 w-full mr-4"
          type="text"
          value={inputText}
          onChange={handleChange}
          autoFocus
        />
        <div>
          <button onClick={() => editTodo(id)}>OK</button>
        </div>
      </div>
    );
  }
);

export default List;
