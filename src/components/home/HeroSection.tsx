"use client";
import Image from "next/image";
const HeroSection = () => {
  const handleCreateProject = () => {
    const createButton = document.getElementById("create") as HTMLElement;
    createButton.click();
  };

  return (
    <section className="w-full h-[500px]">
      <div className="h-full w-full relative pt-[20px] px-[20px] rounded-[15px] overflow-hidden bg-[#ff3377] flex flex-col justify-center">
        <div className="grid gap-4 md:grid-cols-2 md:gap-16 w-full relative z-10 text-white">
          <div className="flex flex-col gap-[10px]">
            <h1 className="lg:leading-tighter text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-[4.5rem] 2xl:text-[5rem] text-primary-foreground">
              Elevate Your Digital Presence
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground md:text-xl">
              Discover our award-winning design solutions that transform
              businesses and captivate audiences.
            </p>
            <div className="mt-6">
              <button
                className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm text-primaryTxt bg-white hover:bg-[#d8d8d8]"
                onClick={handleCreateProject}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <Image
          className="w-full h-full object-cover absolute top-0 left-0 z-[2]"
          width={1700}
          height={800}
          alt="image"
          src={"/images/hero.jpg"}
        />
      </div>
    </section>
  );
};

export default HeroSection;
