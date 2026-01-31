import { features } from "../../../../utils/staticData";

export const ProductGridSection = (): JSX.Element => {

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-[106px] relative w-full max-w-7xl px-4 sm:px-6 lg:px-12">
      {features?.map((feature) => (
        <article
          key={feature.id}
          className="flex flex-col items-center gap-4 sm:gap-6 relative w-full"
        >
          <div
            className="relative w-16 h-16 sm:w-20 sm:h-20"
            role="img"
            aria-label={feature.iconAlt}
          >
            <div className="absolute w-full h-full top-0 left-0 bg-[url(https://c.animaapp.com/oF24BMsY/img/ellipse-6-2.svg)] bg-[100%_100%]">
              <div className="relative w-[72.50%] h-[72.50%] top-[13.75%] left-[13.75%] bg-[#181818] rounded-[29px]" />
            </div>

            <img
              className="absolute w-[50.00%] h-[50.00%] top-[25.00%] left-[25.00%]"
              alt={feature.iconAlt}
              src={feature.icon}
            />
          </div>

          <div className="flex flex-col items-center gap-2 relative w-full">
            <h3 className="relative w-fit mt-[-1.00px] [font-family:'Cabinet_Grotesk-Bold',Helvetica] font-bold text-[#181818] text-lg sm:text-xl lg:text-2xl tracking-[0] leading-7 text-center">
              {feature.title}
            </h3>

            <p className="relative w-full [font-family:'Cabinet_Grotesk-Regular',Helvetica] font-normal text-[#181818] text-sm sm:text-base text-center tracking-[0] leading-[21px]">
              {feature.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};
