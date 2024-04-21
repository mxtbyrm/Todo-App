import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input from "./components/ui/input.tsx";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./components/todocard.tsx";
import Select from "./components/ui/select.tsx";

const schema = z.object({
    todo: z.string().min(3).max(50),
});

type FormValues = z.infer<typeof schema>;

type todoType = {
    todo: string;
    id: string;
    completed: boolean;
};

type actionType =
    | { type: "COMPLETE"; id: string }
    | { type: "ADD_TODO"; todo: string }
    | { type: "DELETE"; id: string }
    | { type: "EDIT"; id: string; todo: string };

const reducer = (state: todoType[], action: actionType) => {
    switch (action.type) {
        case "COMPLETE":
            return state.map((todo_object) => {
                if (todo_object.id == action.id) {
                    return {
                        ...todo_object,
                        completed: !todo_object.completed,
                    };
                } else {
                    return todo_object;
                }
            });

        case "ADD_TODO":
            const new_todo = {
                todo: action.todo as string,
                id: uuidv4(),
                completed: false,
            };
            return (state = [...state, new_todo]);
        case "DELETE":
            return state.filter((todo) => todo.id !== action.id);

        case "EDIT":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, todo: action.todo };
                } else {
                    return todo;
                }
            });

        default:
            return state;
    }
};

function App(): React.ReactNode {
    const parentVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                ease: "easeInOut",
                duration: 0.1,
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                ease: "easeInOut",
                duration: 0.1,
                staggerChildren: 0.1,
            },
        },
    };
    const childVariants = {
        hidden: {
            opacity: 0,
            y: -10,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.1,
            },
        },
    };

    const [state, dispatch] = useReducer(reducer, []);

    const filter = ["All", "Active", "Completed"];

    const [selectedfilter, setSelectedfilter] = useState<string>("All");

    const [filteredData, setFilteredData] = useState(state);

    useEffect(() => {
        switch (selectedfilter) {
            case "All":
                setFilteredData(state);
                break;
            case "Active":
                setFilteredData(state.filter((todo) => !todo.completed));
                break;
            case "Completed":
                setFilteredData(state.filter((todo) => todo.completed));
                break;
        }
    }, [selectedfilter, state]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormValues> = useCallback(
        (data) => {
            dispatch({ type: "ADD_TODO", todo: data.todo });
            reset();
        },
        [state]
    );

    const handleComplete = useCallback(
        (id: string) => {
            dispatch({ type: "COMPLETE", id: id });
        },
        [state]
    );

    const handleDelete = useCallback(
        (id: string) => {
            dispatch({ type: "DELETE", id: id });
        },
        [state]
    );

    const handleEdit = useCallback(
        (id: string, todo: string) => {
            dispatch({ type: "EDIT", id: id, todo: todo });
        },
        [state]
    );

    return (
        <main className={"bg-slate-100 flex flex-col min-h-dvh min-w-full"}>
            <div
                className={
                    "container w-[40rem] flex flex-col my-[5rem] gap-4 mx-auto"
                }
            >
                <div
                    className={
                        "flex bg-white flex-col gap-4 p-6 w-full border border-slate-300 rounded-lg"
                    }
                >
                    <h1 className={"font-bold text-2xl"}>Todo App</h1>
                    <div className={"w-full flex flex-row gap-4"}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={"flex w-full flex-col gap-4"}
                        >
                            <div className={"flex flex-col gap-1"}>
                                <Input
                                    {...register("todo")}
                                    errors={errors.todo}
                                />
                                <AnimatePresence>
                                    {errors.todo && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={"text-red-500"}
                                        >
                                            {errors.todo.message}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button
                                type={"submit"}
                                className={
                                    "bg-blue-500 text-white text-md font-bold p-4 w-full rounded-lg disabled:hover:opacity-100 hover:opacity-80 outline-none transition-all ease-in-out duration-200 disabled:bg-blue-300"
                                }
                                {...(errors.todo && { disabled: true })}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className={"flex flex-col gap-4"}>
                    {state.length > 0 && (
                        <Select
                            selected={selectedfilter}
                            setSelected={setSelectedfilter}
                            options={filter}
                        />
                    )}
                    <AnimatePresence initial={true} mode={"wait"}>
                        <motion.div
                            key={selectedfilter}
                            initial={"hidden"}
                            animate={"visible"}
                            exit={"exit"}
                            variants={parentVariants}
                            className="flex flex-col gap-2"
                        >
                            {filteredData.map((todo) => {
                                return (
                                    <motion.div
                                        key={todo.id}
                                        variants={childVariants}
                                    >
                                        <TodoCard
                                            todo={todo}
                                            handleComplete={handleComplete}
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}

export default App;
