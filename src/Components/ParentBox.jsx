import { useState, useEffect, useRef } from "react";
import InputBox from "./InputBox.jsx";
import ChildBox from "./ChildBox.jsx";
import useLocalStorage from "./useLocalStorage.jsx";
import "./ParentBox.css";

export default function ParentBox() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");


    //this is run only one time-depedance empty []
    const [todos, setTodos] = useLocalStorage("todos", []);

    //add task .
    const addTodo = (task) => {
        if (task.trim() === "") return;

        setTodos((prev) => [
            ...prev,
            { id: Date.now(), text: task, completed: false }
        ]);
    };

    //deleteTask
    const deleteTodo = (id) => {
        setTodos((pre) => pre.filter((item) => item.id !== id));
    }


    //toggele to check comeplete or not 

    const toggleCheck = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    //edit button
    const editTodo = (id) => {
        setTodos((pre) =>
            pre.map((item) =>
                item.id === id ?
                    { ...item, isEditing: !item.isEditing } : item
            ));
    }


    //handleChange 
    const handleEditChange = (id, newText) => {
        setTodos((pre) =>
            pre.map((item) =>
                item.id === id ?
                    {
                        ...item, text: newText
                    } : item
            )
        );
    };

    //handle filters

    const filterTodo = todos.filter((item) => {
        const matchFilter =
            filter === "completed" ? item.completed :
                filter === "pending" ? !item.completed : true;

        const matchSearch =
            item.text.toLowerCase().includes(search.toLowerCase());

        return matchFilter && matchSearch;
    }
    );

    //clean completed task 
    const cleanTask = () => {
        setTodos((prev) => prev.filter((item) => !item.completed));
    };


    //states
    const TotalState = todos.length;

    const CompleteState = todos.reduce((acc, index) => { return index.completed ? acc + 1 : acc }, 0);

    const RemainState = todos.reduce((acc, index) => { return !index.completed ? acc + 1 : acc }, 0);


    return (

        <div className="Outer-box">
            <h1 className="title">✅   CheckMate</h1>
            <InputBox addTodo={addTodo} />
            <input
                type="text"
                placeholder="Search task...."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="list-container">


                <div className="btn-filter">


                    <button
                        title="show all task "
                        onClick={() => setFilter("all")}
                        className="btn-all">
                        All
                    </button>

                    <button
                        title="Mark as completed "
                        onClick={() => setFilter("completed")}
                        className={` btn-completed ${filter === "completed" ? "active" : ""} `}>
                        Completed
                    </button>

                    <button
                        disabled={filter === "pending"}
                        title="Show pending tasks"
                        onClick={() => setFilter("pending")}
                        className={` btn-remain ${filter === "pending" ? "active" : ""} `}>
                        Pending
                    </button>

                    <button
                        title="Remove completed tasks"
                        className="btn-clean"
                        onClick={cleanTask}>
                        Clean
                    </button>

                </div>
                <ol>
                    {filterTodo.length === 0 && (
                        <p className="show-empty">
                            {filter === "completed" && "No completed tasks"}
                            {filter === "pending" && "No pending tasks"}
                            {filter === "all" && "No tasks available, please add task"}
                        </p>
                    )}
                    {
                        filterTodo.map((item) => (
                            <ChildBox key={item.id}
                                item={item}
                                deleteTodo={deleteTodo}
                                toggleCheck={toggleCheck}
                                editTodo={editTodo}
                                handleEditChange={handleEditChange}
                            />
                        ))
                    }


                </ol>
                <div className="stats">
                    <p>Total: {TotalState}</p> &nbsp;  &nbsp;  &nbsp;   |
                    <p>Completed:{CompleteState} </p> &nbsp;  &nbsp;  &nbsp; |
                    <p>Pending: {RemainState}</p>
                </div>

            </div>
        </div >
    )
}