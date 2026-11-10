import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

const EDITOR_ORIGIN = 'https://embed.diagrams.net';
const EDITOR_URL = `${EDITOR_ORIGIN}/?embed=1&proto=json&spin=1&libraries=1&noSaveBtn=1&noExitBtn=1&saveAndExit=0`;

/**
 * Embeds the diagrams.net editor. Work is reported through onChange as
 * { xml, preview } where preview is an SVG data URI of the drawing.
 */
export function DiagramCanvas({ initialXml, onChange, dark = false }) {
  const frameRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const initialXmlRef = useRef(initialXml);
  const latestXmlRef = useRef(initialXml || '');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const post = (message) => {
      frameRef.current?.contentWindow?.postMessage(JSON.stringify(message), EDITOR_ORIGIN);
    };

    const handleMessage = (event) => {
      if (event.origin !== EDITOR_ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (msg.event === 'init') {
        post({ action: 'load', xml: initialXmlRef.current || '', autosave: 1 });
        setLoaded(true);
      } else if (msg.event === 'autosave' || msg.event === 'save') {
        latestXmlRef.current = msg.xml;
        onChangeRef.current({ xml: msg.xml });
        post({ action: 'export', format: 'xmlsvg', spin: false });
      } else if (msg.event === 'export') {
        onChangeRef.current({ xml: latestXmlRef.current, preview: msg.data });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="diagram-canvas">
      {!loaded && (
        <div className="diagram-loading">
          <Loader2 size={20} className="spin" /> Loading the diagram editor
        </div>
      )}
      <iframe
        ref={frameRef}
        title="Diagram editor"
        src={`${EDITOR_URL}${dark ? '&dark=1' : ''}`}
        className="diagram-frame"
      />
    </div>
  );
}
