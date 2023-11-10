import { useRef } from "react";
import Input from "./Input"
import Modal from "./Modal";

export default function NewProject({ onAdd, onCancel }) {

    const modal = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        //validation...
        if (
            enteredTitle.trim() === "" ||
            enteredDescription.trim() === "" ||
            enteredDueDate.trim() === "") {
            //show the error modal
            modal.current.open();
            return;
            //returnot e za onAdd posle da ne se izvrsi deka nemame validen input
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">OOps... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure to provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 "
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} label="Title" type="text" id="title" name="title" />
                    {/* deka Input e component a ne html element ref={title} na primer da staime nema da raboti
                mora prvo da go forwardneme vo Input component */}
                    <Input ref={descriptionRef} label="Description" textarea={true} id="description" name="description" />
                    <Input ref={dueDateRef} label="Due Date" type="date" id="due-date" name="due-date" />
                </div>
            </div>
        </>
    )
}





