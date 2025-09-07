
import React from 'react';
import { ScheduledPost } from '../types';

const getStatusChipClass = (status: 'Scheduled' | 'Posted' | 'Failed') => {
  switch (status) {
    case 'Posted':
      return 'bg-green-500/20 text-green-300';
    case 'Scheduled':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'Failed':
      return 'bg-red-500/20 text-red-300';
  }
};

const PlatformIcon: React.FC<{ platform: 'LinkedIn' | 'X' | 'Instagram' }> = ({ platform }) => {
    let iconPath;
    switch(platform) {
        case 'X': 
            iconPath = <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />;
            break;
        case 'LinkedIn':
            iconPath = <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />;
            break;
        case 'Instagram':
            iconPath = <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />;
            break;
    }
    return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{iconPath}</svg>;
}

const Planner: React.FC<{ scheduledPosts: ScheduledPost[] }> = ({ scheduledPosts }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Content Planner</h1>
      <p className="mt-1 text-gray-400 mb-6">Overview of all scheduled and posted content.</p>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">Platform</th>
                <th scope="col" className="px-6 py-3">Content</th>
                <th scope="col" className="px-6 py-3">Media</th>
                <th scope="col" className="px-6 py-3">Post Time</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Link</th>
              </tr>
            </thead>
            <tbody>
              {scheduledPosts.map((post) => (
                <tr key={post.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <PlatformIcon platform={post.platform} />
                        <span>{post.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <p className="truncate">{post.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt="Post media" className="w-12 h-12 rounded-md object-cover" />
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(post.postTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChipClass(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {post.postUrl ? (
                      <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-400 hover:underline">View Post</a>
                    ) : (
                      <span className="text-gray-600">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Planner;
