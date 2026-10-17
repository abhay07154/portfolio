import {
  portfolioContent,
  portfolioIds,
  type PortfolioId,
} from "@/data/homepage";

export function DomainSelector({
  selected,
  onChange,
}: {
  selected: PortfolioId;
  onChange: (domain: PortfolioId) => void;
}) {
  return (
    <nav
      className="switchboard page-container"
      aria-label="Filter portfolio by discipline"
    >
      <div className="switchboard-inner">
        <span className="switchboard-label">which part?</span>
        <fieldset className="domain-options">
          <legend className="sr-only">Portfolio domain</legend>
          <span
            className="domain-thumb"
            style={{
              transform: `translateX(${portfolioIds.indexOf(selected) * 100}%)`,
            }}
            aria-hidden="true"
          />
          {portfolioIds.map((id) => (
            <label
              key={id}
              className="domain-option"
              data-active={selected === id}
            >
              <input
                className="sr-only"
                type="radio"
                name="domain"
                value={id}
                checked={selected === id}
                onChange={() => onChange(id)}
              />
              <span>
                {portfolioContent[id].label}{" "}
                <small>{portfolioContent[id].experienceIds.length}</small>
              </span>
            </label>
          ))}
        </fieldset>
      </div>
    </nav>
  );
}
