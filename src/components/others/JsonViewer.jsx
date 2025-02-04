const JsonViewer = ({ json }) => {
    if (!json) return null;
  
    const renderValue = (value) => {
      if (typeof value === "object" && value !== null) {
        return (
          <ul className="list-disc list-inside pl-4">
            {Object.entries(value).map(([key, val]) => (
              <li key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {renderValue(val)}
              </li>
            ))}
          </ul>
        );
      }
      return <span className="text-blue-600">{value}</span>;
    };
  
    return (
      <div className="space-y-2">
        {Object.entries(json).map(([key, value]) => (
          <div key={key}>
            <strong className="text-gray-800">{key.replace(/_/g, ' ')}:</strong> {renderValue(value)}
          </div>
        ))}
      </div>
    );
  };
  
  export default JsonViewer;  