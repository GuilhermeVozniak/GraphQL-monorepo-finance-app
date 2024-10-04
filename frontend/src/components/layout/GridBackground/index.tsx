export type GridBackGroundProps = {
  children: React.ReactNode;
};

const GridBackGround = ({ children }: GridBackGroundProps) => {
  return (
    // [struct] page min height
    <div className="min-h-[100vh] min-w-full bg-black text-white bg-grid-white/[0.2] relative flex flex-col items-center justify-between">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"></div>
      {children}
    </div>
  );
};

export default GridBackGround;
