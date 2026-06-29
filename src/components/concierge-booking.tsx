import React, { useState } from 'react';
import { X, ChevronRight, Calendar, Clock, MapPin, CheckCircle, MessageCircle, Phone } from 'lucide-react';

interface ConciergeBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeBooking: React.FC<ConciergeBookingProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    sanctuary: '',
    sanctuaryId: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  if (!isOpen) return null;

  const houses = [
    { id: 'h1', name: 'House I', location: 'Sector 4, Gurugram', phone: '+91 95828 06555', whatsapp: '919582806555' },
    { id: 'h2', name: 'House II', location: 'Sector 9A, Gurugram', phone: '+91 99109 95230', whatsapp: '919910995230' },
    { id: 'h3', name: 'House III', location: 'Sector 15 Part 2, Gurugram', phone: '+91 93550 00102', whatsapp: '919355000102' },
    { id: 'h4', name: 'House IV', location: 'Sector 49, Gurugram', phone: '+91 97189 59090', whatsapp: '919718959090' },
    { id: 'h5', name: 'House V', location: 'New Colony, Gurugram', phone: '+91 93550 00101', whatsapp: '919355000101' },
    { id: 'h6', name: 'House VI', location: 'Complex Hisar', phone: '+91 99966 30605', whatsapp: '919996630605' }
  ];

  const timeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

  const handleSelectSanctuary = (sanctuary: string, sanctuaryId: string) => {
    setBookingData({ ...bookingData, sanctuary, sanctuaryId });
    setStep(2);
  };

  const handleSelectDateTime = (date: string, time: string) => {
    setBookingData({ ...bookingData, date, time });
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const resetConcierge = () => {
    setBookingData({ sanctuary: '', sanctuaryId: '', date: '', time: '', name: '', email: '', phone: '' });
    setStep(1);
    onClose();
  };

  const getSelectedHouse = () => houses.find(h => h.id === bookingData.sanctuaryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]/90 backdrop-blur-xl">
      <div className="relative w-full h-full max-w-4xl md:h-[85vh] bg-[#070707] border border-amber-500/10 overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header Block */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-900">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 block mb-1">Digital Concierge</span>
            <h2 className="font-serif text-xl tracking-wider text-white">RESERVE YOUR EXPERIENCE</h2>
          </div>
          <button onClick={resetConcierge} className="p-2 text-zinc-400 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Clean 3-Step Navigation Tracker */}
        <div className="flex bg-[#040404] border-b border-zinc-900 px-6 py-3 text-[11px] tracking-widest uppercase text-zinc-500">
          <span className={step === 1 ? 'text-amber-500' : ''}>01 Sanctuary</span>
          <ChevronRight size={14} className="mx-2 text-zinc-700" />
          <span className={step === 2 ? 'text-amber-500' : ''}>02 Schedule</span>
          <ChevronRight size={14} className="mx-2 text-zinc-700" />
          <span className={step === 3 ? 'text-amber-500' : ''}>03 Profile</span>
        </div>

        {/* Dynamic Interactive Window */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col justify-center">
          
          {/* Step 1: Sanctuary Filter */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h3 className="font-serif text-2xl text-white mb-6 text-center tracking-wide">Select Your Sanctuary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {houses.map((house) => (
                  <button
                    key={house.id}
                    type="button"
                    onClick={() => handleSelectSanctuary(`${house.name} — ${house.location}`, house.id)}
                    className="group flex items-start gap-4 p-5 bg-[#0a0a0a] border border-zinc-900 hover:border-amber-500/30 transition-all text-left"
                  >
                    <div className="p-2 bg-zinc-900 border border-zinc-800 text-amber-500">
                      <MapPin size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm tracking-wider group-hover:text-amber-400">{house.name}</h4>
                      <p className="text-zinc-400 text-xs mt-1">{house.location}</p>
                      <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
                        <Phone size={10} /> {house.phone}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Calendar Mapping */}
          {step === 2 && (
            <div className="animate-fadeIn max-w-xl mx-auto w-full">
              <h3 className="font-serif text-2xl text-white mb-6 text-center tracking-wide">Select Appointment Space</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Calendar size={14} className="text-amber-500" /> Choose Date
                  </label>
                  <input 
                    type="date" 
                    id="conciergeDate"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#0a0a0a] border border-zinc-900 text-white text-sm p-3 focus:outline-none focus:border-amber-500/40 tracking-widest"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-amber-500" /> Available Hours
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          const dateEl = document.getElementById('conciergeDate') as HTMLInputElement;
                          if (dateEl && dateEl.value) {
                            handleSelectDateTime(dateEl.value, slot);
                          } else {
                            alert('Please finalize your preferred calendar date first.');
                          }
                        }}
                        className="p-3 bg-[#0a0a0a] border border-zinc-900 hover:border-amber-500/30 text-xs text-zinc-300 hover:text-amber-400 text-center transition-all"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Identity Registry */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-fadeIn max-w-md mx-auto w-full space-y-5">
              <h3 className="font-serif text-2xl text-white mb-2 text-center tracking-wide">Guest Registration</h3>
              <p className="text-center text-zinc-500 text-xs uppercase tracking-widest mb-4">Confirming details for your experience</p>
              <div className="space-y-4">
                <input 
                  type="text" 
                  required 
                  placeholder="FULL NAME"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-zinc-900 text-white text-xs p-4 focus:outline-none focus:border-amber-500/40 tracking-widest uppercase placeholder:text-zinc-600"
                />
                <input 
                  type="email" 
                  required 
                  placeholder="EMAIL ADDRESS"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-zinc-900 text-white text-xs p-4 focus:outline-none focus:border-amber-500/40 tracking-widest uppercase placeholder:text-zinc-600"
                />
                <input 
                  type="tel" 
                  required 
                  placeholder="CONTACT NUMBER"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-zinc-900 text-white text-xs p-4 focus:outline-none focus:border-amber-500/40 tracking-widest uppercase placeholder:text-zinc-600"
                />
              </div>
              <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-medium tracking-[0.2em] text-xs uppercase transition-colors mt-2">
                FINALISE SYSTEM RESERVATION
              </button>
            </form>
          )}

          {/* Step 4: Final Confirmation */}
          {step === 4 && (
            <div className="animate-fadeIn text-center space-y-6 max-w-md mx-auto">
              <div className="inline-flex p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full mb-2">
                <CheckCircle size={40} />
              </div>
              <h3 className="font-serif text-3xl text-white tracking-wide">Reservation Secured</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Your luxury session slot has been provisionally locked. Send the direct system alert to confirm availability.
              </p>

              <div className="p-4 bg-[#0a0a0a] border border-zinc-900 text-left text-xs space-y-2 font-mono text-zinc-400">
                <p><span className="text-zinc-600">SANCTUARY:</span> {bookingData.sanctuary}</p>
                <p><span className="text-zinc-600">TIMING:</span> {bookingData.date} @ {bookingData.time}</p>
                <p><span className="text-zinc-600">GUEST:</span> {bookingData.name}</p>
                <p><span className="text-zinc-600">CONTACT:</span> {bookingData.phone}</p>
              </div>

              {/* LIVE WHATSAPP TRIGGER */}
              <button
                type="button"
                onClick={() => {
                  const selectedHouse = getSelectedHouse();
                  if (selectedHouse) {
                    const message = encodeURIComponent(
                      `*NEW CONCIERGE BOOKING*\n\n` +
                      `*Sanctuary:* ${bookingData.sanctuary}\n` +
                      `*Timing:* ${bookingData.date} @ ${bookingData.time}\n` +
                      `*Guest:* ${bookingData.name}\n` +
                      `*Contact:* ${bookingData.phone}\n\n` +
                      `Please confirm this reservation.`
                    );
                    window.open(`https://wa.me/${selectedHouse.whatsapp}?text=${message}`, '_blank');
                  }
                }}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-medium tracking-[0.15em] text-xs uppercase transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle size={16} />
                Confirm via WhatsApp
              </button>

              <button
                type="button"
                onClick={resetConcierge}
                className="w-full py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs uppercase tracking-widest transition-all block"
              >
                Return to Showcase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};