import { forwardRef, ComponentProps } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, "className">
>(({ children, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className="w-3/4 flex-none bg-cyan-700 hover:bg-cyan-900 text-white text-lg leading-6 font-bold py-3 px-6 border border-transparent rounded-full focus:outline-none transition-colors"
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
