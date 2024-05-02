export function ButtonPrimary({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    let classes = "w-3/4 bg-cyan-700 hover:bg-cyan-900 text-white text-xl leading-6 font-medium py-3 px-6 border border-transparent rounded-full focus:outline-none transition-colors";
    if (className) {
        classes += ` ${className}`;
    }

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}
