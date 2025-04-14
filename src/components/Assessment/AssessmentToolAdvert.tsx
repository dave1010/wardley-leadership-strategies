const AssessmentToolAdvert = ({ strategyName }) => (
  <div className="card-demo" style={{ marginTop: '1.5rem', maxWidth: '400px' }}>
    <div className="card" style={{ backgroundColor: 'var(--ifm-color-emphasis-0)' }}>
      <div className="card__header">
        <h3>🚦 {strategyName} Strategy Assessment Tool</h3>
      </div>
      <div className="card__body">
        <p className="">
          Quickly assess how ready you are to apply the <strong>{strategyName}</strong> strategy.
          Explore signals in your map and organisation that suggest a good fit, and check your readiness to execute effectively.
        </p>
      </div>
      <div className="card__footer">
        <a href="#assessment-tool">
          <button className="button button--primary button--block">
            Start Assessment
          </button>
        </a>
      </div>
    </div>
  </div>
);

export default AssessmentToolAdvert;
