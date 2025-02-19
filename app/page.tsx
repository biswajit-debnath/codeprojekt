'use client';
import Hero from './_components/home/hero';
import GameCards from './_components/home/gameCards';

const HomePage = () => {

  return (
    <div className="min-h-screen">
      <Hero />
      <GameCards />
    </div>
  );
};

export default HomePage;