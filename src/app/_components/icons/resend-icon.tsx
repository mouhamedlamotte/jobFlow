type Props = React.ComponentPropsWithoutRef<"svg">;

export const ResendIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      className={className}
      {...props}
      fill="none"
      height="600px"
      width="600px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="186 154 244 293.471"
    >
      <path
        d="M186 447.471V154h132.062c18.726 0 35.635 4.053 50.728 12.158 15.373 8.105 27.391 19.285 36.055 33.54 8.665 13.974 12.997 29.906 12.997 47.793 0 18.447-4.332 35.077-12.997 49.89-8.664 14.534-20.543 25.994-35.636 34.378-15.092 8.385-32.142 12.578-51.147 12.578h-64.145v103.134zm162.667 0L274.041 314.99l72.949-10.481L430 447.471zm-94.75-157.636h57.856c7.267 0 13.556-1.537 18.866-4.612 5.59-3.354 9.782-7.965 12.577-13.835 3.075-5.869 4.612-12.577 4.612-20.123 0-7.547-1.677-14.115-5.031-19.705-3.354-5.869-8.245-10.341-14.673-13.416-6.149-3.074-13.696-4.611-22.64-4.611h-51.567z"
        className="fill-current"
      />
    </svg>
  );
};
