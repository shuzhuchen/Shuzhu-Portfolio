import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = ({ isDark }) => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-12 text-center tracking-wider relative overflow-visible pt-4 pb-6">
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]">L</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.1s'}}>e</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.2s'}}>t</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.3s'}}>'</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.4s'}}>s</span>
          <span className="inline-block mx-2 sm:mx-3"></span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.5s'}}>C</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.6s'}}>o</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.7s'}}>n</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.8s'}}>n</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '0.9s'}}>e</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '1.0s'}}>c</span>
          <span className="inline-block animate-bounce text-[#3D3D3A] dark:text-[#F5F4ED]" style={{animationDelay: '1.1s'}}>t</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full animate-pulse shadow-md"></span>
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          My inbox is always open. Glad to connect, discuss, and collaborate. Whether it's about work, volunteering, or just a casual chat, I'm here for it. Feel free to drop me a message and I'll get back to you ASAP!
        </p>

        <div className="flex flex-col items-center justify-center gap-6 animate-fade-in-up">
          <a
            href="mailto:shuzhuchen98@gmail.com"
            className="inline-block mt-16 bg-gray-800 text-white dark:bg-white dark:text-gray-900 px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:scale-105 transition-transform duration-300"
          >
            Say Hello
          </a>

          <div className="flex gap-12 mt-20">
            <a href="mailto:shuzhuchen98@gmail.com" className="text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342]  transition">
              <Mail className="w-8 h-8" />
            </a>
            <a href="https://github.com/shuzhuchen" target="_blank" rel="noopener noreferrer" className="text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342] transition">
              <Github className="w-8 h-8" />
            </a>
            <a href="https://www.linkedin.com/in/shuzhu-chen-9419b6228/" target="_blank" rel="noopener noreferrer" className="text-[#3D3D3A] dark:text-[#F5F4ED] hover:text-[#C96342] dark:hover:text-[#C96342] transition">
              <Linkedin className="w-8 h-8" />
            </a>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-12">
            © Designed and Built by Shuzhu Chen. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;