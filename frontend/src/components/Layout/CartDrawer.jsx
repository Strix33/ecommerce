import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {
  const navigate = useNavigate();    
  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <>
      {drawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[60] transition-opacity" onClick={toggleCartDrawer} />
      )}
      <div className={`fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col z-[65] ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h2 className="text-sm font-black uppercase font-heading tracking-wider text-slate-950">Shopping Cart</h2>
              <button onClick={toggleCartDrawer} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition-colors">
                  <IoMdClose className="h-5 w-5"/>
              </button>
          </div>
          
          <div className="flex-grow p-5 overflow-y-auto">
              <CartContents/>
          </div>
          
          <div className="p-5 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={handleCheckout} 
                className="w-full bg-slate-950 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs"
              >
                PROCEED TO CHECKOUT
              </button>
              <p className="text-[11px] text-slate-500 mt-2.5 text-center font-medium">Taxes & shipping calculated at checkout.</p>
          </div>
      </div>
    </>
  )
}

export default CartDrawer

