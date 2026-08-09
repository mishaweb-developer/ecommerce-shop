import { Image as ImageIcon, Trash2 } from "lucide-react";
import QuantityControl from "../ui/QuantityControl";
export default function CartContent({
  items = [],
  editable = true,
  onIncrease = () => {},
  onDecrease = () => {},
  onRemove = () => {},
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (!items.length)
    return (
      <div className="rounded-[10px] bg-surface p-10 text-center">
        <h2 className="title-text">Your cart is empty.</h2>
        <p className="body-small mt-2 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    );
  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={`${item.productId}-${item.size}`}
            className="grid grid-cols-[80px_1fr] gap-4 rounded-[10px] border border-border-subtle p-4 md:grid-cols-[100px_1fr_auto]"
          >
            <div className="flex aspect-[4/5] items-center justify-center rounded bg-surface">
              <ImageIcon className="text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="body-small text-muted-foreground">
                Size: {item.size}
              </p>
              <p className="body-small mt-2">
                €{Number(item.price).toFixed(2)} × {item.quantity}
              </p>
              <p className="mt-2 font-semibold md:hidden">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
              {editable && (
                <div className="mt-3 flex items-center gap-4 md:hidden">
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrease={() => onIncrease(item)}
                    onDecrease={() => onDecrease(item)}
                  />
                  <button
                    onClick={() => onRemove(item)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="hidden text-right md:block">
              <p className="font-semibold">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
              {editable && (
                <div className="mt-5 flex items-center gap-3">
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrease={() => onIncrease(item)}
                    onDecrease={() => onDecrease(item)}
                  />
                  <button
                    onClick={() => onRemove(item)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-end border-t border-border-subtle pt-5">
        <p className="title-text font-bold">Total: €{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
