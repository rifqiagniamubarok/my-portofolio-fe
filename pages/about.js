import BasicLayout from '@/components/Templates/BasicLayout';
import WorkItem from '@/components/atoms/WorkItem';
import Image from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <BasicLayout>
      <section className="space-y-8 pt-20">
        <div className="">
          <div data-aos="fade-up" className="">
            <p className="text-white text-sm md:text-lg">About </p>
            <p className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Rifqi Agnia Mubarok</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-x-8 mt-5 " data-aos="fade-up" data-aos-duration="2000">
            <div className="md:col-span-4 text-white text-base md:text-lg space-y-4 text-justify ">
              <p>
                {`Hi!, I'm Rifqi. The beginning of my journey as a web developer started in April 2020, which was at the start of the pandemic. At that time I was studying electrical
              engineering at one of the higher campuses in Medan, Indonesia.`}
              </p>
              <p>
                Due to the lack of practice during the pandemic, I thought that I would not have good skills in electrical engineering when I graduated from college. So I tried to
                find opportunities in other careers. at that time I tried many things including vector design, logos, digital marketing etc. Until finally I fell in love with
                coding.
              </p>
              <p>
                There are a lot of things and technologies to learn in software development and I am motivated to learn as much as possible. I enjoy learning something new and
                getting feedback to make myself better and improve.
              </p>
              <p>
                There are a lot of things and technologies to learn in software development and I am motivated to learn as much as possible. I enjoy learning something new and
                getting feedback to make myself better and improve.
              </p>
              <p>
                In this website i will write some blogs and showcase mu projects. I believe that writing what I have learned is the best way to remember things, and I can share my
                knowledge along the way.{' '}
              </p>
              <p>I open up opportunities if there is cooperation or want to buy software development services with me.</p>
            </div>
            <div className="md:col-span-2">
              {/* <Image src={}/> */}
              <div className=" relative  w-full aspect-[5/6] ">
                <div className="bg-primary w-5/6 aspect-square scale-90 absolute z-20 left-0 top-0"></div>
                <div className="bg-light-primary w-5/6 aspect-square scale-90 absolute z-20 bottom-0 right-0"></div>
                <div className="w-full h-full scale-90 z-30 absolute right-0 left-0 flex justify-center items-center">
                  <div className="w-4/5 aspect-[5/6]  rounded-md relative overflow-hidden shadow-lg shadow-primary">
                    <div className="absolute z-40 w-full h-full bg-primary bg-opacity-60 hover:bg-opacity-0 transition-opacity duration-500 ease-in-out"></div>
                    <Image
                      src={
                        'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      }
                      fill
                      alt="me"
                      className=" object-cover "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="pb-40">
            <p className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Experiences</p>
            <div className="space-y-4 mt-4">
              <WorkItem company={'PT. Raksasa Indonesia'} title={'Front End Developer'} from={'Sep 2023'} experiences={['kfjsdk', 'sdfkdsjf', 'dsfksdjfk']} />
              <WorkItem company={'PT. Raksasa Indonesia'} title={'Front End Developer'} from={'Sep 2023'} experiences={['kfjsdk', 'sdfkdsjf', 'dsfksdjfk']} />
              <WorkItem title={'Full Stack Developer'} from={'Sep 2023'} experiences={['kfjsdk', 'sdfkdsjf', 'dsfksdjfk']} />
            </div>
          </div>
          <div className="pb-40">
            <p className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary to-light-primary text-transparent bg-clip-text">Educations</p>
            <div className="space-y-4 mt-4">
              <WorkItem
                company={'Politeknik Negeri Medan'}
                title={`Associate's degree, Telecomunications Engineering`}
                from={'Aug 2019'}
                to="Sep 2022"
                experiences={['kfjsdk', 'sdfkdsjf', 'dsfksdjfk']}
              />
              <WorkItem
                company={'Alterra Academy'}
                title={'Full Stack Software Engineering, Software Engineering'}
                from={'Aug 2021'}
                to="Jan 2022"
                experiences={['kfjsdk', 'sdfkdsjf', 'dsfksdjfk']}
              />
              <WorkItem
                company={'Junior Web Developer'}
                title={'Full Stack Software Engineering, Software Engineering'}
                from={'Aug 2021'}
                to="Jan 2022"
                experiences={['kfjsdk', 'sdfkdsjf', 'dsfksdjfk']}
              />
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export default About;
