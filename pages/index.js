import Image from 'next/image';
import { Inter } from 'next/font/google';
import BasicLayout from '@/components/Templates/BasicLayout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <BasicLayout>
      <section className="h-screen md:w-screen flex flex-col  ">
        <div className="mt-40 md:w-2/5">
          <p className="text-white text-4xl md:text-3xl font-semibold">Hi!</p>
          <p className="text-white text-2xl md:text-4xl font-semibold">
            Call me
            <span className="ml-1.5 text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Rifqi Agnia</span>
          </p>

          <p className="text-white text-2xl md:text-4xl font-semibold">
            I am a<span className="ml-1.5 text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Software Engineer</span>
          </p>
          <p className="text-white text-base md:text-lg font-medium mt-5">i like design and build website. I love what i do. Hope world better with my code.</p>
          <div className="mt-6 space-y-3 md:flex md:space-y-0 md:gap-4">
            <button className="font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text border  border-primary p-3 w-full rounded-md ">
              Learn more about me
            </button>
            <button className="font-semibold bg-gradient-to-r from-primary to-light-primary text-white  p-3 w-full rounded-md ">Touch me</button>
          </div>
        </div>
        <div className="mt-40 w-full flex justify-center ">
          <Image src={'/icons/arrow-bottom-2.svg'} width={40} height={40} alt="arrow-bottom" />
        </div>
      </section>
    </BasicLayout>
  );
}
