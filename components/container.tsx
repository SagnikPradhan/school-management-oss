export const Container: React.FC = ({ children }) => {
  return (
    <div className="container">
      {children}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};
