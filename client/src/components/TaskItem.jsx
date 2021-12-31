import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useTaskContext } from "../pages/Tasks";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";


//COMPONENT STARTS HERE
const TaskItem = ({ itemData, idx }) => {
    
    const { tasks, setTasks, setAPICall } = useTaskContext();
    const [isChecked, setIsChecked] = useState(itemData.is_completed);

    function checkHandler() {
        setTasks(() => {
            tasks[idx].is_completed = !itemData.is_completed;
            return tasks;
        });
    }

    function markChecked() {
        const data = { is_completed: +!isChecked };
        try {
            axios.put(`/api/update-item/${itemData.id}`, data).then((res) => {
                if (res.data.status === 200) {
                    swal('Success!', res.data.message, 'success');
                    console.log(res.data.message);
                    setIsChecked(!isChecked);
                    checkHandler();
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <ListGroupItem className="mb-2 rounded border-0 shadow-sm p-0 list-group-item-action">
            <label name={`item_${itemData.id}`} className="d-inline-block p-3">
                <input
                    type="checkbox"
                    name={itemData.name}
                    defaultChecked={Boolean(itemData.is_completed)}
                    onChange={markChecked}
                />
                <span
                    className="ms-2 d-inline-block user-select-none"
                    style={{
                        textDecoration: isChecked ? "line-through" : "none",
                    }}
                >
                    <span
                        className="text-secondary"
                        style={{ fontSize: ".75rem", fontWeight: "600" }}
                    >
                        [{itemData.due_date}]
                    </span>
                    &nbsp;
                    <span>{itemData.name}</span>
                </span>
            </label>
        </ListGroupItem>
    );
};

export default TaskItem;
