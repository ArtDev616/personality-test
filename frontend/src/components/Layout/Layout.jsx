export const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-amber-300">
      <div className="max-w-7xl m-auto h-screen">{children}</div>
    </div>
  );
};
