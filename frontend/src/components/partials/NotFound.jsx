/* eslint-disable react/no-unescaped-entities */
const NotFound = () => {
  return (
    <div className="flex items-center mt-4 justify-center h-full">
      <div className="shadow-[1px_1px_20px_rgb(0,0,0)] h-[85vh] flex flex-col items-center justify-center px-10 bg-slate-300 mx-4 rounded-md max-sm:mx-2">
        <h1 className="text-5xl mb-4 text-slate-700 my-4">
          404 - Not Found
        </h1>
        <p className="text-4xl text-slate-700">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
