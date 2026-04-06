import {useState} from "react";
import "./InputBox.css";

export default function InputBox({ addTodo }) {
    const [task, setTask] = useState("");
   
    //input handle 
    const inputHandle=()=>
    {
        if(task.trim() === "")
        {
            return;
        }
        addTodo(task);
        setTask("");
    }
    
    //add task using keybords
    const handleKeydown=(e)=>{
        if(e.key==="Enter")
        {   
            e.preventDefault();
            inputHandle();
        }
    };


    return (
        <div className="input-container">
            <input type="text"
                placeholder="Add new task..."
                className="input-area"
                value={task} 
                onKeyDown={handleKeydown}
                onChange={(e) => setTask (e.target.value) }
            />
            <button className="btn-add" onClick={inputHandle}>Add</button>
        </div>
    )
}