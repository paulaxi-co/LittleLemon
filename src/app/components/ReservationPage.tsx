import { useState } from "react";

export interface BookingDetails {
  date: Date | null;
  time: string | null;
  guests: number;
}

interface ReservationPageProps {
  booking: BookingDetails;
  onBookingChange: (booking: BookingDetails) => void;
  onBack: () => void;
  onContinue: () => void;
}

const TIME_SLOTS = [
  "12:00 PM", "1:00 PM", "2:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { num: 1, label: "Booking details" },
    { num: 2, label: "Your details" },
    { num: 3, label: "Confirmation" },
  ];

  return (
    <div className="flex items-center gap-3">
      {steps.map((step, idx) => {
        const done = step.num < currentStep;
        const active = step.num === currentStep;
        return (
          <div key={step.num} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full flex items-center justify-center shrink-0 ${
                  done
                    ? "w-8 h-8 bg-[#495e57]"
                    : active
                    ? "w-[35px] h-[35px] bg-[#f4ce14]"
                    : "w-8 h-8 bg-[#e5e7eb]"
                }`}
              >
                {done ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 13 13">
                    <path d="M2.5 6.5L5 9L10.5 3.5" stroke="#fafaf9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.625" />
                  </svg>
                ) : (
                  <span
                    className={`font-['Karla'] font-bold text-sm ${
                      active ? "text-[#333]" : "text-[#9ca3af]"
                    }`}
                  >
                    {step.num}
                  </span>
                )}
              </div>
              <span
                className={`font-['Karla'] text-sm whitespace-nowrap ${
                  active || done ? "font-bold text-[#333]" : "font-normal text-[#9ca3af]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 w-8 rounded-full shrink-0 ${done ? "bg-[#495e57]" : "bg-[#e5e7eb]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ReservationPage({ booking, onBookingChange, onBack, onContinue }: ReservationPageProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(
    booking.date ? booking.date.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    booking.date ? booking.date.getMonth() : today.getMonth()
  );

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const selectDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < today) return;
    onBookingChange({ ...booking, date: d });
  };

  const isSelected = (day: number) => {
    if (!booking.date) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === booking.date.toDateString();
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today;
  };

  const isToday = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === today.toDateString();
  };

  const canContinue = booking.date !== null && booking.time !== null;

  const formatSelectedDate = () => {
    if (!booking.date) return null;
    return booking.date.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-16">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back + Step Indicator */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#495e57] font-['Karla'] font-semibold text-sm mb-6 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8L10 4" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
            Back to home
          </button>
          <div className="overflow-x-auto pb-2">
            <StepIndicator currentStep={1} />
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-['Markazi_Text'] font-medium text-[#333] text-[52px] leading-tight mb-1">
            Reserve a table
          </h1>
          <p className="font-['Karla'] text-[#6b7280] text-base">
            Choose your preferred date, time, and party size
          </p>
        </div>

        {/* Date Selection Card */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[rgba(73,94,87,0.1)] w-10 h-10 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                <path d="M6 1.5V4.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M12 1.5V4.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M2.25 7.5H15.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <rect x="2.25" y="3" width="13.5" height="13.5" rx="2" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p className="font-['Karla'] font-bold text-[#9ca3af] text-xs uppercase tracking-widest">Step 1 of 3</p>
              <h2 className="font-['Markazi_Text'] font-semibold text-[#333] text-2xl leading-tight">Select a date</h2>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(73,94,87,0.08)] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M10 12L6 8L10 4" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </button>
            <span className="font-['Markazi_Text'] font-semibold text-[#333] text-xl">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(73,94,87,0.08)] transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M6 12L10 8L6 4" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="flex items-center justify-center h-6">
                <span className="font-['Karla'] font-semibold text-[#9ca3af] text-xs text-center">{d}</span>
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const selected = isSelected(day);
              const tod = isToday(day);
              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  disabled={past}
                  className={`h-12 rounded-2xl flex items-center justify-center font-['Karla'] text-sm transition-all cursor-pointer disabled:cursor-default ${
                    selected
                      ? "bg-[#495e57] text-white font-bold"
                      : past
                      ? "text-[#d1d5db] cursor-not-allowed"
                      : tod
                      ? "bg-[rgba(73,94,87,0.1)] text-[#495e57] font-bold hover:bg-[rgba(73,94,87,0.18)]"
                      : "text-[#4a5568] hover:bg-[rgba(73,94,87,0.08)] hover:text-[#495e57]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection Card */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[rgba(73,94,87,0.1)] w-10 h-10 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="7.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M9 4.5V9L12 10.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p className="font-['Karla'] font-bold text-[#9ca3af] text-xs uppercase tracking-widest">Step 2 of 3</p>
              <h2 className="font-['Markazi_Text'] font-semibold text-[#333] text-2xl leading-tight">Choose your time</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIME_SLOTS.map((time) => {
              const selected = booking.time === time;
              return (
                <button
                  key={time}
                  onClick={() => onBookingChange({ ...booking, time })}
                  className={`h-12 rounded-2xl border-2 font-['Karla'] font-medium text-sm transition-all cursor-pointer ${
                    selected
                      ? "border-[#495e57] bg-[rgba(73,94,87,0.08)] text-[#495e57] font-bold"
                      : "border-[#e5e7eb] text-[#4a5568] hover:border-[#495e57] hover:text-[#495e57]"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guests Card */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[rgba(73,94,87,0.1)] w-10 h-10 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                <circle cx="7.5" cy="5.25" r="2.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M2.25 15.75C2.25 13.125 4.637 11.25 7.5 11.25S12.75 13.125 12.75 15.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M12 3.75C13.243 3.75 14.25 4.757 14.25 6S13.243 8.25 12 8.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M15.75 15.75C15.75 13.362 14.25 11.613 12 11.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <p className="font-['Karla'] font-bold text-[#9ca3af] text-xs uppercase tracking-widest">Step 3 of 3</p>
              <h2 className="font-['Markazi_Text'] font-semibold text-[#333] text-2xl leading-tight">Number of guests</h2>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Karla'] font-semibold text-[#4a5568] text-base">How many guests?</p>
              <p className="font-['Karla'] text-[#9ca3af] text-sm mt-0.5">Maximum 20 guests per booking</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onBookingChange({ ...booking, guests: Math.max(1, booking.guests - 1) })}
                className="w-11 h-11 rounded-2xl border-2 border-[#495e57] flex items-center justify-center text-[#495e57] font-bold text-xl hover:bg-[rgba(73,94,87,0.08)] transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="font-['Markazi_Text'] font-semibold text-[#333] text-3xl w-8 text-center">
                {booking.guests}
              </span>
              <button
                onClick={() => onBookingChange({ ...booking, guests: Math.min(20, booking.guests + 1) })}
                className="w-11 h-11 rounded-2xl border-2 border-[#495e57] flex items-center justify-center text-[#495e57] font-bold text-xl hover:bg-[rgba(73,94,87,0.08)] transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-1 mt-5">
            {Array.from({ length: booking.guests }).map((_, i) => (
              <span key={i} className="text-xl">🧑</span>
            ))}
          </div>
        </div>

        {/* Continue Section */}
        {!canContinue && (
          <p className="text-center font-['Karla'] text-[#9ca3af] text-sm mb-4">
            👆 Select a date and time to continue
          </p>
        )}
        {canContinue && (
          <p className="text-center font-['Karla'] text-[#495e57] text-sm mb-4">
            ✓ {formatSelectedDate()} at {booking.time} for {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
          </p>
        )}
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`w-full h-14 rounded-2xl font-['Karla'] font-bold text-base transition-all flex items-center justify-center gap-2 ${
            canContinue
              ? "bg-[#495e57] text-white hover:bg-[#3a4d45] cursor-pointer shadow-[0px_4px_12px_rgba(73,94,87,0.3)]"
              : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
          }`}
        >
          Continue
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
            <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke={canContinue ? "white" : "#9ca3af"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
