import { IconProps } from "./type";

export function Bookmark({
  className,
  primaryColor = "#3A3842",
  fillColor = "none",
}: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.8808 2H6.11111C4.39436 2 3 3.39155 3 5.087V16.3554C3 17.7949 4.03972 18.4027 5.31318 17.7069L9.2464 15.5396C9.66551 15.3077 10.3425 15.3077 10.7536 15.5396L14.6868 17.7069C15.9603 18.4107 17 17.8029 17 16.3554V5.087C16.9919 3.39155 15.5976 2 13.8808 2Z"
        stroke={primaryColor}
        fill={fillColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
