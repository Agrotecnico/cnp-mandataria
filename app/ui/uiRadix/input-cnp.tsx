
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
    ancho?: string;
  }


export function InputCnp({ ancho="w-full", children, className, ...rest  }: InputProps) {

  return (
    <div className={`flex relative ${ancho}`}>
      <input
        maxLength={1024}
        minLength={1}
        {...rest}
        className={clsx(
            'w-full text-sm rounded-[4px] pl-10 pr-4 pb-0.5 pt-0 border border-[#e9dae9] bg-[#ffffff] text-[#000000] opacity-70 transition-[opacity,shadow] duration-150 ease-in sm:text-base sm:pb-1 hover:opacity-90 hover:border-[#c737c747] focus:border-[rgba(195,123,195,0)] focus:opacity-100 focus:[box-shadow:_0px_0px_0px_1px_#c737c7cc] focus:outline-1 focus:outline-[#c37bc336] focus:outline-offset-2 focus:placeholder:opacity-40 placeholder:text-sm  placeholder:text-[#858585]',
            className,
        )}
      />
      {children}
    </div>
  );
}

