import type { BookingDetails } from "./ReservationPage";
import type { UserDetails } from "./DetailsPage";

interface ConfirmationPageProps {
  booking: BookingDetails;
  userDetails: UserDetails;
  confirmationNumber: string;
  onBackHome: () => void;
  onNewReservation: () => void;
}

function DetailRow({
  icon,
  label,
  value,
  border = true,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 py-4 ${border ? "border-b border-[#f3f4f6]" : ""}`}>
      <div className="bg-[rgba(73,94,87,0.08)] w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-['Karla'] font-semibold text-[#9ca3af] text-xs">{label}</p>
        <p className="font-['Karla'] font-semibold text-[#333] text-sm">{value}</p>
      </div>
    </div>
  );
}

const CalendarIcon = () => (
  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
    <path d="M5 1.25V3.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M10 1.25V3.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <rect x="1.875" y="2.5" width="11.25" height="11.25" rx="1.667" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M1.875 6.25H13.125" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
    <circle cx="7.5" cy="7.5" r="6.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M7.5 3.75V7.5L10 8.75" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
  </svg>
);

const GuestsIcon = () => (
  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
    <circle cx="6.25" cy="4.375" r="1.875" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M1.875 13.125C1.875 10.937 3.865 9.375 6.25 9.375S10.625 10.937 10.625 13.125" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M10 3.125C11.035 3.125 11.875 3.965 11.875 5S11.035 6.875 10 6.875" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M13.125 13.125C13.125 11.135 11.875 9.678 10 9.375" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
  </svg>
);

const PersonIcon = () => (
  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
    <circle cx="7.5" cy="4.5" r="2.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M2.5 13.5C2.5 11 4.757 9 7.5 9S12.5 11 12.5 13.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
    <rect x="1.25" y="2.75" width="12.5" height="9.5" rx="1.25" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    <path d="M1.25 5.5L7.5 8.75L13.75 5.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-[15px] h-[15px]" fill="none" viewBox="0 0 15 15">
    <path d="M13.125 10.396l-2.135-.247a1.042 1.042 0 0 0-.86.296l-1.55 1.55a9.854 9.854 0 0 1-4.326-4.326l1.558-1.558a1.042 1.042 0 0 0 .295-.86l-.247-2.118A1.042 1.042 0 0 0 4.824 2.5H3.132C2.553 2.5 2.07 2.983 2.108 3.56a11.458 11.458 0 0 0 9.38 9.38c.577.039 1.06-.444 1.06-1.023v-1.48a1.042 1.042 0 0 0-.922-1.041z" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
  </svg>
);

export function ConfirmationPage({
  booking,
  userDetails,
  confirmationNumber,
  onBackHome,
  onNewReservation,
}: ConfirmationPageProps) {
  const formatDate = () => {
    if (!booking.date) return "";
    return booking.date.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-16">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* All steps complete indicator */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-1">
          {["Booking details", "Your details", "Confirmation"].map((label, idx) => (
            <div key={label} className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className={`rounded-full flex items-center justify-center shrink-0 ${idx === 2 ? "w-[35px] h-[35px] bg-[#f4ce14]" : "w-8 h-8 bg-[#495e57]"}`}>
                  {idx === 2 ? (
                    <span className="font-['Karla'] font-bold text-[#333] text-sm">3</span>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 13 13">
                      <path d="M2.5 6.5L5 9L10.5 3.5" stroke="#fafaf9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.625" />
                    </svg>
                  )}
                </div>
                <span className={`font-['Karla'] text-sm whitespace-nowrap ${idx === 2 ? "font-bold text-[#333]" : "text-[#495e57]"}`}>
                  {label}
                </span>
              </div>
              {idx < 2 && <div className="h-0.5 w-8 rounded-full bg-[#495e57] shrink-0" />}
            </div>
          ))}
        </div>

        {/* Success Banner */}
        <div className="bg-[#495e57] rounded-3xl overflow-hidden mb-6">
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div>
              <p className="font-['Karla'] text-[rgba(250,250,249,0.55)] text-xs uppercase tracking-widest font-bold">Little Lemon · Chicago</p>
              <h2 className="font-['Markazi_Text'] font-semibold text-[#fafaf9] text-2xl leading-tight mt-0.5">Reservation Summary</h2>
            </div>
            <span className="text-4xl">🍋</span>
          </div>
          <div className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4ce14] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                  <path d="M4 10l4.5 4.5L16 6" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="font-['Karla'] font-bold text-[#fafaf9] text-base">Reservation confirmed!</p>
                <p className="font-['Karla'] text-[rgba(250,250,249,0.7)] text-sm">
                  Confirmation #{confirmationNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] overflow-hidden mb-6">
          <div className="px-6">
            <DetailRow
              icon={<CalendarIcon />}
              label="Date"
              value={formatDate()}
            />
            <DetailRow
              icon={<ClockIcon />}
              label="Time"
              value={booking.time || ""}
            />
            <DetailRow
              icon={<GuestsIcon />}
              label="Party size"
              value={`${booking.guests} guest${booking.guests !== 1 ? "s" : ""}`}
            />
            <DetailRow
              icon={<PersonIcon />}
              label="Name"
              value={`${userDetails.firstName} ${userDetails.lastName}`}
            />
            <DetailRow
              icon={<EmailIcon />}
              label="Email"
              value={userDetails.email}
            />
            <DetailRow
              icon={<PhoneIcon />}
              label="Phone"
              value={userDetails.phone}
              border={false}
            />
          </div>
        </div>

        {/* Special requests */}
        {userDetails.specialRequests && (
          <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] p-6 mb-6">
            <p className="font-['Karla'] font-semibold text-[#9ca3af] text-xs uppercase tracking-widest mb-2">Special requests</p>
            <p className="font-['Karla'] text-[#4a5568] text-sm leading-relaxed">{userDetails.specialRequests}</p>
          </div>
        )}

        {/* Cancellation policy */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_12px_rgba(0,0,0,0.07)] p-6 mb-8">
          <p className="font-['Karla'] text-[#6b7280] text-sm leading-relaxed">
            📋 <span className="font-bold text-[#495e57]">Free cancellation</span> up to 24 hours before your reservation.
            To modify or cancel, call{" "}
            <span className="font-bold text-[#495e57]">(312) 555-0192</span>
            {" "}or email{" "}
            <span className="font-bold text-[#495e57]">hello@littlelemon.com</span>.
          </p>
        </div>

        {/* Confirmation email notice */}
        <div className="bg-[rgba(73,94,87,0.06)] border border-[rgba(73,94,87,0.12)] rounded-2xl p-5 mb-8 flex items-start gap-3">
          <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#495e57]" fill="none" viewBox="0 0 16 16">
            <rect x="1.333" y="2.667" width="13.333" height="10.667" rx="1.333" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d="M1.333 5.333L8 9.333L14.667 5.333" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
          <p className="font-['Karla'] text-[#495e57] text-sm leading-relaxed">
            A confirmation has been sent to <span className="font-bold">{userDetails.email}</span>. Please check your inbox (and spam folder).
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBackHome}
            className="flex-1 h-14 rounded-2xl border-2 border-[#495e57] text-[#495e57] font-['Karla'] font-bold text-base hover:bg-[rgba(73,94,87,0.05)] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
              <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
            Back to home
          </button>
          <button
            onClick={onNewReservation}
            className="flex-1 h-14 rounded-2xl bg-[#f4ce14] text-[#333] font-['Karla'] font-bold text-base hover:bg-[#e6be10] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[0px_4px_12px_rgba(244,206,20,0.3)]"
          >
            Make another reservation
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
              <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
