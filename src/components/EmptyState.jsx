export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#E9EDF5] px-6 py-16 text-center dark:border-gray-700">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#6366F1] dark:bg-indigo-500/15">
        <Icon size={26} aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-[#64748B] dark:text-gray-400">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5558e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366F1]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
