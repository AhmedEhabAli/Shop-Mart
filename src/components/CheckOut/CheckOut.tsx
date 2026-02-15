"use client";
import { cashOrderAction, checkOutAction } from "@/action/addtoCart.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShippingAddress } from "@/interfaces/CartInterface";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
export default function CheckOut({ cartId }: { cartId: string }) {
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">(
    "online",
  );
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const city = useRef<null | HTMLInputElement>(null);
  const details = useRef<null | HTMLInputElement>(null);
  const phone = useRef<null | HTMLInputElement>(null);

  async function checkout() {
    setIsLoading(true);
    const shippingAddress: ShippingAddress = {
      city: city.current?.value as string,
      details: details.current?.value as string,
      phone: phone.current?.value as string,
    };
    const res = await checkOutAction(cartId, shippingAddress);
    if (res.status == "success") {
      location.href = res.session.url;
    }
    setIsLoading(false);
  }

  async function checkoutCash() {
    setIsLoading(true);
    const shippingAddress: ShippingAddress = {
      city: city.current?.value as string,
      details: details.current?.value as string,
      phone: phone.current?.value as string,
    };
    const res = await cashOrderAction(cartId, shippingAddress);
    console.log(res);

    if (res.status === "success") {
      toast.success("Order placed successfully");
      setOpen(false);
      dispatchEvent(new CustomEvent("cartUpdate", { detail: 0 }));
      router.push("/allorders");
    }
    setIsLoading(false);
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Enter Your Shipping Address</DialogTitle>
            <DialogDescription>
              Kindly provide your shipping details so we can deliver your order.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button
              variant={paymentMethod === "cash" ? "default" : "outline"}
              onClick={() => setPaymentMethod("cash")}
              type="button"
            >
              Cash on Delivery
            </Button>

            <Button
              variant={paymentMethod === "online" ? "default" : "outline"}
              onClick={() => setPaymentMethod("online")}
              type="button"
            >
              Pay Online
            </Button>
          </div>

          <FieldGroup>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input
                required
                id="city"
                name="city"
                placeholder="Enter your city"
                ref={city}
              />
            </Field>
            <Field>
              <Label htmlFor="details">Address Details</Label>
              <Input
                required
                id="details"
                name="details"
                placeholder="Street, building, etc."
                ref={details}
              />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                required
                id="phone"
                name="phone"
                placeholder="e.g., +20 123 456 7890"
                ref={phone}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={paymentMethod === "online" ? checkout : checkoutCash}
              type="button"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {paymentMethod === "online"
                ? "Proceed to Payment"
                : "Place Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
