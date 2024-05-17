export function HorizontalSeparator({ className }: { className?: string }) {
    const classes = "border-b-2 border-b-gray-200 " + className;
    return (
        <div className={classes}></div>
    );
}
