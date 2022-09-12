import React, { PropsWithChildren } from 'react';

type ButtonProps = {
  text: string;
  onClick: () => void;
  color: 'violet' | 'blue' | 'darkBlue' | 'red';
  width?: string;
  disabled?: boolean;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const getColor = (color: ButtonProps['color']) => {
    switch (color) {
      case 'violet':
        return 'bg-custom-violet';
      case 'blue':
        return 'bg-custom-blue';
      case 'darkBlue':
        return 'bg-dark-blue';
      case 'red':
        return 'bg-custom-red';
      default:
        return 'bg-custom-violet';
    }
  };

  const getHoverColor = (color: ButtonProps['color']) => {
    switch (color) {
      case 'violet':
        return 'hover:bg-hover-violet';
      case 'blue':
        return 'hover:bg-hover-blue';
      case 'darkBlue':
        return 'hover:bg-hover-dark-blue';
      case 'red':
        return 'hover:bg-hover-red';
      default:
        return 'hover:bg-hover-violet';
    }
  };

  return (
    <button
      disabled={props.disabled}
      className={`rounded-[10px] ${getColor(props.color)} ${props.width ? props.width : 'w-40'}  h-11 text-white ${getHoverColor(
        props.color,
      )}`}
      onClick={props.onClick}
    >
      <p className='font-bold text-sm leading-5'>{props.text}</p>
    </button>
  );
};
