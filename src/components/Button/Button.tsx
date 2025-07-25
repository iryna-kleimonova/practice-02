import style from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

export default function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      className={style.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
