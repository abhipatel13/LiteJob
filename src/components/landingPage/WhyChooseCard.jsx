const WhyChooseCard = ({ title, desc, icon, color }) => {
  return (
    <div
      className={`w-full sm:w-3/4 md:w-[620px] lg:h-[132px] h-full flex flex-col  rounded-xl border`}
      style={{ backgroundColor: `${color}` }}
    >
      <div className="left flex lg:px-4 px-2 py-2 gap-4 items-center">
        <div>{icon}</div>
        <h3 className="text-[32px] font-[500] leading-[36px]">{title}</h3>
      </div>
      <div className="right lg:px-[70px] px-[10px] mb-4">
        <p className="mt-3 font-[400] text-[16px] leading-[24px]">{desc}</p>
      </div>
    </div>
  );
};

export default WhyChooseCard;
