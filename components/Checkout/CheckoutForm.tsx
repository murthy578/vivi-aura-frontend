"use client";

import { useCheckout } from "@/context/CheckoutContext";

export default function CheckoutForm() {
  const { checkout, setCheckout } = useCheckout();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCheckout((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-white focus:ring-1 focus:ring-white";

  const labelClass =
    "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="bg-[#111] rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-800">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Delivery Address
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Please enter your shipping information.
          </p>

        </div>

      </div>

      {/* Full Name */}

      <div className="mb-6">

        <label className={labelClass}>
          Full Name
        </label>

        <input
          type="text"
          name="fullname"
          value={checkout.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={inputClass}
        />

      </div>

      {/* Mobile & Email */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div>

          <label className={labelClass}>
            Mobile Number
          </label>

          <input
            type="tel"
            name="mobile"
            value={checkout.mobile}
            onChange={handleChange}
            placeholder="9876543210"
            className={inputClass}
          />

        </div>

        <div>

          <label className={labelClass}>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={checkout.email}
            onChange={handleChange}
            placeholder="name@email.com"
            className={inputClass}
          />

        </div>

      </div>

      {/* House */}

      <div className="mb-6">

        <label className={labelClass}>
          House / Flat No.
        </label>

        <input
          type="text"
          name="house"
          value={checkout.house}
          onChange={handleChange}
          placeholder="Flat No / House No"
          className={inputClass}
        />

      </div>

      {/* Street */}

      <div className="mb-6">

        <label className={labelClass}>
          Street Address
        </label>

        <input
          type="text"
          name="street"
          value={checkout.street}
          onChange={handleChange}
          placeholder="Street Name"
          className={inputClass}
        />

      </div>

      {/* Landmark */}

      <div className="mb-6">

        <label className={labelClass}>
          Landmark
        </label>

        <input
          type="text"
          name="landmark"
          value={checkout.landmark}
          onChange={handleChange}
          placeholder="Nearby Landmark (Optional)"
          className={inputClass}
        />

      </div>

      {/* City / State / PIN */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div>

          <label className={labelClass}>
            City
          </label>

          <input
            type="text"
            name="city"
            value={checkout.city}
            onChange={handleChange}
            placeholder="City"
            className={inputClass}
          />

        </div>

        <div>

          <label className={labelClass}>
            State
          </label>

          <input
            type="text"
            name="state"
            value={checkout.state}
            onChange={handleChange}
            placeholder="State"
            className={inputClass}
          />

        </div>

        <div>

          <label className={labelClass}>
            PIN Code
          </label>

          <input
            type="text"
            name="pincode"
            value={checkout.pincode}
            onChange={handleChange}
            placeholder="500001"
            className={inputClass}
          />

        </div>

      </div>

      {/* Address Type */}

      <div>

        <label className={labelClass}>
          Address Type
        </label>

        <select
          name="address_type"
          value={checkout.address_type}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="Home">🏠 Home</option>
          <option value="Office">🏢 Office</option>
        </select>

      </div>

    </div>
  );
}