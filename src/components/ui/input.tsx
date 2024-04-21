import React, { useEffect } from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

const Input = React.forwardRef(
    (
        {
            errors,
            className,
            ...props
        }: React.ComponentProps<"input"> & {
            errors?: FieldError | undefined;
            className?: string;
        },
        ref: React.ForwardedRef<HTMLInputElement>
    ): React.ReactNode => {
        useEffect(() => {
            const input = document.querySelector("input");
            const checkFilled = () => {
                return input?.value.trim().length !== 0;
            };
            input?.setAttribute("data-filled", checkFilled().toString());
            input?.addEventListener("input", () => {
                input.setAttribute("data-filled", checkFilled().toString());
            });
        });

        return (
            <label className={"relative flex w-full"}>
                <input
                    type="text"
                    ref={ref}
                    {...props}
                    className={clsx(
                        "bg-slate-50 peer border outline-none px-4 text-slate-900 transition-all ease-in-out duration-200 p-2 pt-6 w-full rounded-lg",
                        errors
                            ? "border-red-600 focus:border-red-600"
                            : "border-slate-300 focus:border-slate-400",
                        className
                    )}
                />
                <span
                    className={clsx(
                        "absolute top-1/2 select-none antialiased pointer-events-none peer-data-[filled=true]:top-4  peer-data-[filled=true]:scale-[.8] left-4  peer-focus:scale-[.8] peer-focus:top-4 origin-left -translate-y-1/2 text-md  transition-all ease-linear duration-[100ms]",
                        errors
                            ? "text-red-600/80 peer-focus:text-red-600 peer-data-[filled=true]:text-red-600 text-red-600"
                            : "peer-data-[filled=true]:text-slate-900 peer-focus:text-slate-900 text-slate-400"
                    )}
                >
                    Add Todo
                </span>
            </label>
        );
    }
);

export default Input;
