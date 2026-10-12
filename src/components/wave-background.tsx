const BAR_COUNT = 18;
const V_DEPTH_SECONDS = 2.6;

export function WaveBackground() {
  const center = (BAR_COUNT - 1) / 2;

  return (
    <div className="crest-field" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }, (_, index) => {
        const distance = Math.abs(index - center) / center;
        const delay = -((1 - distance) * V_DEPTH_SECONDS);

        return (
          <div key={index} className="crest-bar">
            <div
              className="crest-glow"
              style={{ animationDelay: `${delay}s` }}
            />
          </div>
        );
      })}
    </div>
  );
}
