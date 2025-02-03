import { useState } from "react";

function Item(props) {

    const [value, setValue] = useState(props.task)


  
  return (
    <div>
      {props.isEdit ? (
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="I Want Todo..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
          />

          <button onClick={()=> props.editTask(value, props.id)}>Edit</button>
        </div>
      ) : (
        <li
          className={props.completed ? "checked" : ""}
          onClick={props.ticktask}
        >
          {props.task}
          <span>x</span>{" "}
          <p onClick={props.showEdit} className="edit">
            📝
          </p>
        </li>
      )}
    </div>
  );
}
export default Item;
