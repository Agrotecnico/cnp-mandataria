
import clsx from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    // children: React.ReactNode;
  }


export function TextareaCnp({ className, ...rest }: TextareaProps) {

  return (
    <div className="flex relative w-full">
      <textarea
        maxLength={1024}
        minLength={4}
        {...rest}
        className={clsx(
            'w-full text-sm rounded-[4px] p-4 pt-2 border border-[#d9dee8] bg-[#ffffff] text-[#000000] opacity-70 transition-[opacity,shadow] duration-150 ease-in sm:text-base hover:opacity-90 hover:border-[#3767c847] focus:border-transparent focus:opacity-100 focus:[box-shadow:_0px_0px_0px_1px_#548eff] focus:outline-1 focus:outline-[#548eff66] focus:outline-offset-2 focus:placeholder:opacity-40 placeholder:text-sm  placeholder:text-[#858585]',
            className,
        )}
      />
    </div>
  );
}

