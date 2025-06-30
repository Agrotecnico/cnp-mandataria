
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
            'w-full text-sm rounded-[4px] p-4 pt-2 border border-[#e9dae9] bg-[#ffffff] text-[#000000] opacity-70 transition-[opacity,shadow] duration-150 ease-in sm:text-base hover:opacity-90 hover:border-[#c737c747] focus:border-[rgba(195,123,195,0)] focus:opacity-100 focus:[box-shadow:_0px_0px_0px_1px_#c737c7cc] focus:outline-1 focus:outline-[#c37bc336] focus:outline-offset-2 focus:placeholder:opacity-40 placeholder:text-sm  placeholder:text-[#858585]',
            className,
        )}
      />
    </div>
  );
}

