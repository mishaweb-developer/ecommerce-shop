import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
export default function OrderConfirmationPage() {
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Order Confirmation" }]} />
      <div className="mx-auto max-w-2xl rounded-[10px] bg-surface p-8 text-center md:p-12">
        <CircleCheck size={48} className="mx-auto text-green-700" />
        <h1 className="display-text mt-5">Order confirmed</h1>
        <p className="body-large mt-5 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/my-orders">
            <Button>My Orders</Button>
          </Link>
          <Link to="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
