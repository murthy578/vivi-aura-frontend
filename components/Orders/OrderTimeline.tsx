"use client";

interface Props {
  status: string;
}

export default function OrderTimeline({ status }: Props) {
  const steps = [
    "Processing",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  const currentIndex = steps.indexOf(status);

  return (
    <div className="bg-[#111] rounded-3xl p-8 mt-10">

      <h2 className="text-2xl font-bold text-white mb-8">
        Order Tracking
      </h2>

      <div className="space-y-8">

        {steps.map((step, index) => {
          const completed = index <= currentIndex;

          return (
            <div
              key={step}
              className="flex items-center gap-5"
            >
              {/* Circle */}

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              {/* Text */}

              <div>

                <h3
                  className={`font-semibold text-lg ${
                    completed
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </h3>

                <p className="text-gray-500 text-sm">
                  {completed
                    ? "Completed"
                    : "Waiting..."}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}