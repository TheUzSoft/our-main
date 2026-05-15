/**
 * Legacy Google embed fallback — fully blocked from user interaction.
 */
const NonInteractiveMapEmbed = ({ src, title = 'Location map' }) => {
  if (!src) return null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0 pointer-events-none"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 cursor-default"
        aria-hidden="true"
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default NonInteractiveMapEmbed;
