import check from "../OrderComplete/Images/Vector.png"

export default function OrderSuccess() {
  return (
    <div className="flex flex-1 items-center justify-center relative pt-34 z-10 px-4">
      
      <div className="flex flex-col items-center text-center">
        
        {/* Circle with image check */}
        <div className="w-[200px] h-[200px] md:w-36 md:h-36 rounded-full bg-[#7422FF] flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.4)]">
          
          
          <img
            src={check}
            alt="Success"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />

        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl md:text-3xl font-semibold">
          Order Complete
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-300 text-sm md:text-base">
          You Will Receive a confirmation email soon!
        </p>

      </div>

    </div>
  );
}