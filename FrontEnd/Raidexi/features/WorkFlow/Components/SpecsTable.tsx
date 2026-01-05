import React from 'react';

const SpecsTable: React.FC = () => {
  const specs = [
    {
      object: "Raw Measurement",
      origin: "Client API / Feed",
      format: "JSON_V2",
      latency: "< 50ms"
    },
    {
      object: "Normalization Rule",
      origin: "Internal Postgres DB",
      format: "SQL_QUERY",
      latency: "Real-time"
    },
    {
      object: "Output SKU",
      origin: "Logic Engine Core",
      format: "XML / JSON",
      latency: "< 100ms"
    }
  ];

  return (
    <section className="w-full px-6 lg:px-12 pb-24 max-w-[1400px]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-sm font-bold tracking-widest text-white uppercase">
            System Specifications
          </h3>
        </div>
        
        <div className="w-full overflow-hidden border border-border-subtle bg-background-dark">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b bg-surface-dark border-border-subtle">
                  <th className="w-1/4 p-4 font-mono text-xs tracking-wider uppercase border-r text-text-muted border-border-subtle">Data Object</th>
                  <th className="w-1/4 p-4 font-mono text-xs tracking-wider uppercase border-r text-text-muted border-border-subtle">Origin</th>
                  <th className="w-1/4 p-4 font-mono text-xs tracking-wider uppercase border-r text-text-muted border-border-subtle">Format</th>
                  <th className="w-1/4 p-4 font-mono text-xs tracking-wider uppercase text-text-muted">Latency</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm">
                {specs.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`${index !== specs.length - 1 ? 'border-b border-border-subtle' : ''} hover:bg-white/[0.02] transition-colors`}
                  >
                    <td className="p-4 font-bold text-white border-r border-border-subtle">{row.object}</td>
                    <td className="p-4 border-r text-text-muted border-border-subtle">{row.origin}</td>
                    <td className="p-4 font-mono text-xs border-r text-primary border-border-subtle">{row.format}</td>
                    <td className="p-4 font-mono text-xs text-text-muted">{row.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsTable;