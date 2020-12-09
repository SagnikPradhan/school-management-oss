export const Table = <T extends string>({
  headers,
  data,
}: {
  headers: { [selector in T]: { header?: boolean; display?: boolean } };
  data: { [key in T]: React.ReactNode }[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(headers).map((selector) => (
            <th>{headers[selector as T].display ?? selector}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((entry) => (
          <tr>
            {Object.entries(entry).map(([key, value]) =>
              headers[key as T].header ? (
                <th>{value as React.ReactNode}</th>
              ) : (
                <td>{value as React.ReactNode}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
