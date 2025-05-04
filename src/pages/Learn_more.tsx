import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Helmet } from "react-helmet";

const LearnMore = () => {
  return (
    <div>
      <Helmet>
        <title>Learn More - MyChatApp</title>
        <meta name="description" content="Learn more about MyChatApp features" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 sm:text-5xl">
            Everything You Need to Stay Connected
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            MyChatApp offers an intuitive, real-time communication experience. Learn more about what makes it stand out.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-indigo-600">Real-time Messaging</h2>
            <p className="mt-4 text-gray-700">
              Our app uses Firebase to ensure that your messages are delivered and synced instantly. Chat without delays and stay updated.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-indigo-600">Media Sharing</h2>
            <p className="mt-4 text-gray-700">
              Easily share images, videos, and files directly in your chats. Everything is optimized for speed and security.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-indigo-600">Group Conversations</h2>
            <p className="mt-4 text-gray-700">
              Create public or private groups for team chats, friend groups, or communities with real-time updates and custom settings.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-indigo-600">Secure & Private</h2>
            <p className="mt-4 text-gray-700">
              We use industry-standard Firebase Auth and security rules to keep your messages and data safe and encrypted.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">Ready to get started?</p>
          <a
            href="/register"
            className="mt-3 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Create Your Free Account
          </a>
        </div>
      </main>
    </div>
  );
};

export default LearnMore;
