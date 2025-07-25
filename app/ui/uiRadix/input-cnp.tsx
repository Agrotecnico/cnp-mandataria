
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
            'w-full text-sm rounded-[4px] pl-10 pr-4 pb-0.5 pt-0 border border-[#d9dee8] bg-[#ffffff] text-[#000000] opacity-70 transition-[opacity,shadow] duration-150 ease-in sm:text-base sm:pb-1 hover:opacity-90 hover:border-[#3767c847] focus:border-transparent focus:opacity-100 focus:[box-shadow:_0px_0px_0px_1px_#548eff] focus:outline-1 focus:outline-[#548eff66] focus:outline-offset-2 focus:placeholder:opacity-40 placeholder:text-sm  placeholder:text-[#858585]',
            className,
        )}
      />
      {children}
    </div>
  );
}

