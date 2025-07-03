// import Image from "next/image";

const Access = () => {
  return (
    <div className="py-[5rem] mx-12">
      <div className="space-y-2 text-center ">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Easy-Peasy Access
        </h1>
      </div>

      <div className="overflow-x-auto md:overflow-x-hidden w-full slim-scrollbar">
        <div className="min-w-[1600px] md:min-w-full">
          <svg
            width="100%"
            height="320"
            viewBox="0 0 1600 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 150 Q 200 220, 400 150 T 800 150 T 1200 150 T 1600 150"
              stroke="#006400"
              strokeWidth="8"
              fill="none"
            />

            <line
              x1="200"
              y1="150"
              x2="200"
              y2="230"
              stroke="#006400"
              strokeWidth="8"
            />
            <text
              x="200"
              y="260"
              fontSize="18"
              fill="#006400"
              textAnchor="middle"
              fontFamily="Comic Sans MS"
            >
              Looking
              <tspan x="200" dy="20">
                for an artisan?
              </tspan>
            </text>

            <line
              x1="500"
              y1="150"
              x2="500"
              y2="230"
              stroke="#006400"
              strokeWidth="8"
            />
            <text
              x="500"
              y="260"
              fontSize="18"
              fill="#006400"
              textAnchor="middle"
              fontFamily="Comic Sans MS"
            >
              Search
              <tspan x="500" dy="20">
                for the service
              </tspan>
              <tspan x="500" dy="20">
                you need
              </tspan>
            </text>

            <line
              x1="800"
              y1="150"
              x2="800"
              y2="230"
              stroke="#006400"
              strokeWidth="8"
            />
            <text
              x="800"
              y="260"
              fontSize="18"
              fill="#006400"
              textAnchor="middle"
              fontFamily="Comic Sans MS"
            >
              Browse different
              <tspan x="800" dy="20">
                artisans and their work
              </tspan>
            </text>

            <line
              x1="1100"
              y1="150"
              x2="1100"
              y2="230"
              stroke="#006400"
              strokeWidth="8"
            />
            <text
              x="1100"
              y="260"
              fontSize="18"
              fill="#006400"
              textAnchor="middle"
              fontFamily="Comic Sans MS"
            >
              Pick your preferred
              <tspan x="1100" dy="20">
                professional
              </tspan>
            </text>

            <line
              x1="1400"
              y1="150"
              x2="1400"
              y2="230"
              stroke="#006400"
              strokeWidth="8"
            />
            <text
              x="1400"
              y="260"
              fontSize="18"
              fill="#006400"
              textAnchor="middle"
              fontFamily="Comic Sans MS"
            >
              Message,
              <tspan x="1400" dy="20">
                negotiate,
              </tspan>
              <tspan x="1400" dy="20">
                and begin
              </tspan>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Access;
