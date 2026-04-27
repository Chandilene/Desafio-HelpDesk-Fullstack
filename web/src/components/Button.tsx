type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  className?: "bg-gray-200";
};

export function Button({
  children,
  isLoading,
  type = "button",

  ...rest
}: Props) {
  return (
    <button
      type={type}
      {...rest}
      disabled={isLoading}
      className="flex items-center justify-center bg-gray-200 text-gray-600 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </button>
  );
}
