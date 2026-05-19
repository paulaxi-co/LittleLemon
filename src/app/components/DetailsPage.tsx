import { useState } from "react";
import type { BookingDetails } from "./ReservationPage";

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface DetailsPageProps {
  booking: BookingDetails;
  userDetails: UserDetails;
  onUserDetailsChange: (details: UserDetails) => void;
  onBack: () => void;
  onConfirm: () => void;
}

function StepIndicator() {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1">
      {/* Step 1 - done */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#495e57] flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 13 13">
            <path d="M2.5 6.5L5 9L10.5 3.5" stroke="#fafaf9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.625" />
          </svg>
        </div>
        <span className="font-['Karla'] text-[#495e57] text-sm whitespace-nowrap">Booking details</span>
      </div>
      <div className="h-0.5 w-8 rounded-full bg-[#495e57] shrink-0" />

      {/* Step 2 - active */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-[35px] h-[35px] rounded-full bg-[#f4ce14] flex items-center justify-center shrink-0">
          <span className="font-['Karla'] font-bold text-[#333] text-sm">2</span>
        </div>
        <span className="font-['Karla'] font-bold text-[#333] text-sm whitespace-nowrap">Your details</span>
      </div>
      <div className="h-0.5 w-8 rounded-full bg-[#e5e7eb] shrink-0" />

      {/* Step 3 - pending */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center shrink-0">
          <span className="font-['Karla'] font-bold text-[#9ca3af] text-sm">3</span>
        </div>
        <span className="font-['Karla'] text-[#9ca3af] text-sm whitespace-nowrap">Confirmation</span>
      </div>
    </div>
  );
}

function ReservationSummary({ booking }: { booking: BookingDetails }) {
  const formatDate = () => {
    if (!booking.date) return "";
    return booking.date.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] p-5 mb-6">
      <p className="font-['Karla'] font-bold text-[#9ca3af] text-xs uppercase tracking-widest mb-4">
        Your reservation so far
      </p>
      <div className="flex flex-wrap gap-3">
        {/* Date badge */}
        <div className="bg-[rgba(73,94,87,0.07)] rounded-2xl px-4 py-4 flex items-center gap-3 flex-1 min-w-[160px]">
          <div className="bg-[rgba(73,94,87,0.12)] w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
              <path d="M5 1.25V3.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M10 1.25V3.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <rect x="1.875" y="2.5" width="11.25" height="11.25" rx="1.667" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M1.875 6.25H13.125" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            </svg>
          </div>
          <div>
            <p className="font-['Karla'] font-semibold text-[#9ca3af] text-xs">Date</p>
            <p className="font-['Karla'] font-bold text-[#333] text-sm leading-tight">{formatDate()}</p>
          </div>
        </div>

        {/* Time badge */}
        <div className="bg-[rgba(73,94,87,0.07)] rounded-2xl px-4 py-4 flex items-center gap-3 min-w-[120px]">
          <div className="bg-[rgba(73,94,87,0.12)] w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
              <circle cx="7.5" cy="7.5" r="6.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M7.5 3.75V7.5L10 8.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            </svg>
          </div>
          <div>
            <p className="font-['Karla'] font-semibold text-[#9ca3af] text-xs">Time</p>
            <p className="font-['Karla'] font-bold text-[#333] text-sm">{booking.time}</p>
          </div>
        </div>

        {/* Guests badge */}
        <div className="bg-[rgba(73,94,87,0.07)] rounded-2xl px-4 py-4 flex items-center gap-3 min-w-[120px]">
          <div className="bg-[rgba(73,94,87,0.12)] w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
              <circle cx="6.25" cy="4.375" r="1.875" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M1.875 13.125C1.875 10.937 3.865 9.375 6.25 9.375S10.625 10.937 10.625 13.125" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M10 3.125C11.035 3.125 11.875 3.965 11.875 5S11.035 6.875 10 6.875" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
              <path d="M13.125 13.125C13.125 11.135 11.875 9.678 10 9.375" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
            </svg>
          </div>
          <div>
            <p className="font-['Karla'] font-semibold text-[#9ca3af] text-xs">Guests</p>
            <p className="font-['Karla'] font-bold text-[#333] text-sm">{booking.guests} guest{booking.guests !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  maxLength?: number;
}

function Field({ label, required, optional, placeholder, value, onChange, type = "text", error, hint, multiline, maxLength }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <span className="font-['Karla'] font-bold text-[#333] text-sm">{label}</span>
        {required && <span className="font-['Karla'] font-bold text-[#ee9972] text-sm">*</span>}
        {optional && <span className="font-['Karla'] text-[#9ca3af] text-xs">(optional)</span>}
      </div>
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={4}
            className={`w-full px-4 py-3.5 rounded-2xl border-2 font-['Karla'] text-base text-[#333] placeholder-[rgba(51,51,51,0.4)] bg-white outline-none transition-colors resize-none ${
              error ? "border-[#ee9972]" : "border-[#e5e7eb] focus:border-[#495e57]"
            }`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-4 py-3.5 rounded-2xl border-2 font-['Karla'] text-base text-[#333] placeholder-[rgba(51,51,51,0.4)] bg-white outline-none transition-colors ${
              error ? "border-[#ee9972]" : "border-[#e5e7eb] focus:border-[#495e57]"
            }`}
          />
        )}
        {multiline && maxLength && (
          <span className="absolute bottom-3 right-3 font-['Karla'] text-xs text-[#c4c4c4]">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {error && <p className="font-['Karla'] text-[#ee9972] text-xs">{error}</p>}
      {hint && !error && <p className="font-['Karla'] text-[#9ca3af] text-xs">{hint}</p>}
    </div>
  );
}

export function DetailsPage({ booking, userDetails, onUserDetailsChange, onBack, onConfirm }: DetailsPageProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});
  const [touched, setTouched] = useState(false);

  const update = (field: keyof UserDetails, value: string) => {
    onUserDetailsChange({ ...userDetails, [field]: value });
    if (touched) validate({ ...userDetails, [field]: value });
  };

  const validate = (data: UserDetails) => {
    const errs: Partial<Record<keyof UserDetails, string>> = {};
    if (!data.firstName.trim()) errs.firstName = "First name is required";
    if (!data.lastName.trim()) errs.lastName = "Last name is required";
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!data.phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirm = () => {
    setTouched(true);
    if (validate(userDetails)) {
      onConfirm();
    }
  };

  const isValid =
    userDetails.firstName.trim() &&
    userDetails.lastName.trim() &&
    userDetails.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email) &&
    userDetails.phone.trim();

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
            Back
          </button>
          <StepIndicator />
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-['Markazi_Text'] font-medium text-[#333] text-[52px] leading-tight mb-1">
            Your details
          </h1>
          <p className="font-['Karla'] text-[#6b7280] text-base">
            Almost there — fill in your information to complete the reservation.
          </p>
        </div>

        {/* Reservation Summary */}
        <ReservationSummary booking={booking} />

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="First name"
              required
              placeholder="e.g. Maria"
              value={userDetails.firstName}
              onChange={(v) => update("firstName", v)}
              error={touched ? errors.firstName : undefined}
            />
            <Field
              label="Last name"
              required
              placeholder="e.g. Rossi"
              value={userDetails.lastName}
              onChange={(v) => update("lastName", v)}
              error={touched ? errors.lastName : undefined}
            />
          </div>

          <Field
            label="Email address"
            required
            type="email"
            placeholder="you@example.com"
            value={userDetails.email}
            onChange={(v) => update("email", v)}
            error={touched ? errors.email : undefined}
            hint="We'll send your confirmation to this address"
          />

          <Field
            label="Phone number"
            required
            type="tel"
            placeholder="+1 (312) 555-0192"
            value={userDetails.phone}
            onChange={(v) => update("phone", v)}
            error={touched ? errors.phone : undefined}
          />

          <Field
            label="Special requests"
            optional
            placeholder="Allergies, dietary needs, occasion, high chair, seating preference…"
            value={userDetails.specialRequests}
            onChange={(v) => update("specialRequests", v)}
            multiline
            maxLength={300}
          />

          {/* Privacy notice */}
          <div className="bg-[rgba(73,94,87,0.05)] border border-[rgba(73,94,87,0.1)] rounded-2xl px-4 py-3 flex items-start gap-3">
            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 14 14">
              <rect x="1.167" y="2.333" width="11.667" height="10.5" rx="1.167" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              <path d="M4.667 6.417L6.417 8.167L9.333 5.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
            <p className="font-['Karla'] text-[#6b7280] text-xs leading-relaxed">
              Your details are used solely to manage your reservation and will never be shared with third parties.
            </p>
          </div>

          {!isValid && touched && (
            <p className="text-center font-['Karla'] text-[#9ca3af] text-sm">
              Fill in all required fields above to continue
            </p>
          )}

          <button
            onClick={handleConfirm}
            className={`w-full h-14 rounded-2xl font-['Karla'] font-bold text-base transition-all flex items-center justify-center gap-2 ${
              isValid
                ? "bg-[#495e57] text-white hover:bg-[#3a4d45] cursor-pointer shadow-[0px_4px_12px_rgba(73,94,87,0.3)]"
                : "bg-[#e5e7eb] text-[#9ca3af] cursor-pointer hover:bg-[#d1d5db]"
            }`}
          >
            Confirm reservation
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
              <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke={isValid ? "white" : "#9ca3af"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
