import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const ParentVariants = {
    hidden: {
        opacity: 0,
        borderRadius: "50%",
        scale: 0,
    },
    visible: {
        opacity: 1,
        borderRadius: "10%",
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        borderRadius: "50%",
        scale: 0,
        transition: {
            delay: 0.1,
            duration: 0.2,
            ease: "easeInOut",
            when: "afterChildren",
        },
    },
};

const childVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            delay: 0.1,
            duration: 0.2,
            ease: "easeInOut",
        },
    },
    exit: {
        opacity: 0,
        pathLength: 0,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

function Checkbox({
    state,
    setState,
}: {
    state: boolean;
    setState: () => void;
}): React.ReactNode {
    return (
        <motion.label whileTap={{ scale: 0.95 }}>
            <input
                type={"checkbox"}
                checked={state}
                onChange={setState}
                className={"sr-only"}
            />
            <div
                className={clsx(
                    "flex relative overflow-hidden hover:bg-slate-100 cursor-pointer transition-all ease-in-out duration-200 aria-hidden bg-slate-50 w-8 h-8 rounded-lg ",
                    !state && "border border-slate-300"
                )}
            >
                <AnimatePresence>
                    {state && (
                        <motion.div
                            initial={"hidden"}
                            animate={"visible"}
                            exit={"exit"}
                            variants={ParentVariants}
                            className={
                                "w-full p-1 flex text-white items-center justify-center h-full bg-green-600"
                            }
                        >
                            {/* checkmark only with stroke not fill  */}
                            <svg
                                className={"stroke-current antialiased"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <motion.path
                                    variants={childVariants}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.label>
    );
}

export default Checkbox;
