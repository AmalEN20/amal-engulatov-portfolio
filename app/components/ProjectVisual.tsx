export function ProjectVisual({ variant, compact = false, imageSrc, imageAlt = "" }: { variant: string; compact?: boolean; imageSrc?: string; imageAlt?: string }) {
  return (
    <div className={`project-visual visual-${variant} ${imageSrc ? "visual-screenshot" : ""} ${compact ? "visual-compact" : ""}`} aria-hidden={imageSrc ? undefined : true}>
      {imageSrc ? (
        <img className="project-screenshot" src={imageSrc} alt={imageAlt} width={1280} height={720} loading={compact ? "lazy" : "eager"} />
      ) : <div className="visual-grid" />}
      {!imageSrc && variant === "agent" && (
        <div className="ui-window"><div className="ui-side"><b /><i /><i /><i /></div><div className="ui-main"><span>Agent active</span><h4>Next best action</h4><div className="ui-message" /><div className="ui-message short" /></div></div>
      )}
      {!imageSrc && variant === "research" && (
        <><div className="research-orbit" /><div className="research-card"><span>Source 08</span><b>Answer with evidence.</b></div></>
      )}
      {!imageSrc && variant === "workflow" && (
        <div className="node-map"><i /><i /><i /><i /><span /><span /><span /></div>
      )}
    </div>
  );
}
