import React, { useState } from "react";
import clsx from "clsx";

function Select(props: {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
}): React.ReactNode {
    const [opened, setOpened] = useState(false);
    return (
        <div
            className={"flex flex-col w-fit relative "}
            onClick={() => setOpened(!opened)}
        >
            <button
                className={
                    "flex bg-white group border border-slate-300 rounded-lg p-1 w-[10rem] items-center gap-1 justify-between"
                }
            >
                <span className={"ml-2"}>{props.selected}</span>
                <span
                    className={
                        "w-6 h-6 p-1 group-hover:bg-slate-200 rounded-lg transition-all ease-in-out duration-200"
                    }
                >
                    <svg
                        className={clsx(
                            "transition-all ease-in-out duration-200",
                            opened ? "rotate-180" : "rotate-0"
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </button>
            {opened && (
                <div
                    className={
                        "absolute top-10 flex justify-center items-center w-[10rem] flex-col gap-1 z-50 bg-white border border-slate-300 rounded-lg p-2"
                    }
                >
                    {props.options.map((option, index) => (
                        <button
                            key={index}
                            {...(props.selected == option && {
                                disabled: true,
                            })}
                            onClick={() => {
                                props.setSelected(option);
                                setOpened(false);
                            }}
                            className={
                                "w-full p-2 flex flex-row justify-start items-center text-left indent-6 disabled:hover:bg-white disabled:text-slate-900/70 hover:bg-slate-100 rounded-lg"
                            }
                        >
                            {props.selected == option && (
                                <span className={"-mr-4 w-4 h-4"}>
                                    <svg
                                        className={"stroke-current antialiased"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>
                            )}
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Select;
