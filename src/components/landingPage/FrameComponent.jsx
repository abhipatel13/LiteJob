const FrameComponent = () => {
  return (
    <div className="w-[828px] flex flex-row items-start justify-between gap-[20px] max-w-full mq450:flex-wrap">
      <div className="w-[69px] flex flex-col items-center justify-start gap-[22px]">
        <img
          className="w-[67px] h-[67px] relative object-cover z-[1]"
          loading="eager"
          alt=""
          src="/vector-28@2x.png"
        />
        <img
          className="self-stretch h-[13.5px] relative max-w-full overflow-hidden shrink-0 z-[1]"
          loading="eager"
          alt=""
          src="/vector-29.svg"
        />
      </div>
      <div className="w-[78px] flex flex-col items-center justify-start gap-[22px]">
        <div className="flex flex-row items-start justify-start py-0 pr-[7px] pl-1">
          <img
            className="h-[67px] w-[67px] relative object-cover z-[1]"
            loading="eager"
            alt=""
            src="/vector-30@2x.png"
          />
        </div>
        <img
          className="self-stretch h-[13.5px] relative max-w-full overflow-hidden shrink-0 z-[1]"
          loading="eager"
          alt=""
          src="/vector-31.svg"
        />
      </div>
      <div className="flex flex-col items-start justify-start pt-[30px] px-0 pb-0">
        <div className="flex flex-col items-center justify-start gap-[22px]">
          <img
            className="w-[67px] h-[67px] relative object-cover z-[1]"
            loading="eager"
            alt=""
            src="/vector-32@2x.png"
          />
          <img
            className="w-[58.6px] h-[13.3px] relative z-[1]"
            loading="eager"
            alt=""
            src="/vector-33.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
