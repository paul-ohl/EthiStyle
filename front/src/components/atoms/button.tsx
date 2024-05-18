export function ButtonPrimary({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    let classes = "w-full text-white text-md font-poppins leading-6 font-semibold py-2 px-6 border border-transparent rounded-full focus:outline-none transition-colors";
    if (className) {
        classes += ` ${className}`;
    }

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}
