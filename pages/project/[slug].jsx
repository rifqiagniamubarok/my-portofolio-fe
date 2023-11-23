import BasicLayout from '@/components/Templates/BasicLayout';
import { Button } from '@nextui-org/react';
import { FaArrowLeft, FaLink } from 'react-icons/fa';

import Image from 'next/image';
import { useEffect } from 'react';
import Article from '@/components/Organisms/Article';
import Link from 'next/link';

const DetailProject = () => {
  return (
    <div className="dark min-h-screen bg-darkcard">
      <div className="h-96 w-screen relative">
        <div className="absolute z-10 bottom-0 w-full h-2/3 bg-gradient-to-t from-darkcard to-transaparent"></div>
        <div className="absolute bottom-8 z-20 mx-8 md:container md:mx-auto lg:px-32 flex justify-between">
          <p className="text-white text-4xl font-semibold ">Project SWAPI</p>
          <Button color="primary" variant="faded" className="font-semibold">
            <FaLink />
            Live Demo
          </Button>
        </div>
        <Image src={'/dummy/contohUi.png'} alt="images" fill className="object-cover" />
      </div>
      <section className="mx-8 md:container md:mx-auto lg:px-16 mt-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 relative text-white">
          <div className="md:col-span-3 ">
            <Article body={dummyContent} />
          </div>
          <div className="hidden md:inline-block md:relative ">
            <div className="sticky top-4 space-y-4">
              <div>
                <Link href={'/project'}>
                  <Button color="primary">
                    <FaArrowLeft />
                    Back
                  </Button>
                </Link>
              </div>
              <div>
                <p className="text-xl">Tech or tool used</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const dummyContent = `<p>Modern web development often involves dynamic user interactions, where elements on a web page can respond to user input in real-time. However, when it comes to fast or repeated input, a common issue that arises is \"debouncing.\" What is debounce, and why is it crucial in web development?</p><p><strong>Debounce: The Basic Concept</strong></p><p>Debounce is a technique in web development designed to control how often a function or action is triggered when an event occurs. These events can be user inputs such as typing on the keyboard, scrolling the mouse, or resizing the browser window. When users interact with these elements, a series of events can be triggered quickly, sometimes faster than the application can handle.</p><p>The most common example of debounce is in handling text input. When a user types into an input field, the function assigned to respond to text changes may be called every time the user types a new character. Without debounce, this can lead to excessive function calls, burdening the application's performance and causing a slow response.</p><p><strong>Why is Debounce Necessary?</strong></p><ol><li><p><strong>Performance Efficiency:</strong> By using debounce, we can reduce the number of unnecessary function calls. This can improve the performance efficiency of the application, especially on complex web pages with many interactive elements.</p></li><li><p><strong>Avoiding Unwanted Fluctuations:</strong> Debounce helps address unwanted fluctuations. When users type quickly or perform other rapid actions, debounce can ensure that the assigned function is only called after a certain time has passed since the last event.</p></li><li><p><strong>Optimizing User Experience:</strong> By reducing the number of unnecessary calls, debounce helps create a smoother user experience. Faster response times and better input processing can make user interactions more positive.</p></li></ol><p><strong>Debounce Implementation: How Does It Work?</strong></p><p>Implementing debounce involves delaying the execution of a function until a certain time after the last event has occurred. There are several ways to achieve this, but it generally involves using setTimeout or setInterval to delay the function's execution until a specified time after the last event.</p><p>A simple example in JavaScript:</p><pre><code>function debounce(func, delay) {\n  let timeoutId;\n  \n  return function() {\n    const context = this;\n    const args = arguments;\n    \n    clearTimeout(timeoutId);\n    \n    timeoutId = setTimeout(() =&gt; {\n      func.apply(context, args);\n    }, delay);\n  };\n}\n\n// Using debounce to handle text input\nconst handleInput = debounce(function() {\n  // Logic for handling text input\n  console.log('Input handled after debounce delay');\n}, 500);</code></pre><p><strong>Conclusion</strong></p><p>Debounce is a valuable tool in modern web development. By understanding this concept and implementing it correctly, developers can improve the performance efficiency of applications, prevent unwanted fluctuations, and optimize the user experience. As an integral part of the responsiveness and dynamism of today's web applications, debounce demonstrates that web development is about understanding and managing user interactions wisely.</p>`;

export default DetailProject;
