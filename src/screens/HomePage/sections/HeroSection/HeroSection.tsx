export const HeroSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full max-w-7xl h-auto aspect-[1090/578] min-h-[300px]"
      aria-label="Hero section showcasing featured product"
    >
      <div className="inline-flex items-center justify-center gap-2.5 absolute top-[17%] left-0 right-0">
        <h1 className="relative w-fit mt-[-1.00px] [font-family:'Teko',Helvetica] font-bold text-[#4a4c6c2b] tracking-[0] leading-[normal] whitespace-nowrap"
            style={{
              fontSize: 'clamp(80px, 25vw, 300px)'
            }}>
          SHOP ALL
        </h1>
      </div>

      <div
        className="absolute top-[81%] right-[5%] sm:right-[10%] lg:right-[19.5%] [font-family:'Teko',Helvetica] font-normal text-[#181818] text-base sm:text-xl lg:text-2xl tracking-[3.60px] leading-[normal]"
        aria-label="Product feature"
      >
        SOFT PAD
      </div>

      <div
        className="absolute top-[6%] left-[10%] sm:left-[15%] lg:left-[19.2%] [font-family:'Teko',Helvetica] font-normal text-[#181818] text-base sm:text-xl lg:text-2xl tracking-[3.60px] leading-[normal]"
        aria-label="Product feature"
      >
        ADJUSTABLE
      </div>

      <div
        className="absolute bottom-[1%] left-[10%] w-[44%] h-[9%] bg-[#00000069] rounded-[241.5px/26px] blur-[29.9px]"
        aria-hidden="true"
      />

      <img
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[69%] h-[95.5%] object-contain"
        alt="Black and blue sport shoes with adjustable soft pad design"
        src="https://c.animaapp.com/oF24BMsY/img/sport-shoes.png"
      />
    </section>
  );
};
