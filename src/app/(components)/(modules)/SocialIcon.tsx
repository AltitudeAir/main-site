import { Whatsapp } from 'iconsax-react';
import Link from 'next/link';
const SocialIcon = () => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      <Link
        href="https://web.whatsapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 p-2 rounded-xl shadow-lg transition-all  "
      >
        <Whatsapp size="32" color="white" />
      </Link>
    </div>
  );
};

export default SocialIcon;
