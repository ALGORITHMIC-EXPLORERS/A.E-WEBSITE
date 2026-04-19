export default function OrderSummary() {
  return (
    <div className="w-[300px] ml-auto flex-shrink-0">
      <h3 className="mb-4 font-semibold">Order Details</h3>

      <div className="border border-white rounded-lg p-5 bg-[#190538]">

        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-400">Price</span>
          <span>$300.00</span>
        </div>

        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-400">Discount</span>
          <span>- $10.00</span>
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <span className="text-gray-400">Tax</span>
          <span>$20.00</span>
        </div>

        <div className="flex justify-between border-t border-purple-800 pt-3 font-semibold">
          <span>Total</span>
          <span>$290.00</span>
        </div>

      </div>

      <button className="cursor-pointer w-full mt-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition">
        Proceed to Checkout
      </button>
    </div>
  );
}