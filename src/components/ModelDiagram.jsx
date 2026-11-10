import { useEffect, useRef, useState } from 'react';

let counter = 0;

/** Renders a reference diagram. The renderer is loaded only when first needed. */
export function ModelDiagram({ source, dark = false }) {
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);
  const idRef = useRef(`model-diagram-${++counter}`);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'neutral', securityLevel: 'strict' });
        const { svg: out } = await mermaid.render(idRef.current, source);
        if (alive) setSvg(out);
      } catch (err) {
        console.error('Could not render the model diagram', err);
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [source, dark]);

  if (failed) return null;
  if (!svg) return <p className="lab-muted">Drawing the model diagram</p>;
  return <div className="model-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
