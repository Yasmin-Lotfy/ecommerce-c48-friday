"use server";
import { getOutToken } from "@/lib/auth";
import { CheckoutSchemaType } from "@/lib/schema/checkout.schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function onlinePayment(
  cartId: string,
  fromData: CheckoutSchemaType,
) {
  const token = await getOutToken();
  if (!token) {
    return {
      status: "unauthenticated",
      message: "Please login to add to cart",
    };
  }

  const response = await fetch(
    `${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",

      body: JSON.stringify({ fromData }),

      headers: {
        token: token,
        "content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function cashPayment(
  cartId: string,
  fromData: CheckoutSchemaType,
) {
  const token = await getOutToken();
  if (!token) {
    return {
      status: "unauthenticated",
      message: "Please login to add to cart",
    };
  }

  const response = await fetch(
    `${baseUrl}/api/v2/orders/${cartId}`,
    {
      method: "POST",

      body: JSON.stringify({ fromData }),

      headers: {
        token: token,
        "content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

