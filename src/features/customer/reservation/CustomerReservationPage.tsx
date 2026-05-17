import CustomerSectionHeader from "../components/CustomerSectionHeader";
import ReservationContactForm from "./components/ReservationContactForm";
import ReservationPreferenceForm from "./components/ReservationPreferenceForm";
import ReservationStepper from "./components/ReservationStepper";
import ReservationSummary from "./components/ReservationSummary";
import TableMap from "./components/TableMap";
import { useReservationDraft } from "./hooks/useReservationDraft";

export default function CustomerReservationPage() {
  const {
    draft,
    tables,
    selectedTable,
    reservationFee,
    updateDraft,
    selectTable,
  } = useReservationDraft();

  return (
    <main className="bg-temu-darker px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex justify-center text-center">
          <CustomerSectionHeader
            eyebrow="The Ritual of Dining"
            title="Secure your experience."
            description="Choose a table, set your time, and prepare a quiet premium dining moment at Temu Rasa."
          />
        </header>

        <ReservationStepper activeStep={2} />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <ReservationPreferenceForm draft={draft} onChange={updateDraft} />
            <TableMap
              tables={tables}
              selectedTableId={draft.tableId}
              onSelectTable={selectTable}
            />
          </div>

          <div className="space-y-8 lg:col-span-4">
            <ReservationSummary
              draft={draft}
              selectedTable={selectedTable}
              reservationFee={reservationFee}
            />
            <ReservationContactForm draft={draft} onChange={updateDraft} />
          </div>
        </div>
      </div>
    </main>
  );
}
