type Props = React.ComponentPropsWithoutRef<"svg">;

export const ReadyJsIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      className={className}
      {...props}
      width="100%"
      height="100%"
      viewBox="0 0 1080 1080"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Artboard11">
        <g transform="matrix(0.743736,-0.743736,0.697956,0.697956,-379.803,456.45)">
          <path
            d="M242.557,899.627L242.54,899.627L242.54,403.954L456.675,403.954L456.675,671.465L1006.32,671.465L1006.32,899.645L242.557,899.645L242.557,899.627Z"
            fill="rgb(121,159,12)"
          />
        </g>
      </g>
    </svg>
  );
};
