
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar/Navbar";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <div>
      <Helmet>
        <title>My ChatApp</title>
        <meta name="description" content="A simple chat application" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-gray-100">
        <div className="relative bg-indigo-600">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connect Instantly with My ChatApp
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
              Experience seamless communication with our intuitive chat platform. Stay connected with friends, family, or colleagues, anytime, anywhere.
            </p>
            <div className="mt-10 flex space-x-3">
              <Link
                to="/chat"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-700"
              >
                Start Chatting
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-200 bg-indigo-800 bg-opacity-75 hover:bg-indigo-700 hover:bg-opacity-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose My ChatApp?
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Discover the features that make My ChatApp the perfect communication tool.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.042A8.967 8.967 0 006 11c0 5.108 3.824 9.436 8.967 9.958a8.968 8.968 0 008.967-9.958A8.967 8.967 0 0012 6.042z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Messaging</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Send and receive messages instantly, keeping conversations fluid and engaging.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.902L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multimedia Sharing</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Share photos, videos, and documents with ease, enriching your conversations.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15.15 14.15L18 17.001M6.85 14.15L4 17.001M12 21.75a9.75 9.75 0 100-19.5 9.75 9.75 0 000 19.5z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Group Chats</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Create and participate in group conversations for collaborative discussions and shared experiences.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4m-2 6h12" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure Messaging</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Enjoy safe and secured messaging with encrypted conversations and data protection.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
