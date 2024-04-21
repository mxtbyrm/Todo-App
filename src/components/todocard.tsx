import React, { useEffect, useRef, useState } from "react";
import Checkbox from "./ui/checkbox.tsx";
import clsx from "clsx";

type todoType = {
    todo: string;
    id: string;
    completed: boolean;
};

function TodoCard(props: {
    todo: todoType;
    handleEdit: (id: string, todo: string) => void;
    handleComplete: (id: string) => void;
    handleDelete: (id: string) => void;
}): React.ReactNode {
    const [onEdit, setOnEdit] = useState(false);
    const [text, setText] = useState(props.todo.todo);
    const changeTextElem = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const input = changeTextElem.current;
        input?.focus();
        input?.click();
    }, [onEdit]);

    return (
        <div
            className={
                "flex flex-row gap-4 p-6 items-center justify-between bg-white rounded-lg border border-slate-300"
            }
        >
            <div className={"flex flex-row gap-4 items-center"}>
                <Checkbox
                    state={props.todo.completed}
                    setState={() => {
                        props.handleComplete(props.todo.id);
                    }}
                />
                {onEdit && !props.todo.completed ? (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            console.log(text);
                            props.handleEdit(props.todo.id, text);
                            setOnEdit(!onEdit);
                        }}
                    >
                        <input
                            value={text}
                            onBlur={() => {
                                setText(props.todo.todo);
                                props.handleEdit(
                                    props.todo.id,
                                    props.todo.todo
                                );
                                setOnEdit(!onEdit);
                            }}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                            ref={changeTextElem}
                            className={
                                " border-slate-300 outline-none h-8 focus:border-slate-400 border-b text-lg px-2 py-2"
                            }
                        />
                    </form>
                ) : (
                    <div
                        className={clsx(
                            "relative flex flex-row h-8 transition-all items-center justify-center ease-in-out delay-[300ms] duration-200",
                            props.todo.completed &&
                                "opacity-50 pointer-events-none select-none"
                        )}
                    >
                        <span
                            onClick={() => {
                                setOnEdit(!onEdit);
                            }}
                            className={"p-2 text-slate-900 text-lg"}
                        >
                            {props.todo.todo}
                        </span>
                        <span
                            className={clsx(
                                "h-[2px] absolute top-1/2 left-0 -translate-y-1/2 bg-slate-900 transition-all delay-[300ms] duration-200 ease-in-out",
                                props.todo.completed ? "w-full" : "w-0"
                            )}
                        ></span>
                    </div>
                )}
            </div>
            <button
                onClick={() => {
                    props.handleDelete(props.todo.id);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                        "h-6 w-6 text-slate-300 hover:text-red-500 transition-colors ease-in-out duration-200 cursor-pointer"
                    }
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                        console.log("delete");
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
}

export default React.memo(TodoCard);
