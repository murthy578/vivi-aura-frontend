"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface CheckoutData {
  fullname: string;
  mobile: string;
  email: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  address_type: string;
  payment_method: string;
}

interface CheckoutContextType {
  checkout: CheckoutData;
  setCheckout: React.Dispatch<
    React.SetStateAction<CheckoutData>
  >;
}

const CheckoutContext =
  createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [checkout, setCheckout] = useState<CheckoutData>({
    fullname: "",
    mobile: "",
    email: "",
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    address_type: "Home",
    payment_method: "COD",
  });

  return (
    <CheckoutContext.Provider
      value={{
        checkout,
        setCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      "useCheckout must be used inside CheckoutProvider"
    );
  }

  return context;
}