import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useTaskContext } from "../pages/Tasks";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { BiX, BiDetail } from "react-icons/bi";
import Button from "react-bootstrap/Button";

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
                    setIsChecked(!isChecked);
                    checkHandler();
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    function deleteItem() {
        swal("Are you sure to delete?", "You can not undo this action.", {
            buttons: true,
            dangerMode: true,
        }).then((answer) => {
            if (answer) {
                axios.delete(`/api/delete-item/${itemData.id}`).then((res) => {
                    if (res.data.status === 200) {
                        swal("Success!", res.data.message, "success");
                        setAPICall((count) => (count += 1));
                    } else {
                        console.log('Something went wrong.')
                    }
                });
            } else {
                swal("", "Your task item is safe.");
            }
        });
    }

    function viewDetails() {
        swal(itemData.name, `${itemData.description}`)
    }

    return (
        <ListGroupItem className="mb-2 rounded border-0 shadow-sm p-0 d-flex">
            <label
                name={`item_${itemData.id}`}
                className="d-flex p-3 align-items-center"
            >
                <input
                    type="checkbox"
                    name={itemData.name}
                    defaultChecked={Boolean(itemData.is_completed)}
                    onChange={markChecked}
                    style={{ width: "18px", height: "18px" }}
                />
                <span
                    className="ms-2 d-inline-block user-select-none"
                    style={{
                        textDecoration: isChecked ? "line-through" : "none",
                        opacity: isChecked ? 0.75 : 1,
                        textDecorationColor: isChecked && "#dc3545",
                        textDecorationThickness: isChecked && "2px",
                        fontSize: ".875rem",
                        fontWeight: "600",
                    }}
                >
                    <span className="text-black-50">[{itemData.due_date}]</span>
                    &nbsp;
                    <span className="text-secondary">{itemData.name}</span>
                </span>
            </label>
            <Button
                variant="outline-light"
                className="ms-auto border-0 px-3"
                onClick={viewDetails}
            >
                <BiDetail fontSize={"24px"} color="#20c997" />
            </Button>
            <Button
                variant="outline-light"
                className="border-0 px-3"
                onClick={deleteItem}
            >
                <BiX fontSize={"24px"} color="#dc3545" />
            </Button>
        </ListGroupItem>
    );
};

export default TaskItem;
