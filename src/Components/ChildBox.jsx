import "./ChildBox.css";
export default function ChildBox({ item, deleteTodo, toggleCheck, handleEditChange, editTodo }) {


    return (
        <div className="parent-box">

            <div className="child-box">
                <button className="btn-mark" onClick={() => toggleCheck(item.id)}></button>
                {item.isEditing ? (
                    <input
                        value={item.text}
                        onChange={(e) => handleEditChange(item.id, e.target.value)}
                    />
                ) : (
                    <li style={{
                        textDecoration: item.completed ? "line-through" : "none"
                    }}>
                        {item.text}
                    </li>
                )}
                <button className="btn-delete"
                    onClick={() =>
                        deleteTodo(item.id)}>
                    Delete</button>
                <button className="btn-edit" onClick={() => editTodo(item.id)}>Edit</button>

            </div>

        </div>
    )
}