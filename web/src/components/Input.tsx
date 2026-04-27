type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 justify-center max-h-20 text-gray-400 focus-within:text-blue-base ">
      {legend && (
        <legend className="text-gray-300 text-xs font-bold uppercase">
          {legend}
        </legend>
      )}

      <input
        type="text"
        className="w-full h-12  border-b border-gray-400 px-4 text-sm text-gray-100 bg-transparent outline-0"
        {...rest}
      />
    </fieldset>
  );
}
