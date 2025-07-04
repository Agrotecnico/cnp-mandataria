import clsx from 'clsx';


interface HTLMElemment extends React.AllHTMLAttributes<HTMLElement>  {
  children: React.ReactNode;
}

export function Fondo({ children, className, ...rest }: HTLMElemment) {
    return (
      <div
        {...rest}
        className={clsx(
          "bg-[#020b1d13] [box-shadow:_inset_0_1px_#0000002e,inset_0_-1px_#ffffff] rounded-lg ",
          className,
        )}
        >
          {children}
      </div>
    );
  }

  export function Frente({ children, className, ...rest }: HTLMElemment) {
    return (
      <div
        {...rest}
        className={clsx(
          "bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] rounded-md ",
          className,
        )}
        >
          {children}
      </div>
    );
  }
