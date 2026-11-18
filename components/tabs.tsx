"use client";

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";

const subscribe = () => () => {};

/** Without JavaScript this renders as a contents list and stacked sections. */
export function Tabs({ label, items }: { label: string; items: { title: string; body: ReactNode }[] }) {
  const base = useId();
  const enhanced = useSyncExternalStore(subscribe, () => true, () => false);
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowRight: (selected + 1) % items.length,
      ArrowLeft: (selected - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  if (!enhanced) {
    return (
      <div className="fd-tabs">
        <h3>{label}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={item.title}><a href={`#${base}-panel-${index}`}>{item.title}</a></li>
          ))}
        </ul>
        {items.map((item, index) => (
          <section className="fd-tabs__panel" id={`${base}-panel-${index}`} key={item.title}>
            <h4>{item.title}</h4>
            {item.body}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="fd-tabs">
      <div className="fd-tabs__list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {items.map((item, index) => (
          <button
            key={item.title}
            ref={(element) => { tabs.current[index] = element; }}
            className="fd-tabs__tab"
            type="button"
            role="tab"
            id={`${base}-tab-${index}`}
            aria-selected={index === selected}
            aria-controls={`${base}-panel-${index}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.title}
          className="fd-tabs__panel"
          role="tabpanel"
          id={`${base}-panel-${index}`}
          aria-labelledby={`${base}-tab-${index}`}
          hidden={index !== selected}
        >
          {item.body}
        </div>
      ))}
    </div>
  );
}
