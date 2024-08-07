// pages/ErrorPage.tsx

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-lg">
          You are not authorized to view this page.
        </p>
      </div>
    </div>
  );
};
