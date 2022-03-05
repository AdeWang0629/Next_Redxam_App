import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface IconButtonProps {
  buttonText?: string;
  buttonIcon?: StaticImageData;
  buttonHref?: string;
}

const IconButton: NextPage<IconButtonProps> = ({
  buttonText,
  buttonIcon,
  buttonHref
}) => (buttonHref ? (
  <Link href={buttonHref}>
    <div className="flex justify-center items-center cursor-pointer self-start">
      <div className="flex justify-center items-center ltr:mr-2 rtl:ml-2 rounded-full bg-lighter-black p-2.5">
        <Image
          src={buttonIcon || ''}
          alt="Settings Icon"
          width="24px"
          height="24px"
        />
      </div>
      {buttonText && (
      <div>
        <p className="text-white font-secondary text-lighter-black font-medium">
          {buttonText}
        </p>
      </div>
      )}
    </div>
  </Link>
) : (
  <div className="flex justify-center items-center self-start">
    <div className="flex justify-center items-center ltr:mr-2 rtl:ml-2 rounded-full bg-lighter-black p-2.5">
      <Image
        src={buttonIcon || ''}
        alt="Settings Icon"
        width="24px"
        height="24px"
      />
    </div>
    {buttonText && (
    <div>
      <p className="text-white font-secondary text-lighter-black font-medium">
        {buttonText}
      </p>
    </div>
    )}
  </div>
));

export default IconButton;
