import React from 'react'; 
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Profile() {
  const session = await getServerSession(options);

  const birthdayString = session?.user?.birthday
    ? new Date(session.user.birthday).toLocaleDateString()
    : 'No birthday provided';

  const createdAtString = session?.user?.createdAt
    ? new Date(session.user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="bg-gray-900 text-white min-h-screen relative"> 
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center"> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <Image
                src={
                  session?.user?.profilePic ?? '/userprofilepics/Salem.svg'
                }
                alt={session?.user?.firstName ?? 'User'}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">
                {session?.user?.firstName} {session?.user?.lastName}
              </h2>
            </div>
            <div className="text-gray-300">
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{' '}
                {session?.user?.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Birthday:</span>{' '}
                {birthdayString}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Joined at:</span>{' '}
                {createdAtString}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">User Posts</h3> 
          </div>
        </div>
      </div>
    </div>
  );
}
