type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        rounded-2xl
        bg-green-600
        px-5
        py-4
        text-lg
        font-semibold
        text-white
        transition
        duration-200
        hover:bg-green-700
        active:scale-[0.98]
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}