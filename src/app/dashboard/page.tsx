import PostList from "../components/PostList";

const Dashboard = () => {
  return (
    <div className="relative flex flex-col justify-center bg-gray-900 min-h-screen overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="min-h-screen bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto  ml-4">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
