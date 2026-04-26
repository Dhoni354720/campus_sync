import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, Building, CreditCard, 
  CheckCircle2, Calendar, MapPin, Ticket, 
  ShieldCheck, ArrowRight, ArrowLeft, Users, 
  Tag, Download, CalendarPlus
} from 'lucide-react';

export default function Registration() {
  // Steps: 1 = Details, 2 = Payment, 3 = Success
  const [step, setStep] = useState(1);
  const [regType, setRegType] = useState('individual'); // 'individual' or 'team'
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Mock Event Data for the Summary
  const EVENT = {
    title: "Annual Tech Symposium 2026",
    date: "April 28, 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    price: 499, // Base price in INR/USD equivalent
    teamSize: 4
  };

  const calculateTotal = () => {
    let total = regType === 'team' ? EVENT.price * EVENT.teamSize * 0.8 : EVENT.price; // 20% team discount
    if (discountApplied) total = total - 100; // Flat discount
    return total;
  };

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    if (discountCode.toUpperCase() === 'CAMPUS100') {
      setDiscountApplied(true);
    }
  };

  // --- Step 1: Registration Details View ---
  const DetailsStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Attendee Details</h2>
      
      {/* Registration Type Toggle */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
        <button
          type="button"
          onClick={() => setRegType('individual')}
          className={`flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-lg transition-all ${regType === 'individual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <User className="w-4 h-4 mr-2" /> Individual
        </button>
        <button
          type="button"
          onClick={() => setRegType('team')}
          className={`flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-lg transition-all ${regType === 'team' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Users className="w-4 h-4 mr-2" /> Team (Up to {EVENT.teamSize})
        </button>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
        
        {regType === 'team' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Team Name</label>
            <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. Byte Bandits" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{regType === 'team' ? 'Team Leader Name' : 'Full Name'}</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input type="text" required className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" defaultValue="John Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">College ID / Roll No</label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input type="text" required className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" defaultValue="CS22B104" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input type="email" required className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" defaultValue="john.doe@college.edu" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input type="tel" required className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" defaultValue="+1 (555) 000-1234" />
            </div>
          </div>
        </div>

        {regType === 'team' && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Team Members</h3>
            {[1, 2, 3].map((num) => (
              <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" required placeholder={`Member ${num} Name`} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm" />
                <input type="text" required placeholder={`Member ${num} Email`} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm" />
              </div>
            ))}
          </div>
        )}

        <div className="pt-6">
          <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md flex items-center justify-center">
            Continue to Payment <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </form>
    </div>
  );

  // --- Step 2: Payment View ---
  const PaymentStep = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <button onClick={() => setStep(1)} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Details
      </button>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>

      {/* Payment Options */}
      <div className="space-y-4 mb-8">
        <label className="flex items-center justify-between p-4 border-2 border-indigo-600 rounded-xl bg-indigo-50 cursor-pointer">
          <div className="flex items-center">
            <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-600" />
            <span className="ml-3 font-bold text-indigo-900">Credit / Debit Card</span>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
            <div className="w-8 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
          </div>
        </label>
        
        <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-slate-300 cursor-pointer transition">
          <div className="flex items-center">
            <input type="radio" name="payment" className="w-4 h-4 text-indigo-600 focus:ring-indigo-600" />
            <span className="ml-3 font-semibold text-slate-700">UPI / QR Code</span>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
        </label>
      </div>

      {/* Mock Card Form */}
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input type="text" required className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="0000 0000 0000 0000" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
            <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="MM/YY" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
            <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="123" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name on Card</label>
          <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="John Doe" />
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg flex items-center justify-center text-lg">
            Pay ₹{calculateTotal()} securely
          </button>
          <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-slate-400" /> Payments are secured and encrypted
          </p>
        </div>
      </form>
    </div>
  );

  // --- Step 3: Success / Confirmation View ---
  const SuccessStep = () => (
    <div className="animate-in zoom-in-95 duration-500 text-center py-8">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </div>
      
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Registration Confirmed!</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        Your payment was successful. We've sent the ticket and QR code to your college email.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left relative overflow-hidden">
        {/* Ticket cutouts pattern */}
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full -translate-y-1/2 border-r border-slate-200"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full -translate-y-1/2 border-l border-slate-200"></div>
        <div className="border-b-2 border-dashed border-slate-300 pb-4 mb-4">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Admit {regType === 'team' ? EVENT.teamSize : '1'}</p>
          <h3 className="text-xl font-bold text-slate-900">{EVENT.title}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500">Date</p>
            <p className="font-semibold text-slate-900">{EVENT.date}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Time</p>
            <p className="font-semibold text-slate-900">{EVENT.time}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-slate-500">Venue</p>
            <p className="font-semibold text-slate-900">{EVENT.venue}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm flex items-center justify-center">
          <Download className="w-5 h-5 mr-2 text-slate-400" /> Download Ticket
        </button>
        <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm flex items-center justify-center">
          <CalendarPlus className="w-5 h-5 mr-2 text-indigo-500" /> Add to Calendar
        </button>
      </div>

      <div className="mt-12">
        <Link to="/dashboard" className="text-indigo-600 font-bold hover:underline">
          Go to My Dashboard
        </Link>
      </div>
    </div>
  );

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        {/* Simple Navbar */}
        <nav className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Ticket className="h-6 w-6 text-indigo-600 mr-2" />
                <span className="text-lg font-bold text-slate-900">Secure Checkout</span>
              </Link>
              <Link to="/events" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
                Cancel
              </Link>
            </div>
          </div>
        </nav>

        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
          {/* Progress Steps (Hide on success step) */}
          {step < 3 && (
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-500" style={{ width: step === 2 ? '100%' : '0%' }}></div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>1</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>2</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}><CheckCircle2 className="w-5 h-5" /></div>
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-xs font-semibold text-indigo-600">Details</span>
                <span className={`text-xs font-semibold ${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>Payment</span>
                <span className="text-xs font-semibold text-slate-400">Confirmation</span>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
            
            {/* Left Side - Forms */}
            <div className={`w-full ${step === 3 ? 'lg:w-full' : 'lg:w-3/5'} bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10`}>
              {step === 1 && <DetailsStep />}
              {step === 2 && <PaymentStep />}
              {step === 3 && <SuccessStep />}
            </div>

            {/* Right Side - Order Summary (Hide on success step) */}
            {step < 3 && (
              <div className="w-full lg:w-2/5">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>
                  
                  <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=200" alt="event" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-2 leading-tight mb-1">{EVENT.title}</h4>
                      <div className="text-xs text-slate-500 flex items-center mb-1"><Calendar className="w-3 h-3 mr-1" /> {EVENT.date}</div>
                      <div className="text-xs text-slate-500 flex items-center"><MapPin className="w-3 h-3 mr-1" /> {EVENT.venue}</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-slate-600 mb-6">
                    <div className="flex justify-between">
                      <span>Ticket Price</span>
                      <span>₹{EVENT.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Registration Type</span>
                      <span className="capitalize font-medium text-slate-900">{regType}</span>
                    </div>
                    {regType === 'team' && (
                      <>
                        <div className="flex justify-between">
                          <span>Team Size</span>
                          <span>x {EVENT.teamSize}</span>
                        </div>
                        <div className="flex justify-between text-emerald-600">
                          <span>Group Discount (20%)</span>
                          <span>- ₹{(EVENT.price * EVENT.teamSize * 0.2).toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    {discountApplied && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Promo Code Applied</span>
                        <span>- ₹100.00</span>
                      </div>
                    )}
                  </div>

                  {/* Discount Code Input */}
                  {!discountApplied && (
                    <form onSubmit={handleApplyDiscount} className="flex gap-2 mb-6">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Promo code (Try 'CAMPUS100')" 
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-600 text-sm uppercase"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition">
                        Apply
                      </button>
                    </form>
                  )}

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total Amount</span>
                    <span className="text-2xl font-extrabold text-indigo-600">₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    
  );
}