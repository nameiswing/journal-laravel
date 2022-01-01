import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useThoughtContext } from "../pages/Thoughts";
import swal from "sweetalert";
import axios from "axios";
import { BiX, BiDetail } from "react-icons/bi";
import Button from "react-bootstrap/Button";

//COMPONENT STARTS HERE
const TaskItem = ({ itemData }) => {
    const setAPICall = useThoughtContext();

    function deleteItem() {
        swal("Are you sure to delete?", "You can not undo this action.", {
            buttons: true,
            dangerMode: true,
        }).then((answer) => {
            if (answer) {
                axios
                    .delete(`/api/delete-thought/${itemData.id}`)
                    .then((res) => {
                        if (res.data.status === 200) {
                            swal("Success!", res.data.message, "success");
                            setAPICall((count) => (count += 1));
                        } else {
                            console.log("Something went wrong.");
                        }
                    });
            } else {
                swal("", "Cancelled Deletion");
            }
        });
    };

    function viewDetails() {
        swal(itemData.name, `${itemData.description}`)
    }


    return (
        <ListGroupItem className="mb-2 rounded border-0 shadow-sm p-0 d-flex">
            <div
                className="ms-2 d-inline-block user-select-none d-flex p-3"
                style={{
                    fontSize: ".875rem",
                    fontWeight: "600",
                }}
            >
                <span className="text-black-50">[{itemData.due_date}]</span>
                &nbsp;
                <span className="text-secondary">{itemData.name}</span>
            </div>
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
