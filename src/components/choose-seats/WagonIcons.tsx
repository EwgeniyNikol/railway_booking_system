type IconProps = {
  className?: string;
};

export const ToiletIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 12C4 10.3 5.3 9 7 9H9C10.7 9 12 10.3 12 12V18H10V22H6V18H4V12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="17" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M14 10H20L19 14H18V22H16V14H15L14 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const ConductorIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 22V18C6 15.8 7.8 14 10 14H14C16.2 14 18 15.8 18 18V22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 11L12 13L15 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TeaIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 10H18V16C18 18.2 16.2 20 14 20H8C5.8 20 4 18.2 4 16V10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M18 12H20C21.1 12 22 12.9 22 14C22 15.1 21.1 16 20 16H18"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 6C8 4.9 8.9 4 10 4M12 6C12 4.9 12.9 4 14 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const TrashIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 7L8 20H16L17 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M10 11V16M14 11V16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
